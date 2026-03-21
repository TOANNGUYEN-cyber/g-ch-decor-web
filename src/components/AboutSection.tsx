import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import aboutImg from "@/assets/about.webp";

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { rootMargin: "-100px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animStyle = (delay: number, x = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translate(0,0)" : `translate(${x}px, 0)`,
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <section id="about" className="py-24 md:py-40" ref={ref} aria-label="Về Toàn Phát Ceramic">
      <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div style={animStyle(0, -40)}>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Về Toàn Phát Ceramic</p>
          <h2 className="section-title mb-8">Showroom gạch ốp lát nhập khẩu <em className="italic">hàng đầu Phú Thọ</em></h2>
          <p className="body-text mb-6 max-w-lg">Toàn Phát Ceramic tự hào là showroom gạch ốp lát lớn nhất tỉnh Phú Thọ, chuyên phân phối gạch nhập khẩu từ Tây Ban Nha, Ấn Độ, Italy. Hơn 500 mẫu trưng bày.</p>
          <p className="body-text mb-10 max-w-lg">Với đội ngũ tư vấn chuyên nghiệp, chúng tôi cam kết mang đến giải pháp bề mặt tối ưu cho mọi không gian.</p>
          <a href="#contact" className="btn-outline">Tìm hiểu thêm <ArrowRight className="w-4 h-4" /></a>
        </div>
        <div style={animStyle(0.2, 40)} className="overflow-hidden aspect-[800/650]">
          <img src={aboutImg} alt="Showroom Toàn Phát Ceramic Phú Thọ" width={800} height={650} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
