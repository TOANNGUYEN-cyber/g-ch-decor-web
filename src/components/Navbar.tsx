import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Sản phẩm", href: "#products" },
  { label: "Cá nhân hoá", href: "#personalize" },
  { label: "Bộ sưu tập", href: "#collections" },
  { label: "Về chúng tôi", href: "#about" },
  { label: "Liên hệ", href: "#contact" },
];

const socialLinks = [
  { label: "Zalo", href: "https://zalo.me/0344399399", icon: "M12 2C6.48 2 2 6.04 2 11c0 2.76 1.36 5.22 3.48 6.82V22l3.96-2.16c.82.24 1.68.36 2.56.36 5.52 0 10-4.04 10-9S17.52 2 12 2z" },
  { label: "Facebook", href: "https://www.facebook.com/toanphatceramic", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "YouTube", href: "#", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" },
  { label: "Google Maps", href: "https://maps.google.com/?q=Toàn+Phát+Ceramic+Phú+Thọ", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-solid" : "nav-transparent"}`} role="banner">
        <div className="section-padding flex items-center justify-between h-[var(--nav-height)]">
          <a href="/" className="font-display text-xl md:text-2xl font-light tracking-[0.15em] uppercase" aria-label="Toàn Phát Ceramic - Trang chủ">
            Toàn Phát Ceramic
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Menu chính">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="font-body text-[11px] font-medium uppercase tracking-[0.15em] link-underline transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Social icons - desktop */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="p-1.5 transition-opacity hover:opacity-60" aria-label={s.label}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>

            <div className="w-[1px] h-5 bg-current/20 hidden md:block" />

            <button className="p-2 transition-opacity hover:opacity-60" aria-label="Tìm kiếm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
            </button>
            <button className="lg:hidden p-2" onClick={() => setMenuOpen(true)} aria-label="Mở menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 12h16M4 6h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-foreground/95 flex flex-col animate-fade-in" role="dialog" aria-label="Menu di động">
          <div className="section-padding flex items-center justify-between h-[var(--nav-height)]">
            <span className="font-display text-xl font-light tracking-[0.15em] uppercase text-primary-foreground">Toàn Phát Ceramic</span>
            <button onClick={closeMenu} aria-label="Đóng menu">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center section-padding gap-6" aria-label="Menu di động">
            {navLinks.map((link, i) => (
              <a key={link.label} href={link.href} onClick={closeMenu} className="font-display text-3xl font-light text-primary-foreground tracking-wide animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 mt-8 pt-8 border-t border-primary-foreground/20">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label={s.label}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
