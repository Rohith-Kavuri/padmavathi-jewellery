import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

// Full-screen photo viewer.
// - Opens with the photo growing smoothly from where it was tapped.
// - Laptop: click (or scroll) to zoom; while zoomed the photo follows the
//   mouse so you can look around; click again to zoom out.
// - Phone: pinch or double-tap to zoom, drag to look around, swipe down
//   to close.
// - Esc, the × button or tapping the dark background closes it.

const MAX_ZOOM = 4;
const CLICK_ZOOM = 2.5;
const DURATION = 380;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Lightbox({ item, onClose }) {
  const { t } = useLang();
  const [phase, setPhase] = useState("closed"); // closed | measuring | entering | open | leaving
  const [box, setBox] = useState(null); // final displayed size {w, h}
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragY, setDragY] = useState(0); // swipe-down-to-close offset
  const [animate, setAnimate] = useState(true);
  const stageRef = useRef(null);
  const touch = useRef(null);
  const lastTap = useRef(0);
  const current = useRef(null);

  // ---- open: measure the photo, then animate from the thumbnail ----
  useLayoutEffect(() => {
    if (!item) return;
    current.current = item;
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setDragY(0);
    setBox(null);
    setPhase("measuring");
    const img = new Image();
    img.onload = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const r = Math.min((vw * 0.92) / img.naturalWidth, (vh * 0.82) / img.naturalHeight, 2);
      setBox({ w: Math.round(img.naturalWidth * r), h: Math.round(img.naturalHeight * r) });
      setAnimate(false);
      setPhase("entering");
    };
    img.src = item.src;
  }, [item]);

  useEffect(() => {
    if (phase !== "entering") return;
    // two frames: first paint at the thumbnail position, then animate to centre
    let r2;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setAnimate(true);
        setPhase("open");
      });
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [phase]);

  const close = useCallback(() => {
    if (phase === "leaving" || phase === "closed") return;
    setAnimate(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setPhase("leaving");
    setTimeout(() => {
      setPhase("closed");
      onClose();
    }, reduceMotion() ? 0 : DURATION);
  }, [phase, onClose]);

  // ---- keyboard + page scroll lock ----
  useEffect(() => {
    if (phase === "closed") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") zoomTo(zoom * 1.5);
      if (e.key === "-") zoomTo(zoom / 1.5);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  });

  if (!item && phase === "closed") return null;
  const it = item || current.current;
  if (!it) return null;

  // ---- zoom / pan helpers ----
  const limits = (z) => (box ? { x: (box.w * z - box.w) / 2, y: (box.h * z - box.h) / 2 } : { x: 0, y: 0 });
  const clampPan = (p, z) => {
    const l = limits(z);
    return { x: clamp(p.x, -l.x, l.x), y: clamp(p.y, -l.y, l.y) };
  };
  function zoomTo(z, focus) {
    const nz = clamp(z, 1, MAX_ZOOM);
    setAnimate(true);
    if (nz === 1) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      return;
    }
    // keep the point under the cursor/finger in place
    let p = pan;
    if (focus) p = { x: pan.x - focus.x * (nz / zoom - 1), y: pan.y - focus.y * (nz / zoom - 1) };
    setZoom(nz);
    setPan(clampPan(p, nz));
  }
  function pointFromCentre(clientX, clientY) {
    const r = stageRef.current.getBoundingClientRect();
    return { x: clientX - (r.left + r.width / 2) - pan.x, y: clientY - (r.top + r.height / 2) - pan.y };
  }

  // mouse: click toggles zoom, moving while zoomed looks around
  function onClick(e) {
    e.stopPropagation();
    if (touch.current?.moved) return;
    if (zoom > 1) zoomTo(1);
    else zoomTo(CLICK_ZOOM, pointFromCentre(e.clientX, e.clientY));
  }
  function onMouseMove(e) {
    if (zoom <= 1 || e.pointerType === "touch" || !box) return;
    const r = stageRef.current.getBoundingClientRect();
    const fx = clamp((e.clientX - (r.left + r.width / 2)) / (box.w / 2), -1, 1);
    const fy = clamp((e.clientY - (r.top + r.height / 2)) / (box.h / 2), -1, 1);
    const l = limits(zoom);
    setAnimate(false);
    setPan({ x: -fx * l.x, y: -fy * l.y });
  }
  function onWheel(e) {
    // (page scrolling is already locked while the viewer is open)
    zoomTo(zoom * (e.deltaY < 0 ? 1.25 : 0.8), pointFromCentre(e.clientX, e.clientY));
  }

  // touch: pinch, drag, double-tap, swipe down to close
  function onTouchStart(e) {
    if (e.touches.length === 2) {
      const [a, b] = e.touches;
      touch.current = { pinch: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), zoom, moved: true };
    } else {
      const p = e.touches[0];
      touch.current = { x: p.clientX, y: p.clientY, pan, moved: false };
    }
    setAnimate(false);
  }
  function onTouchMove(e) {
    const s = touch.current;
    if (!s) return;
    if (e.touches.length === 2 && s.pinch) {
      const [a, b] = e.touches;
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const nz = clamp((s.zoom * d) / s.pinch, 1, MAX_ZOOM);
      setZoom(nz);
      setPan((p) => clampPan(p, nz));
      return;
    }
    const p = e.touches[0];
    const dx = p.clientX - s.x;
    const dy = p.clientY - s.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) s.moved = true;
    if (zoom > 1) setPan(clampPan({ x: s.pan.x + dx, y: s.pan.y + dy }, zoom));
    else if (dy > 0) setDragY(dy);
  }
  function onTouchEnd(e) {
    const s = touch.current;
    setAnimate(true);
    if (s && !s.moved && e.changedTouches.length === 1) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        const p = e.changedTouches[0];
        if (zoom > 1) zoomTo(1);
        else zoomTo(CLICK_ZOOM, pointFromCentre(p.clientX, p.clientY));
        lastTap.current = 0;
      } else lastTap.current = now;
    }
    if (dragY > 110) close();
    else setDragY(0);
    if (zoom < 1.05) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
    setTimeout(() => (touch.current = null), 0);
  }

  // ---- where the photo is drawn ----
  let transform = `translate(${pan.x}px, ${pan.y + dragY}px) scale(${zoom})`;
  const atThumb = phase === "measuring" || phase === "entering" || phase === "leaving";
  if (atThumb && box && it.rect) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dx = it.rect.left + it.rect.width / 2 - vw / 2;
    const dy = it.rect.top + it.rect.height / 2 - vh / 2;
    const s = Math.max(it.rect.width / box.w, it.rect.height / box.h);
    transform = `translate(${dx}px, ${dy}px) scale(${s})`;
  }
  const shown = phase === "open";
  const fade = shown ? Math.max(0, 1 - dragY / 400) : 0;
  const ease = `${DURATION}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;

  return (
    <div
      className="fixed inset-0 z-[70] select-none"
      role="dialog"
      aria-modal="true"
      aria-label={it.alt}
      onClick={close}
      style={{ touchAction: "none" }}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(74,11,24,0.97), rgba(20,3,8,0.98))",
          opacity: fade,
          transition: animate && !reduceMotion() ? `opacity ${ease}` : "none",
        }}
      />

      {/* photo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden" ref={stageRef}>
        {box && (
          <img
            src={it.src}
            alt={it.alt}
            draggable={false}
            onClick={onClick}
            onMouseMove={onMouseMove}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="block rounded-lg"
            style={{
              width: box.w,
              height: box.h,
              objectFit: "contain",
              transform,
              transition: animate && !reduceMotion() ? `transform ${ease}, opacity ${ease}` : "none",
              cursor: zoom > 1 ? "zoom-out" : "zoom-in",
              boxShadow: shown ? "0 30px 80px -20px rgba(0,0,0,0.8)" : "none",
              willChange: "transform",
            }}
          />
        )}
      </div>

      {/* top bar: title + controls */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-6 pb-10 md:pb-12 pointer-events-none"
        style={{
          opacity: fade,
          transition: `opacity ${ease}`,
          background: "linear-gradient(to bottom, rgba(20,3,8,0.75), rgba(20,3,8,0))",
        }}
      >
        <div className="min-w-0" style={{ color: "var(--gold-100)" }}>
          {it.title && <div className="vj-display text-lg md:text-2xl leading-tight truncate">{it.title}</div>}
          {it.subtitle && <div className="text-xs md:text-sm mt-0.5" style={{ color: "var(--gold-300)" }}>{it.subtitle}</div>}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          {[
            { label: t("lightbox.zoomOut"), Icon: ZoomOut, onClick: () => zoomTo(zoom / 1.5), hide: zoom <= 1 },
            { label: t("lightbox.zoomIn"), Icon: ZoomIn, onClick: () => zoomTo(zoom * 1.5), hide: zoom >= MAX_ZOOM },
            { label: t("aria.close"), Icon: X, onClick: close },
          ].map(({ label, Icon, onClick: fn, hide }) => (
            <button
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                fn();
              }}
              aria-label={label}
              title={label}
              className="vj-focus w-10 h-10 rounded-full flex items-center justify-center transition-opacity"
              style={{
                background: "rgba(36,5,13,0.6)",
                border: "1px solid rgba(227,170,44,0.55)",
                color: "var(--gold-100)",
                opacity: hide ? 0.35 : 1,
              }}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      {/* hint */}
      <div
        className="absolute inset-x-0 bottom-0 pb-5 text-center text-[11px] md:text-xs pointer-events-none"
        style={{ color: "rgba(251,236,200,0.7)", opacity: shown && zoom === 1 ? fade : 0, transition: `opacity ${ease}` }}
      >
        <span className="hidden md:inline">{t("lightbox.hintDesktop")}</span>
        <span className="md:hidden">{t("lightbox.hintPhone")}</span>
      </div>
    </div>
  );
}
