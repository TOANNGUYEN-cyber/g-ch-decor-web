import { Phone, Sparkles } from "lucide-react";

const PromoBar = () => (
  <section className="bg-accent text-accent-foreground py-3 overflow-hidden" aria-label="Khuyến mãi">
    <div className="section-padding flex items-center justify-center gap-3 flex-wrap text-center">
      <Sparkles className="w-4 h-4 flex-shrink-0" />
      <span className="font-body text-xs md:text-sm font-medium uppercase tracking-wider">Gạch 1200×1200 vân đá — chỉ 275.000đ/m²</span>
      <span className="hidden md:inline font-body text-xs opacity-80">|</span>
      <a href="tel:0344399399" className="font-body text-xs md:text-sm font-semibold flex items-center gap-1 hover:underline">
        <Phone className="w-3 h-3" /> 0344.399.399
      </a>
    </div>
  </section>
);

export default PromoBar;
