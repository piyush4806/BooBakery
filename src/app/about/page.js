"use client";

import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Star,
  Award,
  Leaf,
  Gift,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

// Custom Instagram SVG icon (not available in this lucide-react version)
const InstagramIcon = ({ size = 24, style = {} }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const INSTAGRAM_URL = "https://www.instagram.com/_boobakeryy_/";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
      
      {/* Decorative Spheres */}
      <div style={{
        position: "absolute",
        top: "-10%",
        left: "-10%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(246,230,235,0.8) 0%, rgba(252,237,242,0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        top: "50%",
        right: "-15%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(246,230,235,0.6) 0%, rgba(252,237,242,0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* Header */}
      <header className="glassmorphism" style={{
        position: "sticky",
        top: "1rem",
        zIndex: 50,
        margin: "1rem 2rem 0",
        padding: "0.8rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img 
            src="/images/boobakery-logo.png" 
            alt="boobakery logo" 
            style={{ height: "40px", width: "auto", objectFit: "contain" }} 
          />
          <span style={{
            fontFamily: "var(--font-serif)",
            fontWeight: "bold",
            fontSize: "1.6rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.02em"
          }}>
            boobakery
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontWeight: "600",
            color: "var(--text-primary)",
            fontSize: "0.9rem"
          }}>
            <ArrowLeft size={16} /> Back to Shop
          </Link>
          <a 
            href={INSTAGRAM_URL}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.3rem",
              fontWeight: "500", 
              color: "#dc2743"
            }}
          >
            <InstagramIcon size={20} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 0 3rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1.2rem", backgroundColor: "var(--accent-rose-light)", borderRadius: "50px", color: "var(--text-secondary)", fontWeight: "600", fontSize: "0.85rem", marginBottom: "2rem" }}>
            <Heart size={14} style={{ fill: "var(--text-secondary)" }} /> Our Story
          </div>

          <h1 style={{
            fontSize: "3.8rem",
            lineHeight: "1.15",
            marginBottom: "1.5rem",
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
            maxWidth: "700px",
            margin: "0 auto 1.5rem"
          }}>
            A little kitchen, <br />
            <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>a big chocolate dream</span>
          </h1>
          <p style={{
            fontSize: "1.15rem",
            color: "var(--text-muted)",
            lineHeight: "1.8",
            maxWidth: "620px",
            margin: "0 auto"
          }}>
            boobakery was born from a simple belief — that everyone deserves a moment of sweetness, crafted with real ingredients, honest love, and a little bit of magic.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section style={{ position: "relative", zIndex: 1, padding: "2rem 0 5rem" }}>
        <div className="container">
          
          {/* Story Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", maxWidth: "1000px", margin: "0 auto 4rem" }}>
            
            {/* Story Image Panel */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="float-animation" style={{
                width: "100%",
                aspectRatio: "0.9",
                borderRadius: "30% 70% 50% 50% / 50% 30% 70% 50%",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(92, 29, 48, 0.2)",
                border: "8px solid white"
              }}>
                <img 
                  src="/images/dry-fruit-chocolates.png" 
                  alt="boobakery handcrafted chocolates" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ position: "absolute", top: "5%", right: "5%" }} className="sparkle-icon">
                <Sparkles size={32} />
              </div>
              <div style={{ position: "absolute", bottom: "10%", left: "0%" }} className="sparkle-icon">
                <Sparkles size={20} />
              </div>
            </div>

            {/* Story Text Panel */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
              <h2 style={{ fontSize: "2.2rem", color: "var(--text-primary)" }}>
                How It All Began
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
                It started in a tiny home kitchen — just a handful of cacao beans, a bag of almonds, and an unwavering passion for making people smile through chocolate.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
                What began as gifting handmade treats to friends and family soon turned into something much bigger. The feedback was overwhelmingly warm — <em>"These taste like they're made with love."</em> And that's exactly what they are.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
                boobakery was founded on the idea that chocolate should feel personal. Every piece is hand-tempered, every filling is prepared from scratch, and every box is packed with the kind of care you'd put into a gift for someone you love.
              </p>

              <div style={{
                display: "flex",
                gap: "0.8rem",
                padding: "1rem 1.2rem",
                backgroundColor: "var(--accent-rose-light)",
                borderRadius: "16px",
                alignItems: "center",
                borderLeft: "4px solid var(--accent-gold)"
              }}>
                <Sparkles size={20} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <p style={{ fontSize: "0.95rem", fontStyle: "italic", color: "var(--text-secondary)", fontWeight: "500", lineHeight: "1.5" }}>
                  "We don't mass-produce. We handcraft. Every bite is a promise of quality, freshness, and pure chocolate joy."
                </p>
              </div>
            </div>
          </div>

          {/* Values Cards */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.2rem", textAlign: "center", marginBottom: "0.5rem" }}>What Makes Us Special</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)", margin: "0.8rem 0 2.5rem" }}>
              <Sparkles size={16} />
              <div style={{ width: "60px", height: "1px", backgroundColor: "var(--accent-rose)" }}></div>
              <Sparkles size={16} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
              {[
                {
                  icon: Leaf,
                  title: "Natural Ingredients",
                  desc: "We use only premium single-origin cacao, real dry fruits, and organic fillings. No artificial colors, no preservatives — just pure goodness."
                },
                {
                  icon: Heart,
                  title: "Handcrafted with Love",
                  desc: "Every chocolate is hand-tempered, hand-filled, and hand-packed in small batches. We treat each piece like a work of art."
                },
                {
                  icon: Award,
                  title: "Quality Over Quantity",
                  desc: "We never compromise on taste. Our recipes are perfected over months of experimentation to bring you the most indulgent flavors."
                },
                {
                  icon: Gift,
                  title: "Perfect for Gifting",
                  desc: "From elegant boxes to custom hampers, every order is designed to make someone's day special. Because chocolate is the language of love."
                }
              ].map((value, idx) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={idx}
                    className="glassmorphism"
                    style={{
                      padding: "2rem 1.5rem",
                      textAlign: "center",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "var(--accent-rose-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.2rem",
                      color: "var(--text-secondary)"
                    }}>
                      <IconComponent size={26} />
                    </div>
                    <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--text-primary)" }}>
                      {value.title}
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                      {value.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Our Menu Categories Section */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.2rem", textAlign: "center", marginBottom: "2.5rem" }}>What We Create</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
              {[
                { 
                  title: "Dry Fruit Chocolates", 
                  desc: "Almonds, cashews & berries meet premium dark chocolate.", 
                  image: "/images/dry-fruit-chocolates.png",
                  emoji: "🥜"
                },
                { 
                  title: "Fruity Choco Pops", 
                  desc: "Bursts of pomegranate & blueberry in every bite.", 
                  image: "/images/fruity-choco-pops.png",
                  emoji: "🫐"
                },
                { 
                  title: "Stuffed Dates & Kunafa", 
                  desc: "Natural dates stuffed with nuts and crispy kunafa layers.", 
                  image: "/images/stuffed-dates-kunafa.png",
                  emoji: "🌴"
                },
                { 
                  title: "Chocolate Bites", 
                  desc: "Sea salt caramel, praline, peanut butter & dark chocolate.", 
                  image: "/images/chocolate-bites.png",
                  emoji: "🍫"
                }
              ].map((cat, idx) => (
                <div 
                  key={idx}
                  className="glassmorphism"
                  style={{
                    overflow: "hidden",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{
                    height: "160px",
                    overflow: "hidden"
                  }}>
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} 
                    />
                  </div>
                  <div style={{ padding: "1.2rem" }}>
                    <h3 style={{ fontSize: "1.05rem", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span>{cat.emoji}</span> {cat.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      {cat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Love */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.2rem", textAlign: "center", marginBottom: "0.5rem" }}>Loved by Our Customers</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)", margin: "0.8rem 0 2.5rem" }}>
              <Star size={16} style={{ fill: "var(--accent-gold)" }} />
              <Star size={16} style={{ fill: "var(--accent-gold)" }} />
              <Star size={16} style={{ fill: "var(--accent-gold)" }} />
              <Star size={16} style={{ fill: "var(--accent-gold)" }} />
              <Star size={16} style={{ fill: "var(--accent-gold)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
              {[
                {
                  name: "Priya S.",
                  text: "Ordered the Almond Clusters for Diwali gifting — everyone was asking where I got them from! Absolutely divine taste and beautiful packaging.",
                  rating: 5
                },
                {
                  name: "Arjun M.",
                  text: "The Sea Salt Caramel Bites are addictive. You can really tell these are handmade with quality ingredients. Already placed my second order!",
                  rating: 5
                },
                {
                  name: "Fatima R.",
                  text: "Best stuffed dates I've ever had. The kunafa bites literally melt in your mouth. boobakery is my go-to for all festive treats now.",
                  rating: 5
                }
              ].map((review, idx) => (
                <div 
                  key={idx}
                  className="glassmorphism"
                  style={{ padding: "1.5rem" }}
                >
                  <div style={{ display: "flex", gap: "0.2rem", marginBottom: "0.8rem" }}>
                    {Array(review.rating).fill(null).map((_, i) => (
                      <Star key={i} size={14} style={{ fill: "var(--accent-gold)", color: "var(--accent-gold)" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.6", fontStyle: "italic", marginBottom: "1rem" }}>
                    "{review.text}"
                  </p>
                  <span style={{ fontWeight: "600", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                    — {review.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram CTA */}
          <div 
            className="glassmorphism"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "3rem 2.5rem",
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(240,148,51,0.05) 0%, rgba(220,39,67,0.08) 50%, rgba(188,24,136,0.05) 100%)",
              border: "1px solid rgba(220,39,67,0.15)"
            }}
          >
            <InstagramIcon size={48} style={{ color: "#dc2743", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Follow Us on Instagram</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              Stay connected with boobakery! See behind-the-scenes, new launches, festive specials, and customer stories on our Instagram page.
            </p>
            <a 
              href={INSTAGRAM_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
              style={{ 
                background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2.5rem",
                fontSize: "1rem"
              }}
            >
              <InstagramIcon size={18} /> @_boobakeryy_
            </a>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer style={{
        marginTop: "auto",
        backgroundColor: "var(--bg-dark-accent)",
        color: "var(--bg-primary)",
        padding: "4rem 2rem 2rem",
        borderTop: "3px solid var(--accent-gold)"
      }}>
        <div className="container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3rem"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
              <img 
                src="/images/boobakery-logo.png" 
                alt="boobakery logo" 
                style={{ height: "36px", width: "auto", objectFit: "contain", filter: "brightness(2)" }} 
              />
              <span style={{
                fontFamily: "var(--font-serif)",
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "var(--bg-primary)",
                letterSpacing: "0.02em"
              }}>
                boobakery
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", opacity: 0.8, lineHeight: "1.6" }}>
              Creating moments of pure delight with our artisan recipe dark chocolates, fruity infusions, and stuffed nut dates.
            </p>
          </div>

          <div>
            <h4 style={{ color: "var(--bg-primary)", fontSize: "1.1rem", marginBottom: "1.2rem", letterSpacing: "0.05em" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.9rem", opacity: 0.9 }}>
              <li><Link href="/">Shop Chocolates</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <InstagramIcon size={14} /> Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "var(--bg-primary)", fontSize: "1.1rem", marginBottom: "1.2rem", letterSpacing: "0.05em" }}>Contact Us</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.9rem", opacity: 0.9 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Phone size={14} /> +91 98765 43210</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Mail size={14} /> hello@boobakery.in</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={14} /> India</li>
              <li>
                <a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <InstagramIcon size={14} /> @_boobakeryy_
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "2rem",
          textAlign: "center",
          fontSize: "0.85rem",
          opacity: 0.7
        }}>
          © {new Date().getFullYear()} boobakery. All Rights Reserved. Handmade with love & chocolate.
        </div>
      </footer>
    </div>
  );
}
