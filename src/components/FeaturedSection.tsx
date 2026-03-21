import { useRef, useState, useEffect } from "react";
import col1 from "@/assets/collection-1.webp";
import col2 from "@/assets/collection-2.webp";
import serviceDesign from "@/assets/service-design.webp";
import serviceSample from "@/assets/service-sample.webp";

const features = [
  {
    img: col1,
    title: "Sản phẩm",
    desc: "Công cụ tìm kiếm sản phẩm",
    href: "#products",
    alt: "Tìm kiếm gạch ốp lát tại Toàn Phát Ceramic",
  },
  {
    img: col2,
    title: "Cá nhân hoá",
    desc: "Thiết kế phong cách riêng cho bạn",
    href: "#personalize",
    alt: "Cá nhân hoá phong cách nội thất",
  },
  {
    img: serviceDesign,
    title: "Giải pháp màu sắc",
    desc: "Video & bài viết về phối màu",
    href: "#color-solutions",
    alt: "Giải pháp màu sắc nội thất",
  },
  {
    img: serviceSample,
    title: "Giải pháp thi công",
    desc: "Hướng dẫn thi công chuyên nghiệp",
    href: "#construction",
    alt: "Giải pháp thi công gạch ốp lát",
  },
];

const FeaturedSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "100px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background" aria-label="Nổi bật">
      <div className="section-padding">
        <h2 className="font-display text-3xl md:text-4xl font-light uppercase tracking-wide mb-12">
          Nổi bật
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <a
              key={f.title}
              href={f.href}
              className={`group relative aspect-[3/4] overflow-hidden block transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <img
                src={f.img}
                alt={f.alt}
                width={400}
                height={533}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <span className="inline-block bg-white/90 text-foreground px-3 py-1.5 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-2">
                  {f.desc}
                </span>
                <h3 className="font-display text-lg md:text-xl font-light text-white">
                  {f.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
