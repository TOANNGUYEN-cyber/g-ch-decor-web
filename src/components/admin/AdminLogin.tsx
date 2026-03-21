import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-light text-center mb-8">Đăng nhập Admin</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent" />
          <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent" />
          {error && <p className="text-sm text-red-500 font-body">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">{loading ? "Đang đăng nhập..." : "Đăng nhập"}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
