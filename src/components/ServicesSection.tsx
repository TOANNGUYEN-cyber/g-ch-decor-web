import { useRef, useEffect, useState } from "react";
import { Palette, Truck, BadgePercent } from "lucide-react";
import serviceDesign from "@/assets/service-design.webp";
import serviceSample from "@/assets/service-sample.webp";
import promoTile from "@/assets/promo-tile.webp";

const services = [
  { icon: Palette, img: serviceDesign, title: "Thiết kế phối cảnh miễn phí", desc: "Đội ngũ kiến trúc sư tư vấn, thiết kế phối cảnh 3D không gian thực tế — hoàn toàn miễn phí.", alt: "Dịch vụ thiết kế phối cảnh 3D miễn phí tại Toàn Phát Ceramic Phú Thọ" },
  { icon: Truck, img: serviceSample, title: "Trình mẫu tại công trình", desc: "Mang mẫu gạch trực tiếp đến công trình để khách hàng so sánh, lựa chọn — miễn phí toàn tỉnh.", alt: "Dịch vụ trình mẫu gạch tại công trình miễn phí" },
  { icon: BadgePercent, img: promoTile, title: "Gạch 1200×1200 chỉ 275.000đ/m²", desc: "Top sản phẩm khuyến mãi — gạch porcelain khổ lớn 1200×1200mm vân đá cẩm thạch.", alt: "Gạch porcelain 1200x1200 khuyến mãi tại Toàn Phát Ceramic" },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { rootMargin: "-80px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 md:py-32 bg-background" ref={ref} aria-label="Dịch vụ nổi bật">
      <div className="section-padding">
        <div className={`text-center mb-14 md:mb-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Dịch vụ nổi bật</p>
          <h2 className="section-title">Trải nghiệm <em className="italic">đẳng cấp 5 sao</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <div key={s.title} className={`group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}>
              <div className="overflow-hidden mb-6">
                <img src={s.img} alt={s.alt} width={400} height={400} className="w-full h-[280px] md:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
              </div>
              <div className="flex items-start gap-3 mb-3">
                <s.icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <h3 className="font-display text-xl md:text-2xl font-light text-foreground leading-tight">{s.title}</h3>
              </div>
              <p className="body-text pl-8">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
