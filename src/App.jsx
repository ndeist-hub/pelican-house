import { useState } from "react";

const REVIEWS = [
  { name: "Sarah M.", date: "August 2024", rating: 5, text: "Absolutely magical stay. Pelican House exceeded every expectation — the space is stunning and the recommendations guide was so helpful!" },
  { name: "James & Fiona", date: "July 2024", rating: 5, text: "We didn't want to leave. The house is perfectly equipped, beautifully styled, and the location is just dreamy. Will be back next year." },
  { name: "Tom R.", date: "June 2024", rating: 4, text: "Wonderful property. Loved the local tips — the sunset walk suggestion was a highlight of our whole trip." },
];

const RECOMMENDATIONS = [
  { category: "Eat & Drink", icon: "🍽️", items: ["The Harbour Kitchen – best seafood in town", "Dune Coffee Roasters – morning must-visit", "Pelican Bay Tapas – great for sunsets", "The Rockpool – fine dining, book ahead"] },
  { category: "Activities", icon: "🌊", items: ["Kayak rental at the marina", "Sunrise yoga on North Beach", "Coastal heritage trail walk", "Glass-bottom boat tours"] },
  { category: "Day Trips", icon: "🗺️", items: ["Lighthouse Point – 20 min drive", "Old Town Market – Saturdays only", "Nature Reserve & bird sanctuary", "Vineyard tours in the valley"] },
  { category: "Local Tips", icon: "💡", items: ["Park on Shore Rd to avoid crowds", "Tides are best 7–9am for swimming", "Grab fresh fish at the pier daily", "Sunsets are best from the dune path"] },
];

const CHECKLIST = [
  { group: "Before You Arrive", items: ["Confirm your arrival time with us", "Check weather forecast for your stay", "Download offline maps for the area", "Arrange travel insurance if needed", "Pack beach towels & sun protection"] },
  { group: "On Arrival Day", items: ["Collect key from lockbox (code in email)", "Check heating/cooling preferences", "Familiarise yourself with fire exits", "Read the house manual on the kitchen counter", "WhatsApp us to let us know you've arrived safely"] },
  { group: "What to Bring", items: ["Beach/swim gear", "Casual & smart-casual clothing", "Good walking shoes", "Reusable bags for the market", "Any prescription medications"] },
];

const NAV_ITEMS = ["Stay", "Book", "Guestbook", "Checklist", "Explore"];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#C9A84C" : "#ddd", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

