import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductForm from "./ProductForm";

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  origin: string | null;
  size: string | null;
  room_type: string | null;
  in_stock: boolean;
  created_at: string;
}

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Xoá sản phẩm này?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const handleEdit = (p: Product) => {
    setEditProduct(p);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground text-primary-foreground py-4 section-padding flex items-center justify-between">
        <h1 className="font-display text-2xl font-light">Quản lý sản phẩm</h1>
        <button onClick={onLogout} className="font-body text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Đăng xuất</button>
      </header>

      <div className="section-padding py-8">
        <button onClick={() => { setEditProduct(null); setShowForm(true); }} className="btn-primary mb-8">+ Thêm sản phẩm</button>

        {showForm && <ProductForm product={editProduct} onClose={handleFormClose} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border border-border p-4">
              {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-48 object-cover mb-4" loading="lazy" />}
              <h3 className="font-display text-xl font-light mb-2">{p.name}</h3>
              <p className="font-body text-xs text-muted-foreground mb-1">{[p.origin, p.size, p.room_type].filter(Boolean).join(" — ")}</p>
              <p className="font-body text-xs mb-4">{p.in_stock ? "✓ Còn hàng" : "✗ Hết hàng"}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="font-body text-xs px-3 py-1 border border-border hover:bg-muted transition-colors">Sửa</button>
                <button onClick={() => handleDelete(p.id)} className="font-body text-xs px-3 py-1 border border-red-300 text-red-500 hover:bg-red-50 transition-colors">Xoá</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
