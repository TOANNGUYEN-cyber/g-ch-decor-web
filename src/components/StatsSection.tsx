import { useRef, useState, useEffect } from "react";

const stats = [
  { number: "5+", label: "Năm hoạt động" },
  { number: "500+", label: "Mẫu gạch nhập khẩu" },
  { number: "1,200+", label: "Công trình hoàn thành" },
  { number: "3+", label: "Quốc gia nhập khẩu" },
];

const StatsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { rootMargin: "-50px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-b border-border" aria-label="Thống kê">
      <div className="section-padding grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s` }}>
            <span className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground">{stat.number}</span>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-4">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
