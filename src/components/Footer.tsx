const socialLinks = [
  { label: "Zalo", href: "https://zalo.me/0344399399", icon: "M12 2C6.48 2 2 6.04 2 11c0 2.76 1.36 5.22 3.48 6.82V22l3.96-2.16c.82.24 1.68.36 2.56.36 5.52 0 10-4.04 10-9S17.52 2 12 2z" },
  { label: "Facebook", href: "https://www.facebook.com/toanphatceramic", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "YouTube", href: "#", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" },
  { label: "Google Maps", href: "https://maps.google.com/?q=Toàn+Phát+Ceramic+Phú+Thọ", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
];

const Footer = () => (
  <footer id="contact" className="bg-foreground text-primary-foreground" role="contentinfo">
    <div className="section-padding py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <h3 className="font-display text-2xl font-light tracking-[0.15em] uppercase mb-6">Toàn Phát Ceramic</h3>
          <p className="font-body text-sm font-light text-primary-foreground/70 leading-relaxed mb-6">
            Showroom gạch ốp lát nhập khẩu hàng đầu tỉnh Phú Thọ. Hơn 500 mẫu gạch Tây Ban Nha, Ấn Độ, Italy.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors" aria-label={s.label}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
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
          <h4 className="font-body text-xs uppercase tracking-[0.2em] mb-6 text-primary-foreground/50">Dịch vụ</h4>
          <ul className="space-y-3">
            {["Thiết kế phối cảnh 3D", "Trình mẫu tại công trình", "Giải pháp màu sắc", "Tư vấn thi công"].map((item) => (
              <li key={item}><a href="#" className="font-body text-sm font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors">{item}</a></li>
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
          <a href="https://maps.google.com/?q=Toàn+Phát+Ceramic+Phú+Thọ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 font-body text-xs uppercase tracking-[0.15em] text-primary-foreground/50 hover:text-primary-foreground transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /></svg>
            Xem bản đồ
          </a>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
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
