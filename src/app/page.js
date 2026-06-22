"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  X, 
  Check, 
  Info,
  Phone,
  MapPin,
  Mail
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

// Custom Instagram SVG icon (not available in this lucide-react version)
const InstagramIcon = ({ size = 24, style = {} }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const API_URL = typeof window !== 'undefined' 
  ? `http://${window.location.hostname}:5001` 
  : 'http://localhost:5001';

const INSTAGRAM_URL = "https://www.instagram.com/_boobakeryy_/";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [productQuantities, setProductQuantities] = useState({});
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [placedOrder, setPlacedOrder] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showSplash, setShowSplash] = useState(true);
  const [splashFadeOut, setSplashFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 400);

    const fadeOutTimer = setTimeout(() => {
      setSplashFadeOut(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        const initialOptions = {};
        data.forEach(p => {
          initialOptions[p.id] = 0;
        });
        setSelectedOptions(initialOptions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to connect to boobakery servers. Please ensure the backend server is running.");
        setLoading(false);
      });

    const savedCart = localStorage.getItem("boo_cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem("boo_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const savedUser = localStorage.getItem("boo_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("boo_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("boo_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const categories = ["All", "Dry Fruit Chocolates", "Fruity Choco Pops", "Assorted Stuffed Dates & Kunafa", "Chocolate Bites"];
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleSizeChange = (productId, optionIndex) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: optionIndex
    }));
  };

  const addToCart = (product) => {
    const selectedIdx = selectedOptions[product.id] || 0;
    const selectedOption = product.options[selectedIdx];
    const quantityToAdd = productQuantities[product.id] || 1;
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.size === selectedOption.size
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantityToAdd;
        return updatedCart;
      } else {
        return [...prevCart, {
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          size: selectedOption.size,
          price: selectedOption.price,
          quantity: quantityToAdd
        }];
      }
    });

    setProductQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#5C1D30', '#C39A9B']
    });

    setIsCartOpen(true);
  };

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some(item => item.id === product.id);
    if (isWishlisted) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
    } else {
      setWishlist(prev => [...prev, product]);
      confetti({
        particleCount: 15,
        spread: 30,
        colors: ['#D4AF37']
      });
    }
  };

  const moveFromWishlistToCart = (product) => {
    addToCart(product);
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const handleLogout = () => {
    localStorage.removeItem("boo_token");
    localStorage.removeItem("boo_user");
    setUser(null);
  };

  const adjustQuantity = (itemId, size, amount) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId && item.size === size) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      });
    });
  };

  const removeFromCart = (itemId, size) => {
    setCart(prev => prev.filter(item => !(item.id === itemId && item.size === size)));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      alert("Please fill in name, phone number, and address.");
      return;
    }

    const orderPayload = {
      customer: checkoutForm,
      items: cart,
      total: cartSubtotal
    };

    fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Order creation failed");
        return res.json();
      })
      .then(order => {
        setPlacedOrder(order);
        setCart([]);
        setShowCheckout(false);
        setIsCartOpen(false);
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      })
      .catch(err => {
        console.error(err);
        alert("There was an error placing your order. Please check that the server is active.");
      });
  };

  if (showSplash) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'opacity 0.3s ease',
        opacity: splashFadeOut ? 0 : 1,
        pointerEvents: splashFadeOut ? 'none' : 'auto',
      }}>
        <style>{`
          @keyframes slideUpFade {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes textReveal {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <div style={{
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          background: 'radial-gradient(circle, rgba(232,201,205,0.4) 0%, rgba(252,237,242,0) 70%)',
        }}>
          <img 
            src="/images/image.png" 
            alt="BooBakery Pastry" 
            style={{
              width: '85%',
              height: '85%',
              objectFit: 'cover',
              borderRadius: '30% 70% 50% 50% / 50% 30% 70% 50%',
              boxShadow: '0 20px 40px -10px rgba(92, 29, 48, 0.3)',
              border: '6px solid white'
            }}
          />
        </div>
        
        {showText && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            marginTop: '2.5rem',
            animation: 'textReveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }}>
            <img 
              src="/images/boobakery-logo.png" 
              alt="BooBakery Logo" 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '3px solid var(--accent-rose)',
                backgroundColor: 'pink',
                objectFit: 'cover'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Happy Diwali from
              </span>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.8rem',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1'
              }}>
                BooBakery
              </h1>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="main-layout" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Announcement Bar */}
      <div style={{
        backgroundColor: "var(--text-secondary)",
        color: "var(--bg-primary)",
        textAlign: "center",
        padding: "0.6rem",
        fontSize: "0.85rem",
        fontWeight: "600",
        letterSpacing: "0.05em",
        zIndex: 100,
        position: "relative"
      }}>
        🪔 Happy Diwali! Use code <span style={{ color: "var(--accent-gold)" }}>DIWALI20</span> for 20% off all Gift Hampers! 🪔
      </div>

      {/* Decorative Blur Spheres */}
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
      <div style={{
        position: "absolute",
        top: "30%",
        left: "-15%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(246,230,235,0.8) 0%, rgba(252,237,242,0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* Navigation Header */}
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
            style={{ 
              height: "45px", 
              width: "45px", 
              objectFit: "cover",
              borderRadius: "50%",
              border: "2px solid pink",
              backgroundColor: "pink"
            }} 
          />
          <span style={{
            fontFamily: "var(--font-serif)",
            fontWeight: "bold",
            fontSize: "1.6rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.02em"
          }}>
            BooBakery
          </span>
        </div>

        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="nav-links">
          <a href="#menu-section" style={{ fontWeight: "500", color: "var(--text-primary)" }}>Shop</a>
          <Link href="/about" style={{ fontWeight: "500", color: "var(--text-primary)" }}>About Us</Link>
          <a 
            href={INSTAGRAM_URL}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.3rem",
              fontWeight: "500", 
              color: "var(--text-primary)",
              padding: "0.35rem 0.8rem",
              borderRadius: "50px",
              background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            <InstagramIcon size={18} style={{ color: "#dc2743" }} /> Instagram
          </a>
          
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "1rem", paddingLeft: "1rem", borderLeft: "1px solid var(--border-color)" }}>
              <span style={{ fontWeight: "600", color: "var(--text-secondary)", fontSize: "0.9rem" }}>Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500" }}>Logout</button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "1rem", paddingLeft: "1rem", borderLeft: "1px solid var(--border-color)" }}>
              <Link href="/login" style={{ fontWeight: "500", color: "var(--text-primary)" }}>Login</Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem", borderRadius: "50px" }}>Sign Up</Link>
            </div>
          )}
        </nav>

        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          {/* Wishlist Icon with count */}
          <button 
            onClick={() => setIsWishlistOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              color: "var(--text-primary)"
            }}
            aria-label="Open Wishlist"
          >
            <Heart size={24} className={wishlist.length > 0 ? "sparkle-icon" : ""} style={{ fill: wishlist.length > 0 ? "var(--text-secondary)" : "none" }} />
            {wishlist.length > 0 && (
              <span style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "var(--text-secondary)",
                color: "var(--bg-primary)",
                fontSize: "0.7rem",
                fontWeight: "bold",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon with count */}
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "0.4rem 1rem",
              borderRadius: "50px",
              backgroundColor: "var(--text-primary)",
              color: "var(--bg-primary)",
              gap: "0.5rem"
            }}
            aria-label="Open Cart"
          >
            <ShoppingBag size={18} />
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              ₹{cartSubtotal}
            </span>
            {cart.length > 0 && (
              <span style={{
                backgroundColor: "var(--accent-gold)",
                color: "var(--text-primary)",
                fontSize: "0.75rem",
                fontWeight: "bold",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="section" style={{ position: "relative", zIndex: 1, paddingBottom: "2rem" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", backgroundColor: "var(--accent-rose-light)", borderRadius: "50px", color: "var(--text-secondary)", fontWeight: "600", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              <Sparkles size={16} className="sparkle-icon" /> Natural crunch, rich chocolate... the perfect pair.
            </div>
            <h1 style={{
              fontSize: "4rem",
              lineHeight: "1.1",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)"
            }}>
              Celebrate the <br />
              <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Festival of Lights</span>
            </h1>
            <p style={{
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              lineHeight: "1.7",
              marginBottom: "2rem",
              maxWidth: "520px"
            }}>
              Light up your celebrations with BooBakery. Our exclusive Diwali hampers are handcrafted to spread joy, luxury, and sweetness to your loved ones.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#menu-section" className="btn btn-primary">
                Explore Menu <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
              </a>
              <Link href="/about" className="btn btn-secondary">
                Our Story
              </Link>
              <a 
                href={INSTAGRAM_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{ 
                  background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <InstagramIcon size={16} /> Follow Us
              </a>
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div className="float-animation" style={{
              width: "100%",
              aspectRatio: "1.1",
              background: "radial-gradient(circle, rgba(232,201,205,0.3) 0%, rgba(252,237,242,0) 70%)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}>
              <img 
                src="/images/chocolate-bites.png" 
                alt="boobakery Premium Chocolate Bites" 
                style={{
                  width: "85%",
                  height: "85%",
                  objectFit: "cover",
                  borderRadius: "30% 70% 50% 50% / 50% 30% 70% 50%",
                  boxShadow: "0 25px 50px -12px rgba(92, 29, 48, 0.25)",
                  border: "8px solid white"
                }}
              />
              <div style={{ position: "absolute", top: "10%", right: "10%" }} className="sparkle-icon">
                <Sparkles size={36} />
              </div>
              <div style={{ position: "absolute", bottom: "15%", left: "5%" }} className="sparkle-icon">
                <Sparkles size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main E-Commerce Section */}
      <section className="section" id="menu-section" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", position: "relative", zIndex: 2 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.8rem", marginBottom: "0.5rem" }}>Our Chocolate Collection</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)", margin: "0.8rem 0" }}>
              <Sparkles size={18} />
              <div style={{ width: "80px", height: "1px", backgroundColor: "var(--accent-rose)" }}></div>
              <Sparkles size={18} />
            </div>
            <p style={{ color: "var(--text-muted)", maxWidth: "580px", margin: "0 auto" }}>
              Select a size option to adjust the price. Add to your bag or click the heart to save for later.
            </p>
          </div>

          {/* Categories Tab Navigation */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.8rem",
            marginBottom: "3rem"
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.6rem 1.6rem",
                  borderRadius: "50px",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "var(--text-primary)" : "var(--border-color)",
                  backgroundColor: activeCategory === cat ? "var(--text-primary)" : "var(--bg-tertiary)",
                  color: activeCategory === cat ? "var(--bg-primary)" : "var(--text-primary)",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading, Error and Products Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.2rem", fontWeight: "500" }}>Loading sweet treats...</p>
            </div>
          ) : error ? (
            <div style={{
              textAlign: "center", 
              padding: "3rem", 
              margin: "0 auto", 
              maxWidth: "600px", 
              backgroundColor: "rgba(92,29,48,0.05)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px"
            }}>
              <Info size={32} style={{ color: "var(--text-secondary)", marginBottom: "1rem" }} />
              <h3 style={{ marginBottom: "0.5rem" }}>Server Connection Required</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ padding: "0.6rem 1.5rem" }}>
                Retry Connection
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2.5rem"
            }}>
              {filteredProducts.map((product) => {
                const selectedIndex = selectedOptions[product.id] || 0;
                const activeOption = product.options[selectedIndex];
                const isWishlisted = wishlist.some(item => item.id === product.id);

                return (
                  <div 
                    key={product.id} 
                    className="glassmorphism" 
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      position: "relative"
                    }}
                  >
                    {/* Example Offer Badge */}
                    {product.id === 1 && (
                      <div style={{
                        position: "absolute",
                        top: "1.5rem",
                        left: "-0.5rem",
                        backgroundColor: "var(--accent-gold)",
                        color: "var(--text-primary)",
                        padding: "0.4rem 1rem",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        letterSpacing: "0.05em",
                        zIndex: 10,
                        boxShadow: "0 4px 10px rgba(212, 175, 55, 0.3)",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                      }}>
                        15% OFF
                        {/* Ribbon tail effect */}
                        <div style={{
                          position: "absolute",
                          bottom: "-0.4rem",
                          left: 0,
                          width: 0,
                          height: 0,
                          borderTop: "0.4rem solid var(--accent-gold-hover)",
                          borderLeft: "0.5rem solid transparent"
                        }} />
                      </div>
                    )}

                    {/* Wishlist Button on Card */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      style={{
                        position: "absolute",
                        top: "1.5rem",
                        right: "1.5rem",
                        background: "rgba(255, 255, 255, 0.7)",
                        border: "none",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--text-primary)",
                        zIndex: 10,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                      }}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={18} style={{ fill: isWishlisted ? "var(--text-secondary)" : "none", color: isWishlisted ? "var(--text-secondary)" : "var(--text-primary)" }} />
                    </button>

                    <div>
                      <div className="product-blob-wrapper" style={{ marginBottom: "1.2rem" }}>
                        <img 
                          src={product.image.startsWith('http') ? product.image : `${API_URL}${product.image}`} 
                          alt={product.name} 
                          className="product-blob-image" 
                        />
                      </div>

                      <span style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--text-muted)",
                        fontWeight: "600"
                      }}>
                        {product.category}
                      </span>
                      <h3 style={{
                        fontSize: "1.35rem",
                        marginTop: "0.2rem",
                        marginBottom: "0.6rem",
                        color: "var(--text-primary)"
                      }}>
                        {product.name}
                      </h3>
                      <p style={{
                        fontSize: "0.88rem",
                        color: "var(--text-muted)",
                        lineHeight: "1.5",
                        marginBottom: "1.2rem",
                        minHeight: "44px"
                      }}>
                        {product.description}
                      </p>
                    </div>

                    <div>
                      {/* Size Selector Buttons */}
                      <div style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "1.2rem",
                        flexWrap: "wrap"
                      }}>
                        {product.options.map((opt, idx) => (
                          <button
                            key={opt.size}
                            onClick={() => handleSizeChange(product.id, idx)}
                            style={{
                              padding: "0.4rem 0.8rem",
                              borderRadius: "6px",
                              border: "1px solid",
                              borderColor: selectedIndex === idx ? "var(--text-primary)" : "var(--border-color)",
                              backgroundColor: selectedIndex === idx ? "var(--text-primary)" : "transparent",
                              color: selectedIndex === idx ? "var(--bg-primary)" : "var(--text-primary)",
                              fontSize: "0.78rem",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.2s ease"
                            }}
                          >
                            {opt.size}
                          </button>
                        ))}
                      </div>

                      {/* Price & Add to Cart row */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid rgba(92,29,48,0.1)",
                        paddingTop: "1rem"
                      }}>
                        <div>
                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Price</span>
                          <div style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--text-secondary)" }}>
                            ₹{activeOption.price}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "50px", backgroundColor: "var(--bg-tertiary)" }}>
                            <button 
                              onClick={() => setProductQuantities(prev => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] || 1) - 1) }))}
                              style={{ padding: "0.4rem 0.6rem", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{ padding: "0 0.2rem", fontSize: "0.85rem", fontWeight: "600", minWidth: "1.2rem", textAlign: "center", color: "var(--text-secondary)" }}>
                              {productQuantities[product.id] || 1}
                            </span>
                            <button 
                              onClick={() => setProductQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] || 1) + 1 }))}
                              style={{ padding: "0.4rem 0.6rem", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => addToCart(product)}
                            className="btn btn-gold"
                            style={{
                              padding: "0.6rem 1.4rem",
                              fontSize: "0.8rem",
                              borderRadius: "50px",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem"
                            }}
                          >
                            <ShoppingBag size={14} /> Add Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Cart Slider Drawer */}
      {isCartOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(74, 21, 2, 0.4)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          display: "flex",
          justifyContent: "flex-end"
        }} onClick={() => setIsCartOpen(false)}>
          <div 
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "100%",
              backgroundColor: "var(--bg-tertiary)",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              animation: "slideIn 0.3s ease"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.6rem" }}>Your Sweet Bag</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
                  aria-label="Close cart drawer"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
                  <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
                  <p>Your shopping bag is empty.</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn btn-secondary" style={{ marginTop: "1rem", padding: "0.5rem 1.2rem" }}>
                    Browse Chocolates
                  </button>
                </div>
              ) : (
                <div style={{ maxHeight: "calc(100vh - 360px)", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {cart.map((item) => (
                    <div 
                      key={`${item.id}-${item.size}`} 
                      style={{
                        display: "flex", 
                        gap: "1rem", 
                        borderBottom: "1px solid var(--border-color)", 
                        paddingBottom: "1rem",
                        alignItems: "center"
                      }}
                    >
                      <img 
                        src={item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`} 
                        alt={item.name} 
                        style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "10px", border: "2px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }} 
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: "1rem", marginBottom: "0.2rem" }}>{item.name}</h4>
                        <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", backgroundColor: "var(--bg-primary)", borderRadius: "4px", color: "var(--text-secondary)", fontWeight: "600" }}>
                          {item.size}
                        </span>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.6rem" }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "4px" }}>
                            <button 
                              onClick={() => adjustQuantity(item.id, item.size, -1)}
                              style={{ padding: "0.2rem 0.5rem", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ padding: "0 0.5rem", fontSize: "0.85rem", fontWeight: "600" }}>{item.quantity}</span>
                            <button 
                              onClick={() => adjustQuantity(item.id, item.size, 1)}
                              style={{ padding: "0.2rem 0.5rem", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          
                          <div style={{ fontWeight: "700" }}>
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: "2px dashed var(--border-color)", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                  <span>Total Items:</span>
                  <span style={{ fontWeight: "600" }}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontSize: "1.3rem" }}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: "bold", color: "var(--text-secondary)" }}>₹{cartSubtotal}</span>
                </div>

                {!showCheckout ? (
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    Proceed Checkout <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                  </button>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                      <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>Delivery Info</span>
                      <button type="button" onClick={() => setShowCheckout(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.8rem", cursor: "pointer" }}>
                        Cancel
                      </button>
                    </div>
                    
                    <input 
                      type="text" 
                      placeholder="Your Full Name *" 
                      required 
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, name: e.target.value }))}
                      style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border-color)", fontFamily: "var(--font-sans)", fontSize: "0.85rem" }} 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address (Optional)" 
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, email: e.target.value }))}
                      style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border-color)", fontFamily: "var(--font-sans)", fontSize: "0.85rem" }} 
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number *" 
                      required 
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                      style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border-color)", fontFamily: "var(--font-sans)", fontSize: "0.85rem" }} 
                    />
                    <textarea 
                      placeholder="Delivery Address *" 
                      required 
                      rows={2}
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                      style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border-color)", fontFamily: "var(--font-sans)", fontSize: "0.85rem", resize: "none" }} 
                    />
                    
                    <button 
                      type="submit" 
                      className="btn btn-gold"
                      style={{ width: "100%", marginTop: "0.4rem" }}
                    >
                      Place Order (Cash on Delivery)
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(74, 21, 2, 0.4)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          display: "flex",
          justifyContent: "flex-end"
        }} onClick={() => setIsWishlistOpen(false)}>
          <div 
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "100%",
              backgroundColor: "var(--bg-tertiary)",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.3s ease"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.6rem" }}>Your Wishlist</h3>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
                aria-label="Close wishlist drawer"
              >
                <X size={24} />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
                <Heart size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
                <p>Your wishlist is currently empty.</p>
                <button onClick={() => setIsWishlistOpen(false)} className="btn btn-secondary" style={{ marginTop: "1rem", padding: "0.5rem 1.2rem" }}>
                  Explore Chocolates
                </button>
              </div>
            ) : (
              <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {wishlist.map((item) => (
                  <div 
                    key={item.id} 
                    style={{
                      display: "flex", 
                      gap: "1rem", 
                      borderBottom: "1px solid var(--border-color)", 
                      paddingBottom: "1rem",
                      alignItems: "center"
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "10px", border: "2px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }} 
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "1rem", marginBottom: "0.2rem" }}>{item.name}</h4>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {item.category}
                      </span>
                      <div style={{ marginTop: "0.5rem" }}>
                        <button 
                          onClick={() => moveFromWishlistToCart(item)}
                          className="btn btn-gold"
                          style={{ padding: "0.4rem 1rem", fontSize: "0.75rem", borderRadius: "4px" }}
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => toggleWishlist(item)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                      aria-label="Remove wishlist item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Placed Order Success Modal */}
      {placedOrder && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(74, 21, 2, 0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem"
        }}>
          <div 
            className="glassmorphism"
            style={{
              width: "100%",
              maxWidth: "540px",
              padding: "3rem 2rem",
              textAlign: "center",
              position: "relative"
            }}
          >
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(212,175,55,0.15)",
              color: "var(--accent-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem"
            }}>
              <Check size={36} />
            </div>

            <h3 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Order Placed!</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
              Thank you for ordering from <strong>boobakery</strong>! We will prepare your chocolates with love and contact you shortly on your phone number to confirm delivery.
            </p>

            <div style={{
              backgroundColor: "var(--bg-primary)",
              padding: "1.2rem 1.5rem",
              borderRadius: "12px",
              border: "1px dashed var(--accent-rose)",
              marginBottom: "2rem",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Customer</span>
                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{placedOrder.customer.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Items</span>
                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{placedOrder.items.length} product(s)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Total (COD)</span>
                <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "var(--text-secondary)" }}>₹{placedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <a 
                href={INSTAGRAM_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{ 
                  width: "100%",
                  background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                <InstagramIcon size={16} /> Follow us on Instagram
              </a>
              <button 
                onClick={() => setPlacedOrder(null)}
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

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
                alt="BooBakery logo" 
                style={{ 
                  height: "45px", 
                  width: "45px", 
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid pink",
                  backgroundColor: "pink"
                }} 
              />
              <span style={{
                fontFamily: "var(--font-serif)",
                fontWeight: "bold",
                fontSize: "1.6rem",
                color: "var(--bg-primary)",
                letterSpacing: "0.02em"
              }}>
                BooBakery
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", opacity: 0.8, lineHeight: "1.6" }}>
              Creating moments of pure delight with our artisan recipe dark chocolates, fruity infusions, and stuffed nut dates.
            </p>
          </div>

          <div>
            <h4 style={{ color: "var(--bg-primary)", fontSize: "1.1rem", marginBottom: "1.2rem", letterSpacing: "0.05em" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.9rem", opacity: 0.9 }}>
              <li><a href="#menu-section">Shop Chocolates</a></li>
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
