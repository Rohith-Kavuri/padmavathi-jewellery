import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data/products";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <section
      className="px-4 md:px-6 py-14"
      style={{ background: "var(--plum-900)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center gap-1 mb-4" style={{ color: "var(--gold-500)" }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="var(--gold-500)" />
          ))}
        </div>
        <p key={index} className="vj-fadeshift vj-display text-2xl" style={{ color: "var(--gold-100)" }}>
          "{current.quote}"
        </p>
        <div className="mt-4 text-sm" style={{ color: "rgba(255,251,242,0.7)" }}>
          {current.name} · {current.city}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="vj-focus"
            onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            style={{ color: "var(--gold-300)" }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2 items-center">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: i === index ? "var(--gold-300)" : "rgba(255,241,201,0.3)",
                }}
              />
            ))}
          </div>
          <button
            className="vj-focus"
            onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            style={{ color: "var(--gold-300)" }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
