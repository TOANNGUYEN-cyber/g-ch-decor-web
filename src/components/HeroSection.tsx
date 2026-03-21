import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    const shell = document.getElementById("hero-shell");
    if (shell) shell.classList.add("is-hidden");
  }, []);

  return (
    <section className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-[#1a1814]" aria-label="Giới thiệu Toàn Phát Ceramic">
      <picture>
        <source srcSet="/hero-mobile.webp" type="image/webp" media="(max-width: 767px)" />
        <source srcSet="/hero-desktop.webp" type="image/webp" media="(min-width: 768px)" />
        <img src="/hero-desktop.webp" alt="Showroom gạch ốp lát Toàn Phát Ceramic Phú Thọ" width={1920} height={1080} fetchPriority="high" decoding="sync" loading="eager" className="absolute inset-0 w-full h-full object-cover" />
      </picture>

      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)" }} />

      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-28 section-padding">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary-foreground/80 mb-4">Showroom gạch ốp lát 5 sao — Phú Thọ</p>
        <h1 className="hero-title text-primary-foreground max-w-4xl">
          Gạch ốp lát cao cấp <br />
          <em className="font-light italic">Toàn Phát Ceramic</em>
        </h1>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#products" className="btn-hero">
            Khám phá sản phẩm
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </a>
          <a href="tel:0344399399" className="btn-hero">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            0344.399.399
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-primary-foreground/50">Cuộn xuống</span>
        <div className="w-[1px] h-8 bg-primary-foreground/30 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
