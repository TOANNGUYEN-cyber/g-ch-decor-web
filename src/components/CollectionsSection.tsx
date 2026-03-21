import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import col1 from "@/assets/collection-1.webp";
import col2 from "@/assets/collection-2.webp";
import col3 from "@/assets/collection-3.webp";
import col4 from "@/assets/collection-4.webp";

const staticCollections = [
  { img: col1, title: "Gạch vân đá cẩm thạch", desc: "Nhập khẩu Tây Ban Nha — vân marble tự nhiên", alt: "Gạch nhập khẩu Tây Ban Nha tại Toàn Phát Ceramic Phú Thọ" },
  { img: col2, title: "Gạch đá tối cao cấp", desc: "Phong cách hiện đại sang trọng", alt: "Gạch nhập khẩu Ấn Độ tại Toàn Phát Phú Thọ" },
  { img: col3, title: "Gạch Calacatta Italy", desc: "Cảm hứng từ đá Calacatta chính hãng", alt: "Gạch Calacatta Italy tại Toàn Phát Ceramic Phú Thọ" },
  { img: col4, title: "Gạch ngoại thất", desc: "Gạch sân vườn, ban công bền bỉ chống trơn", alt: "Gạch ngoại thất tại Toàn Phát Ceramic Phú Thọ" },
];

const ROOM_FILTERS = ["Tất cả", "Phòng khách", "Phòng ngủ", "Phòng tắm", "Bếp", "Sân vườn"];
const SIZE_FILTERS = ["Tất cả", "60x60", "60x120", "80x80", "80x160", "120x120"];
const ORIGIN_FILTERS = ["Tất cả", "Tây Ban Nha", "Ấn Độ", "Italy", "Việt Nam"];

interface Product { id: string; name: string; image_url: string | null; origin: string | null; size: string | null; room_type: string | null; }

const CollectionsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [roomFilter, setRoomFilter] = useState("Tất cả");
  const [sizeFilter, setSizeFilter] = useState("Tất cả");
  const [originFilter, setOriginFilter] = useState("Tất cả");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || fetched) return;
    setFetched(true);
    setIsLoading(true);
    (async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        let query = supabase.from("products").select("*").eq("in_stock", true).order("created_at", { ascending: false });
        if (roomFilter !== "Tất cả") query = query.eq("room_type", roomFilter);
        if (sizeFilter !== "Tất cả") query = query.eq("size", sizeFilter);
        if (originFilter !== "Tất cả") query = query.eq("origin", originFilter);
        const { data } = await query;
        setProducts(data || []);
      } catch { setProducts([]); }
      finally { setIsLoading(false); }
    })();
  }, [inView, fetched, roomFilter, sizeFilter, originFilter]);

  const handleRoomFilter = useCallback((v: string) => { setRoomFilter(v); setFetched(false); }, []);
  const handleSizeFilter = useCallback((v: string) => { setSizeFilter(v); setFetched(false); }, []);
  const handleOriginFilter = useCallback((v: string) => { setOriginFilter(v); setFetched(false); }, []);

  const hasProducts = products && products.length > 0;
  const animStyle = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section id="products" className="py-24 md:py-40 bg-secondary" ref={ref} aria-label="Bộ sưu tập gạch ốp lát">
      <div className="section-padding">
        <div style={animStyle(0)} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Bộ sưu tập gạch nhập khẩu</p>
            <h2 className="section-title">Khám phá <em className="italic">gạch ốp lát cao cấp</em></h2>
          </div>
          <a href="#" className="btn-outline mt-8 md:mt-0 self-start md:self-auto">Xem tất cả <ArrowRight className="w-4 h-4" /></a>
        </div>

        {(hasProducts || isLoading) && (
          <div style={animStyle(0.2)} className="mb-12 space-y-4">
            <FilterRow label="Phòng" options={ROOM_FILTERS} value={roomFilter} onChange={handleRoomFilter} />
            <FilterRow label="Kích thước" options={SIZE_FILTERS} value={sizeFilter} onChange={handleSizeFilter} />
            <FilterRow label="Xuất xứ" options={ORIGIN_FILTERS} value={originFilter} onChange={handleOriginFilter} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />) : hasProducts ? (
            products.map((p, i) => (
              <div key={p.id} style={animStyle(i * 0.15)} className="group relative overflow-hidden block">
                <div className="overflow-hidden aspect-[8/5]">
                  <img src={p.image_url || col1} alt={p.name} width={800} height={500} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display text-2xl md:text-3xl font-light text-primary-foreground drop-shadow-lg">{p.name}</h3>
                  <p className="font-body text-xs text-primary-foreground/80 mt-2 uppercase tracking-[0.15em] drop-shadow-lg">{[p.origin, p.size, p.room_type].filter(Boolean).join(" — ")}</p>
                </div>
              </div>
            ))
          ) : (
            staticCollections.map((col, i) => (
              <a key={col.title} href="#" style={animStyle(i * 0.15)} className="group relative overflow-hidden block">
                <div className="overflow-hidden aspect-[8/5]">
                  <img src={col.img} alt={col.alt} width={800} height={500} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display text-2xl md:text-3xl font-light text-primary-foreground drop-shadow-lg">{col.title}</h3>
                  <p className="font-body text-xs text-primary-foreground/80 mt-2 uppercase tracking-[0.15em] drop-shadow-lg">{col.desc}</p>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const SkeletonCard = () => (
  <div className="relative overflow-hidden">
    <div className="aspect-[8/5] bg-muted animate-pulse" />
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <div className="h-8 w-3/4 mb-2 bg-muted-foreground/20 animate-pulse" />
      <div className="h-4 w-1/2 bg-muted-foreground/20 animate-pulse" />
    </div>
  </div>
);

const FilterRow = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground w-20">{label}</span>
    {options.map((opt) => (
      <button key={opt} onClick={() => onChange(opt)} className={`font-body text-xs px-4 py-2 border transition-colors duration-200 ${value === opt ? "bg-foreground text-background border-foreground" : "bg-transparent text-foreground border-border hover:border-foreground"}`}>{opt}</button>
    ))}
  </div>
);

export default CollectionsSection;
