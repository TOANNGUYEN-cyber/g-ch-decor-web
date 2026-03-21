import { ArrowUpRight } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-primary-foreground" role="contentinfo">
    <div className="section-padding py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="lg:col-span-1">
          <h3 className="font-display text-3xl font-light tracking-wider uppercase mb-6">Toàn Phát Ceramic</h3>
          <p className="font-body text-sm font-light text-primary-foreground/70 leading-relaxed">Showroom gạch ốp lát nhập khẩu hàng đầu tỉnh Phú Thọ. Hơn 500 mẫu gạch Tây Ban Nha, Ấn Độ, Italy.</p>
        </div>
        <div>
          <h4 className="font-body text-xs uppercase tracking-[0.2em] mb-6 text-primary-foreground/50">Sản phẩm</h4>
          <ul className="space-y-3">
            {["Gạch lát sàn nhập khẩu", "Gạch ốp tường cao cấp", "Gạch ngoại thất chống trơn", "Gạch trang trí mosaic"].map((item) => (
              <li key={item}><a href="#products" className="font-body text-sm font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-body text-xs uppercase tracking-[0.2em] mb-6 text-primary-foreground/50">Công ty</h4>
          <ul className="space-y-3">
            {["Về Toàn Phát Ceramic", "Showroom Phú Thọ", "Chính sách bảo hành", "Tuyển dụng"].map((item) => (
              <li key={item}><a href="#about" className="font-body text-sm font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-body text-xs uppercase tracking-[0.2em] mb-6 text-primary-foreground/50">Liên hệ</h4>
          <address className="not-italic space-y-3 font-body text-sm font-light text-primary-foreground/70">
            <p><a href="mailto:congtytoanphat2020@gmail.com" className="hover:text-primary-foreground transition-colors">congtytoanphat2020@gmail.com</a></p>
            <p><a href="tel:+84344399399" className="hover:text-primary-foreground transition-colors">0344.399.399</a></p>
            <p>Phú Thọ, Việt Nam</p>
          </address>
          <div className="flex gap-4 mt-8">
            <a href="https://www.facebook.com/toanphatceramic" target="_blank" rel="noopener noreferrer" className="font-body text-xs uppercase tracking-[0.15em] text-primary-foreground/50 hover:text-primary-foreground transition-colors flex items-center gap-1">Facebook <ArrowUpRight className="w-3 h-3" /></a>
          </div>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-primary-foreground/50">© 2026 Toàn Phát Ceramic. Tất cả quyền được bảo lưu.</p>
        <div className="flex gap-6">
          {["Chính sách bảo mật", "Điều khoản sử dụng"].map((link) => (
            <a key={link} href="#" className="font-body text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
