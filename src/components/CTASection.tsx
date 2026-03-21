const CTASection = () => (
  <section className="py-12 md:py-16 bg-background border-b border-border">
    <div className="section-padding text-center">
      <h2 className="font-display text-2xl md:text-4xl font-light mb-4">
        "Dự án của bạn <em className="italic">bắt đầu từ đây</em>"
      </h2>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mt-4"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Yêu cầu cuộc hẹn tại cửa hàng ngay bây giờ
      </a>
    </div>
  </section>
);

export default CTASection;
