import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Sản phẩm", href: "#products" },
  { label: "Dự án", href: "#projects" },
  { label: "Về chúng tôi", href: "#about" },
  { label: "Bền vững", href: "#sustainability" },
  { label: "Liên hệ", href: "#contact" },
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
          <a href="/" className="font-display text-2xl md:text-3xl font-light tracking-wider uppercase" aria-label="Toàn Phát Ceramic - Trang chủ">Toàn Phát Ceramic</a>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Menu chính">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="font-body text-xs font-medium uppercase tracking-[0.15em] link-underline transition-colors duration-300">{link.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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
            <span className="font-display text-2xl font-light tracking-wider uppercase text-primary-foreground">Toàn Phát Ceramic</span>
            <button onClick={closeMenu} aria-label="Đóng menu">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center section-padding gap-8" aria-label="Menu di động">
            {navLinks.map((link, i) => (
              <a key={link.label} href={link.href} onClick={closeMenu} className="font-display text-4xl font-light text-primary-foreground tracking-wide animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>{link.label}</a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
