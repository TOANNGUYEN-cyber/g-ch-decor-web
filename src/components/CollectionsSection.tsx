import { useRef, useState, useEffect, useCallback } from "react";
import col1 from "@/assets/collection-1.webp";
import col2 from "@/assets/collection-2.webp";
import col3 from "@/assets/collection-3.webp";
import col4 from "@/assets/collection-4.webp";

const staticProducts = [
  { img: col1, title: "Gạch vân đá cẩm thạch", origin: "Tây Ban Nha", size: "80x160", price: "450.000đ/m²" },
  { img: col2, title: "Gạch đá tối cao cấp", origin: "Ấn Độ", size: "60x120", price: "320.000đ/m²" },
  { img: col3, title: "Gạch Calacatta Italy", origin: "Italy", size: "120x120", price: "580.000đ/m²" },
  { img: col4, title: "Gạch ngoại thất", origin: "Việt Nam", size: "60x60", price: "185.000đ/m²" },
];

const CATEGORY_FILTERS = ["Tất cả", "Việt Nam", "Nhập khẩu"];
const SIZE_FILTERS = ["Tất cả", "60x60", "60x120", "80x80", "80x160", "120x120"];
const PATTERN_FILTERS = ["Tất cả", "Vân đá", "Vân gỗ", "Vân cement", "Trơn màu", "Mosaic"];
const ORIGIN_FILTERS = ["Tất cả", "Tây Ban Nha", "Ấn Độ", "Italy", "Việt Nam"];
const ROOM_FILTERS = ["Tất cả", "Phòng khách", "Phòng ngủ", "Phòng tắm", "Bếp", "Sân vườn"];
const PRICE_FILTERS = ["Tất cả", "Dưới 200k", "200k - 400k", "400k - 600k", "Trên 600k"];

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  origin: string | null;
  size: string | null;
  room_type: string | null;
  category: string | null;
  pattern: string | null;
  price: number | null;
}

const CollectionsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");
  const [sizeFilter, setSizeFilter] = useState("Tất cả");
  const [patternFilter, setPatternFilter] = useState("Tất cả");
  const [originFilter, setOriginFilter] = useState("Tất cả");
  const [roomFilter, setRoomFilter] = useState("Tất cả");
  const [priceFilter, setPriceFilter] = useState("Tất cả");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
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

        if (categoryFilter === "Việt Nam") query = query.eq("category", "vietnam");
        else if (categoryFilter === "Nhập khẩu") query = query.neq("category", "vietnam");

        if (sizeFilter !== "Tất cả") query = query.eq("size", sizeFilter);
        if (originFilter !== "Tất cả") query = query.eq("origin", originFilter);
        if (roomFilter !== "Tất cả") query = query.eq("room_type", roomFilter);
        if (patternFilter !== "Tất cả") query = query.eq("pattern", patternFilter);

        if (priceFilter === "Dưới 200k") query = query.lt("price", 200000);
        else if (priceFilter === "200k - 400k") query = query.gte("price", 200000).lte("price", 400000);
        else if (priceFilter === "400k - 600k") query = query.gte("price", 400000).lte("price", 600000);
        else if (priceFilter === "Trên 600k") query = query.gt("price", 600000);

        const { data } = await query;
        setProducts(data || []);
      } catch { setProducts([]); }
      finally { setIsLoading(false); }
    })();
  }, [inView, fetched, categoryFilter, sizeFilter, patternFilter, originFilter, roomFilter, priceFilter]);

  const resetFetched = useCallback(() => setFetched(false), []);

  const activeFilterCount = [categoryFilter, sizeFilter, patternFilter, originFilter, roomFilter, priceFilter].filter(f => f !== "Tất cả").length;
  const hasProducts = products && products.length > 0;

  const formatPrice = (price: number | null) => {
    if (!price) return "";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ/m²";
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-background" ref={ref} aria-label="Sản phẩm gạch ốp lát">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Khám phá sản phẩm</p>
            <h2 className="font-display text-3xl md:text-4xl font-light uppercase tracking-wide">
              Sản phẩm
            </h2>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] px-5 py-2.5 border border-border hover:border-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M3 6h18M7 12h10M10 18h4" />
            </svg>
            Bộ lọc {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-0 border-b border-border mb-8">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategoryFilter(cat); resetFetched(); }}
              className={`font-body text-xs uppercase tracking-[0.15em] px-6 py-3 border-b-2 transition-colors ${
                categoryFilter === cat
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="mb-8 p-6 bg-secondary border border-border space-y-4 animate-fade-in">
            <FilterRow label="Kích thước" options={SIZE_FILTERS} value={sizeFilter} onChange={(v) => { setSizeFilter(v); resetFetched(); }} />
            <FilterRow label="Bộ vân" options={PATTERN_FILTERS} value={patternFilter} onChange={(v) => { setPatternFilter(v); resetFetched(); }} />
            <FilterRow label="Xuất xứ" options={ORIGIN_FILTERS} value={originFilter} onChange={(v) => { setOriginFilter(v); resetFetched(); }} />
            <FilterRow label="Loại phòng" options={ROOM_FILTERS} value={roomFilter} onChange={(v) => { setRoomFilter(v); resetFetched(); }} />
            <FilterRow label="Giá thành" options={PRICE_FILTERS} value={priceFilter} onChange={(v) => { setPriceFilter(v); resetFetched(); }} />
            <button
              onClick={() => {
                setSizeFilter("Tất cả"); setPatternFilter("Tất cả"); setOriginFilter("Tất cả");
                setRoomFilter("Tất cả"); setPriceFilter("Tất cả"); resetFetched();
              }}
              className="font-body text-xs text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Xoá tất cả bộ lọc
            </button>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : hasProducts ? (
            products.map((p, i) => (
              <ProductCard
                key={p.id}
                img={p.image_url || col1}
                title={p.name}
                origin={p.origin}
                size={p.size}
                price={formatPrice(p.price)}
                pattern={p.pattern}
                inView={inView}
                delay={i * 0.05}
              />
            ))
          ) : (
            staticProducts.map((p, i) => (
              <ProductCard
                key={p.title}
                img={p.img}
                title={p.title}
                origin={p.origin}
                size={p.size}
                price={p.price}
                inView={inView}
                delay={i * 0.1}
              />
            ))
          )}
        </div>

        {hasProducts && products.length >= 12 && (
          <div className="text-center mt-12">
            <button className="btn-outline">Xem thêm sản phẩm</button>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({ img, title, origin, size, price, pattern, inView, delay }: {
  img: string; title: string; origin: string | null; size: string | null;
  price: string; pattern?: string | null; inView: boolean; delay: number;
}) => (
  <div
    className={`group cursor-pointer transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    style={{ transitionDelay: inView ? `${delay}s` : "0ms" }}
  >
    <div className="aspect-square overflow-hidden mb-3 bg-secondary">
      <img
        src={img}
        alt={title}
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <h3 className="font-display text-base md:text-lg font-light mb-1 leading-tight">{title}</h3>
    <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">
      {[origin, size, pattern].filter(Boolean).join(" · ")}
    </p>
    {price && (
      <p className="font-body text-sm font-medium text-accent mt-1">{price}</p>
    )}
  </div>
);

const SkeletonCard = () => (
  <div>
    <div className="aspect-square bg-muted animate-pulse mb-3" />
    <div className="h-5 w-3/4 bg-muted animate-pulse mb-2" />
    <div className="h-3 w-1/2 bg-muted animate-pulse" />
  </div>
);

const FilterRow = ({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground w-20 flex-shrink-0">{label}</span>
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`font-body text-[11px] px-3 py-1.5 border transition-colors duration-200 ${
          value === opt
            ? "bg-foreground text-background border-foreground"
            : "bg-transparent text-foreground border-border hover:border-foreground"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default CollectionsSection;
