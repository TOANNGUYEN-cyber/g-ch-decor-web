import { useRef, useState, useEffect, useCallback } from "react";
import col1 from "@/assets/collection-1.webp";
import col2 from "@/assets/collection-2.webp";
import col3 from "@/assets/collection-3.webp";
import col4 from "@/assets/collection-4.webp";
import aboutImg from "@/assets/about.webp";

const collections = [
  { img: col1, name: "Gạch vân đá cẩm thạch", sub: "Nhập khẩu Tây Ban Nha" },
  { img: col2, name: "Gạch đá tối cao cấp", sub: "Phong cách hiện đại" },
  { img: col3, name: "Gạch Calacatta", sub: "Cảm hứng Italy" },
  { img: col4, name: "Gạch ngoại thất", sub: "Chống trơn bền bỉ" },
  { img: aboutImg, name: "Gạch porcelain khổ lớn", sub: "1200×1200mm" },
];

const CollectionsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "100px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scroll = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary" aria-label="Bộ sưu tập">
      <div className="section-padding">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-light uppercase tracking-wide">
            Bộ sưu tập
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Trước"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Sau"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth px-6 md:px-12 lg:px-20 xl:px-28 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {collections.map((c, i) => (
          <a
            key={c.name}
            href="#products"
            className={`group flex-shrink-0 w-[280px] md:w-[340px] snap-start transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
          >
            <div className="aspect-[4/5] overflow-hidden mb-4">
              <img
                src={c.img}
                alt={c.name}
                width={340}
                height={425}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-xl font-light mb-1">{c.name}</h3>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{c.sub}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CollectionsCarousel;
