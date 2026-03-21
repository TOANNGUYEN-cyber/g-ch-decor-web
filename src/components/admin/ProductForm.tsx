import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  origin: string | null;
  size: string | null;
  room_type: string | null;
  in_stock: boolean;
  category: string | null;
  pattern: string | null;
  price: number | null;
}

const ProductForm = ({ product, onClose }: { product: Product | null; onClose: () => void }) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    image_url: product?.image_url || "",
    origin: product?.origin || "",
    size: product?.size || "",
    room_type: product?.room_type || "",
    in_stock: product?.in_stock ?? true,
    category: product?.category || "vietnam",
    pattern: product?.pattern || "",
    price: product?.price || 0,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (!error) {
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (product) {
      await supabase.from("products").update(form).eq("id", product.id);
    } else {
      await supabase.from("products").insert(form);
    }
    setSaving(false);
    onClose();
  };

  return (
    <div className="border border-border p-6 mb-8 bg-card">
      <h2 className="font-display text-2xl font-light mb-6">{product ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input type="text" placeholder="Tên sản phẩm" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:border-accent" />

        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="font-body text-sm" />
          {uploading && <p className="text-xs text-muted-foreground mt-1">Đang tải ảnh...</p>}
          {form.image_url && <img src={form.image_url} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 border border-border bg-background font-body text-sm">
          <option value="vietnam">Việt Nam</option>
          <option value="imported">Nhập khẩu</option>
        </select>

        <select value={form.origin} onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))} className="w-full px-4 py-3 border border-border bg-background font-body text-sm">
          <option value="">Xuất xứ</option>
          <option value="Tây Ban Nha">Tây Ban Nha</option>
          <option value="Ấn Độ">Ấn Độ</option>
          <option value="Italy">Italy</option>
          <option value="Việt Nam">Việt Nam</option>
        </select>

        <select value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} className="w-full px-4 py-3 border border-border bg-background font-body text-sm">
          <option value="">Kích thước</option>
          <option value="60x60">60x60</option>
          <option value="60x120">60x120</option>
          <option value="80x80">80x80</option>
          <option value="80x160">80x160</option>
          <option value="120x120">120x120</option>
        </select>

        <select value={form.pattern} onChange={(e) => setForm((f) => ({ ...f, pattern: e.target.value }))} className="w-full px-4 py-3 border border-border bg-background font-body text-sm">
          <option value="">Bộ vân</option>
          <option value="Vân đá">Vân đá</option>
          <option value="Vân gỗ">Vân gỗ</option>
          <option value="Vân cement">Vân cement</option>
          <option value="Trơn màu">Trơn màu</option>
          <option value="Mosaic">Mosaic</option>
        </select>

        <select value={form.room_type} onChange={(e) => setForm((f) => ({ ...f, room_type: e.target.value }))} className="w-full px-4 py-3 border border-border bg-background font-body text-sm">
          <option value="">Loại phòng</option>
          <option value="Phòng khách">Phòng khách</option>
          <option value="Phòng ngủ">Phòng ngủ</option>
          <option value="Phòng tắm">Phòng tắm</option>
          <option value="Bếp">Bếp</option>
          <option value="Sân vườn">Sân vườn</option>
        </select>

        <div>
          <label className="font-body text-sm text-muted-foreground mb-1 block">Giá (đ/m²)</label>
          <input type="number" placeholder="VD: 275000" value={form.price || ""} onChange={(e) => setForm((f) => ({ ...f, price: parseInt(e.target.value) || 0 }))} className="w-full px-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:border-accent" />
        </div>

        <label className="flex items-center gap-2 font-body text-sm">
          <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))} />
          Còn hàng
        </label>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">{saving ? "Đang lưu..." : (product ? "Cập nhật" : "Thêm")}</button>
          <button type="button" onClick={onClose} className="btn-outline">Huỷ</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
