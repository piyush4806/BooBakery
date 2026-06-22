"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("boo_token", data.token);
      localStorage.setItem("boo_user", JSON.stringify(data.user));
      
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
      {/* Decorative Blob */}
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(246,230,235,1) 0%, rgba(252,237,242,0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{ padding: "2rem", position: "relative", zIndex: 10 }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)", fontWeight: "500", textDecoration: "none" }}>
          <ArrowLeft size={18} /> Back to Shop
        </Link>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem", position: "relative", zIndex: 10 }} className="container">
        <div className="glassmorphism auth-card" style={{ width: "100%", maxWidth: "420px", padding: "3rem 2.5rem", borderRadius: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <img src="/images/boobakery-logo.png" alt="logo" style={{ height: "50px", marginBottom: "1rem" }} />
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Welcome Back</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Log in to satisfy your sweet cravings.</p>
          </div>

          {error && (
            <div style={{ backgroundColor: "rgba(220, 39, 67, 0.1)", color: "#dc2743", padding: "0.8rem", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", textAlign: "center", border: "1px solid rgba(220, 39, 67, 0.2)" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                style={{ width: "100%", padding: "0.8rem 1rem 0.8rem 2.8rem", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "0.95rem" }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                style={{ width: "100%", padding: "0.8rem 1rem 0.8rem 2.8rem", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "0.95rem" }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem", padding: "0.9rem", fontSize: "1rem" }}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "var(--text-secondary)", fontWeight: "600", textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
