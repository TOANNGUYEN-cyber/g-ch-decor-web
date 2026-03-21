import { useRef, useState, useEffect } from "react";
import col3 from "@/assets/collection-3.webp";

const FullWidthBanner = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { rootMargin: "-100px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[80vh] overflow-hidden" aria-label="Tư vấn miễn phí">
      <img src={col3} alt="Không gian nội thất lát gạch Toàn Phát Ceramic" width={1920} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/30" />
      <div className="absolute inset-0 flex items-center justify-center section-padding">
        <div className="text-center max-w-3xl" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <h2 className="section-title text-primary-foreground mb-6">Giải pháp gạch ốp lát <em className="italic">cho mọi không gian</em></h2>
          <p className="body-text text-primary-foreground/80 mb-10 max-w-xl mx-auto">Từ sàn nhà đến tường ốp, từ bếp đến phòng tắm — gạch nhập khẩu tại Toàn Phát Ceramic mang đến vẻ đẹp vượt thời gian.</p>
          <a href="#contact" className="btn-hero">Liên hệ tư vấn — 0344.399.399</a>
        </div>
      </div>
    </section>
  );
};

export default FullWidthBanner;