export default function PelicanHouse() {
  const [activeSection, setActiveSection] = useState("Stay");
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", checkin: "", checkout: "", guests: "2", message: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [guestbookForm, setGuestbookForm] = useState({ name: "", date: "", rating: 5, text: "" });
  const [reviews, setReviews] = useState(REVIEWS);
  const [guestbookSubmitted, setGuestbookSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const handleBooking = () => {
    if (bookingForm.name && bookingForm.email && bookingForm.checkin && bookingForm.checkout) {
      setBookingSubmitted(true);
    }
  };

  const handleGuestbook = () => {
    if (guestbookForm.name && guestbookForm.text) {
      setReviews([{ ...guestbookForm, date: "Just now" }, ...reviews]);
      setGuestbookSubmitted(true);
    }
  };

  const styles = {
    app: { fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF7", minHeight: "100vh", color: "#2C2C2C" },
    hero: {
      padding: "80px 24px 60px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      minHeight: 420,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    heroVideo: {
      position: "absolute", inset: 0, width: "100%", height: "100%",
      objectFit: "cover", objectPosition: "center 40%", zIndex: 0,
    },
    heroOverlay: {
      position: "absolute", inset: 0, zIndex: 1,
      background: "linear-gradient(160deg, rgba(26,58,74,0.60) 0%, rgba(26,58,74,0.40) 100%)",
    },
    heroContent: { position: "relative", zIndex: 2 },
    pelican: { fontSize: 52, marginBottom: 8 },
    heroTitle: { fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#FDFCF5", fontWeight: 400, letterSpacing: "0.05em", margin: "0 0 8px", fontStyle: "italic" },
    heroSub: { color: "#A8D4DC", fontSize: "0.95rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32 },
    heroTagline: { color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7, fontStyle: "italic" },
    heroCTA: {
      display: "inline-block", background: "#C9A84C", color: "#1A3A4A",
      padding: "14px 36px", borderRadius: 2, border: "none", cursor: "pointer",
      fontFamily: "inherit", fontSize: "0.9rem", letterSpacing: "0.15em",
      textTransform: "uppercase", fontWeight: 600,
    },
    nav: { background: "#1A3A4A", display: "flex", justifyContent: "center", gap: 0, position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(201,168,76,0.3)" },
    navItem: (active) => ({
      padding: "16px 24px", color: active ? "#C9A84C" : "rgba(255,255,255,0.6)",
      cursor: "pointer", fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase",
      borderBottom: active ? "2px solid #C9A84C" : "2px solid transparent",
      transition: "all 0.2s", background: "none", border: "none", borderBottom: active ? "2px solid #C9A84C" : "2px solid transparent",
      fontFamily: "inherit",
    }),
    section: { maxWidth: 860, margin: "0 auto", padding: "60px 24px" },
    sectionTitle: { fontSize: "1.8rem", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", marginBottom: 8, letterSpacing: "0.02em" },
    divider: { width: 48, height: 2, background: "#C9A84C", marginBottom: 32, border: "none" },
    card: { background: "#fff", borderRadius: 4, padding: 32, marginBottom: 24, boxShadow: "0 2px 16px rgba(26,58,74,0.07)", border: "1px solid rgba(26,58,74,0.07)" },
    input: { width: "100%", padding: "12px 14px", border: "1px solid #ddd", borderRadius: 3, fontFamily: "inherit", fontSize: "0.95rem", color: "#2C2C2C", background: "#FAFAF7", boxSizing: "border-box", marginBottom: 14, outline: "none" },
    textarea: { width: "100%", padding: "12px 14px", border: "1px solid #ddd", borderRadius: 3, fontFamily: "inherit", fontSize: "0.95rem", color: "#2C2C2C", background: "#FAFAF7", boxSizing: "border-box", marginBottom: 14, resize: "vertical", minHeight: 100, outline: "none" },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 },
    btn: { background: "#1A3A4A", color: "#fff", padding: "13px 32px", border: "none", borderRadius: 3, cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase" },
    btnGold: { background: "#C9A84C", color: "#1A3A4A", padding: "13px 32px", border: "none", borderRadius: 3, cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 },
    label: { display: "block", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: 5 },
    successBox: { background: "#EDF7F0", border: "1px solid #A8D4B8", borderRadius: 4, padding: 24, textAlign: "center", color: "#1A5C30" },
    reviewCard: { borderLeft: "3px solid #C9A84C", paddingLeft: 20, marginBottom: 28 },
    reviewName: { fontWeight: 600, color: "#1A3A4A", fontSize: "0.95rem" },
    reviewDate: { color: "#aaa", fontSize: "0.8rem", marginBottom: 6 },
    reviewText: { color: "#555", lineHeight: 1.7, fontStyle: "italic" },
    checkGroup: { marginBottom: 28 },
    checkGroupTitle: { fontSize: "1rem", fontWeight: 600, color: "#1A3A4A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 },
    checkItem: (checked) => ({ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #F0EEE8", cursor: "pointer", opacity: checked ? 0.5 : 1, transition: "opacity 0.2s" }),
    checkbox: (checked) => ({ width: 20, height: 20, borderRadius: 2, border: checked ? "none" : "2px solid #C9A84C", background: checked ? "#C9A84C" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }),
    recCard: { background: "#fff", borderRadius: 4, padding: 24, border: "1px solid rgba(26,58,74,0.08)", boxShadow: "0 2px 12px rgba(26,58,74,0.05)" },
    recCat: { fontSize: "1rem", fontWeight: 600, color: "#1A3A4A", marginBottom: 12 },
    recItem: { padding: "7px 0", borderBottom: "1px solid #F5F3EE", color: "#555", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 },
    features: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginTop: 32 },
    featureItem: { textAlign: "center", padding: "24px 16px", background: "#fff", borderRadius: 4, border: "1px solid rgba(26,58,74,0.08)" },
    featureIcon: { fontSize: 28, marginBottom: 8 },
    featureLabel: { fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666" },
  };

  return (
    <div style={styles.app}>
      {/* Hero */}
      <div style={styles.hero}>
        <img
          style={styles.heroVideo}
          src="/hero.png"
          alt="Pelican House landscape"
        />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.pelican}>🦤</div>
          <h1 style={styles.heroTitle}>Pelican House</h1>
          <p style={styles.heroSub}>San Sebastian, Mozambique</p>
          <p style={styles.heroTagline}>"A place where mornings feel slow, evenings feel golden, and every stay becomes a memory."</p>
          <button style={styles.heroCTA} onClick={() => setActiveSection("Book")}>Check Availability</button>
        </div>
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        {NAV_ITEMS.map(item => (
          <button key={item} style={styles.navItem(activeSection === item)} onClick={() => setActiveSection(item)}>{item}</button>
        ))}
      </nav>

      {/* STAY */}
      {activeSection === "Stay" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Welcome to Pelican House</h2>
          <hr style={styles.divider} />
          <div style={styles.card}>
            <p style={{ lineHeight: 1.9, color: "#555", fontSize: "1.05rem", fontStyle: "italic", marginBottom: 20 }}>
              Pelican House is a thoughtfully curated retreat designed for those who travel slowly and live fully. Whether you're here for a long weekend or a lazy week, you'll find everything you need — and nothing you don't.
            </p>
            <p style={{ lineHeight: 1.9, color: "#666", fontSize: "0.95rem" }}>
              The house sleeps up to 6 guests and is fully equipped with a modern kitchen, outdoor dining area, high-speed Wi-Fi, and a curated library of local guides. Our goal is simple: for you to arrive as guests and leave as friends of this special place.
            </p>
          </div>
          <div style={styles.features}>
            {[["🛏️","Sleeps 6"],["🍳","Full Kitchen"],["📶","Fast Wi-Fi"],["🌿","Garden"],["🚗","Free Parking"],["🐾","Pet Friendly"]].map(([icon, label]) => (
              <div key={label} style={styles.featureItem}>
                <div style={styles.featureIcon}>{icon}</div>
                <div style={styles.featureLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOK */}
      {activeSection === "Book" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Book Your Stay</h2>
          <hr style={styles.divider} />
          {bookingSubmitted ? (
            <div style={styles.successBox}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✉️</div>
              <h3 style={{ margin: "0 0 8px", color: "#1A5C30" }}>Request Received!</h3>
              <p style={{ margin: 0, color: "#2E7D52" }}>Thank you, <strong>{bookingForm.name}</strong>. We'll confirm your dates and get back to you at <strong>{bookingForm.email}</strong> within 24 hours.</p>
            </div>
          ) : (
            <div style={styles.card}>
              <p style={{ color: "#888", marginBottom: 24, fontSize: "0.9rem" }}>Fill in the form below and we'll confirm availability and pricing within 24 hours.</p>
              <label style={styles.label}>Your Name</label>
              <input style={styles.input} placeholder="Full name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} placeholder="you@example.com" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} />
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>Check-in Date</label>
                  <input type="date" style={styles.input} value={bookingForm.checkin} onChange={e => setBookingForm({...bookingForm, checkin: e.target.value})} />
                </div>
                <div>
                  <label style={styles.label}>Check-out Date</label>
                  <input type="date" style={styles.input} value={bookingForm.checkout} onChange={e => setBookingForm({...bookingForm, checkout: e.target.value})} />
                </div>
              </div>
              <label style={styles.label}>Number of Guests</label>
              <select style={styles.input} value={bookingForm.guests} onChange={e => setBookingForm({...bookingForm, guests: e.target.value})}>
                {["1","2","3","4","5","6"].map(n => <option key={n}>{n}</option>)}
              </select>
              <label style={styles.label}>Message (optional)</label>
              <textarea style={styles.textarea} placeholder="Tell us a little about your trip, any special requirements..." value={bookingForm.message} onChange={e => setBookingForm({...bookingForm, message: e.target.value})} />
              <button style={styles.btnGold} onClick={handleBooking}>Request Booking →</button>
            </div>
          )}
        </div>
      )}

      {/* GUESTBOOK */}
      {activeSection === "Guestbook" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Guestbook</h2>
          <hr style={styles.divider} />
          <p style={{ color: "#888", marginBottom: 32, fontStyle: "italic" }}>Kind words from guests who've called Pelican House home.</p>
          {!guestbookSubmitted ? (
            <div style={{ ...styles.card, borderTop: "3px solid #C9A84C" }}>
              <h3 style={{ margin: "0 0 20px", color: "#1A3A4A", fontWeight: 400, fontStyle: "italic" }}>Leave your mark ✍️</h3>
              <label style={styles.label}>Your Name</label>
              <input style={styles.input} placeholder="Name" value={guestbookForm.name} onChange={e => setGuestbookForm({...guestbookForm, name: e.target.value})} />
              <label style={styles.label}>Rating</label>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {[1,2,3,4,5].map(n => (
                  <span key={n} onClick={() => setGuestbookForm({...guestbookForm, rating: n})}
                    style={{ fontSize: 24, cursor: "pointer", color: n <= guestbookForm.rating ? "#C9A84C" : "#ddd" }}>★</span>
                ))}
              </div>
              <label style={styles.label}>Your Message</label>
              <textarea style={styles.textarea} placeholder="Share your experience at Pelican House..." value={guestbookForm.text} onChange={e => setGuestbookForm({...guestbookForm, text: e.target.value})} />
              <button style={styles.btn} onClick={handleGuestbook}>Add to Guestbook →</button>
            </div>
          ) : (
            <div style={{ ...styles.successBox, marginBottom: 32 }}>
              <p style={{ margin: 0 }}>Thank you, <strong>{guestbookForm.name}</strong>! Your review has been added 🌟</p>
            </div>
          )}
          <div style={{ marginTop: 40 }}>
            {reviews.map((r, i) => (
              <div key={i} style={styles.reviewCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <span style={styles.reviewName}>{r.name}</span>
                  <span style={styles.reviewDate}>{r.date}</span>
                </div>
                <StarRating rating={r.rating} />
                <p style={{ ...styles.reviewText, marginTop: 8 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHECKLIST */}
      {activeSection === "Checklist" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Before You Arrive</h2>
          <hr style={styles.divider} />
          <p style={{ color: "#888", marginBottom: 32, fontStyle: "italic" }}>Tick off everything below to make sure your stay goes smoothly from the start.</p>
          {CHECKLIST.map(group => (
            <div key={group.group} style={styles.checkGroup}>
              <div style={styles.checkGroupTitle}>{group.group}</div>
              {group.items.map(item => {
                const key = group.group + item;
                const checked = !!checkedItems[key];
                return (
                  <div key={item} style={styles.checkItem(checked)} onClick={() => toggleCheck(key)}>
                    <div style={styles.checkbox(checked)}>
                      {checked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                    </div>
                    <span style={{ color: "#555", fontSize: "0.95rem", textDecoration: checked ? "line-through" : "none" }}>{item}</span>
                  </div>
                );
              })}
            </div>
          ))}
          <p style={{ color: "#aaa", fontSize: "0.8rem", fontStyle: "italic", marginTop: 16 }}>Tap any item to tick it off.</p>
        </div>
      )}

      {/* EXPLORE */}
      {activeSection === "Explore" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Explore the Area</h2>
          <hr style={styles.divider} />
          <p style={{ color: "#888", marginBottom: 32, fontStyle: "italic" }}>Our personal recommendations to make the most of your time here.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {RECOMMENDATIONS.map(rec => (
              <div key={rec.category} style={styles.recCard}>
                <div style={styles.recCat}>{rec.icon} {rec.category}</div>
                {rec.items.map(item => (
                  <div key={item} style={styles.recItem}>
                    <span style={{ color: "#C9A84C", fontSize: 10 }}>◆</span> {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#1A3A4A", color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "32px 24px", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
        <div style={{ color: "#C9A84C", marginBottom: 8, fontSize: "1.1rem", fontStyle: "italic" }}>🦤 Pelican House</div>
        <div>Questions? Contact us at <span style={{ color: "rgba(255,255,255,0.8)" }}>hello@pelicanhouse.com</span></div>
        <div style={{ marginTop: 8 }}>© 2025 Pelican House · All Rights Reserved</div>
      </footer>
    </div>
  );
}
