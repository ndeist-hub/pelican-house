import { useState, useEffect } from "react";

const CHECKLIST = [
  { group: "Before You Arrive", items: ["Confirm your arrival time with us", "Check weather forecast for your stay", "Download offline maps for the area", "Arrange travel insurance if needed", "Pack beach towels & sun protection"] },
  { group: "On Arrival Day", items: ["Collect key from lockbox (code in email)", "Check heating/cooling preferences", "Familiarise yourself with fire exits", "Read the house manual on the kitchen counter", "WhatsApp us to let us know you've arrived safely"] },
  { group: "What to Bring", items: ["Beach/swim gear", "Casual & smart-casual clothing", "Good walking shoes", "Reusable bags for the market", "Any prescription medications"] },
];

const RECOMMENDATIONS = [
  { category: "Eat & Drink", icon: "🍽️", items: ["The Harbour Kitchen – best seafood in town", "Dune Coffee Roasters – morning must-visit", "Pelican Bay Tapas – great for sunsets", "The Rockpool – fine dining, book ahead"] },
  { category: "Activities", icon: "🌊", items: ["Kayak rental at the marina", "Sunrise yoga on North Beach", "Coastal heritage trail walk", "Glass-bottom boat tours"] },
  { category: "Day Trips", icon: "🗺️", items: ["Lighthouse Point – 20 min drive", "Old Town Market – Saturdays only", "Nature Reserve & bird sanctuary", "Vineyard tours in the valley"] },
  { category: "Local Tips", icon: "💡", items: ["Park on Shore Rd to avoid crowds", "Tides are best 7–9am for swimming", "Grab fresh fish at the pier daily", "Sunsets are best from the dune path"] },
];

const NAV_ITEMS = [
  { id: "story",           label: "The Pelican Point Story" },
  { id: "stay",            label: "Stay at Pelican Point" },
  { id: "guestbook",       label: "Guestbook" },
  { id: "checklist",       label: "Guest Checklist" },
  { id: "recommendations", label: "Recommendations for Your Stay" },
  { id: "gallery",         label: "Gallery" },
];

const GALLERY_PLACEHOLDERS = [
  { label: "Bedroom 1", color: "#2E6B7A" },
  { label: "Bedroom 2", color: "#1A3A4A" },
  { label: "Bedroom 3", color: "#2A4A5A" },
  { label: "Bedroom 4", color: "#3A5A6A" },
  { label: "Bedroom 5", color: "#1E4A5A" },
  { label: "Bedroom 6", color: "#254A58" },
  { label: "Entertainment Area", color: "#3D6B4A" },
  { label: "Kitchen", color: "#4A3D2E" },
  { label: "Beach", color: "#C9A84C" },
  { label: "Wildlife", color: "#4A6B3D" },
  { label: "Boat", color: "#2E4A6B" },
  { label: "Game Vehicle", color: "#4A5A3A" },
];

const STAFF = [
  {
    name: "Juvencio",
    role: "House Manager",
    photo: null,
    bio: "Juvencio is the heart of Pelican Point. As house manager, he oversees every detail of your stay — from your arrival to your departure — ensuring everything runs seamlessly and that every guest feels genuinely at home.",
  },
  {
    name: "Raymondo",
    role: "Chef",
    photo: null,
    bio: "Raymondo brings the flavours of Mozambique to life in every meal. Drawing on fresh local ingredients — fish from the bay, vegetables from the market — he creates dishes that are both deeply rooted in the region and endlessly memorable.",
  },
  {
    name: "Ramiro",
    role: "Room Upkeep, Household Maintenance & Laundry",
    photo: null,
    bio: "Ramiro keeps Pelican Point in impeccable order. Quietly attentive and endlessly capable, he ensures every room is pristine, every repair handled swiftly, and every guest's comfort maintained throughout their stay.",
  },
  {
    name: "Our Skipper",
    role: "Skipper",
    photo: null,
    bio: "Our skipper knows these waters like few others — the tides, the fishing grounds, the hidden coves. Whether you're heading out for deep-sea fishing, a sunrise cruise, or an afternoon on the water, you're in expert hands.",
    tbd: true,
  },
];

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";

const GoldLine = () => <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />;

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", marginBottom: 12, letterSpacing: "0.02em" }}>{children}</h2>
);

const Label = ({ children }) => (
  <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>{children}</label>
);

const inputStyle = {
  width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: 3,
  fontFamily: font, fontSize: "0.95rem", color: "#2C2C2C", background: "#FAFAF7",
  boxSizing: "border-box", marginBottom: 16, outline: "none",
};

function Footer({ navigate }) {
  return (
    <footer style={{ background: "#1A3A4A", color: "rgba(255,255,255,0.45)", textAlign: "center", padding: "32px 24px", fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: font, marginTop: 60 }}>
      <button onClick={() => navigate("home")} style={{ background: "none", border: "none", color: "#C9A84C", fontFamily: font, fontStyle: "italic", fontSize: "1rem", cursor: "pointer", marginBottom: 8, display: "block", margin: "0 auto 8px" }}>🦤 Pelican Point</button>
      <div>San Sebastian · Mozambique · <a href="mailto:hello@pelicanhousemoz.com" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>hello@pelicanhousemoz.com</a></div>
      <div style={{ marginTop: 8 }}>© 2025 Pelican Point · <a href="https://mozsanctuary.com" target="_blank" rel="noreferrer" style={{ color: "#C9A84C", textDecoration: "none" }}>The Sanctuary</a></div>
    </footer>
  );
}

function Hamburger({ open, setOpen, lightBg }) {
  return (
    <button onClick={() => setOpen(!open)} style={{ position: "fixed", top: 24, left: 24, zIndex: 1000, cursor: "pointer", background: "none", border: "none", padding: 8, display: "flex", flexDirection: "column", gap: 5 }} aria-label="Menu">
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 26, height: 1.5,
          background: open ? "#fff" : (lightBg ? "#1A3A4A" : "#fff"),
          transition: "all 0.3s",
          transform: open ? (i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)" : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)" : "scaleX(0)") : "none",
          opacity: open && i === 1 ? 0 : 1,
        }} />
      ))}
    </button>
  );
}

function MenuOverlay({ open, navigate }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,31,26,0.97)", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none", transition: "opacity 0.35s ease", fontFamily: font, padding: "0 24px" }}>
      <button onClick={() => navigate("home")} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.35)", fontFamily: font, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", padding: "6px 0", marginBottom: 10 }}>← Home</button>
      <div style={{ width: 1, height: 14, background: "rgba(201,168,76,0.25)", margin: "0 auto 4px" }} />
      {NAV_ITEMS.map((item, i) => (
        <div key={item.id} style={{ textAlign: "center" }}>
          <button onClick={() => navigate(item.id)} style={{ background: "none", border: "none", color: "#F5F0E8", fontFamily: font, fontSize: "clamp(1.1rem, 3vw, 1.9rem)", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", padding: "9px 0", display: "block", transition: "color 0.2s" }}>{item.label}</button>
          {i < NAV_ITEMS.length - 1 && <div style={{ width: 1, height: 14, background: "rgba(201,168,76,0.3)", margin: "0 auto" }} />}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Stay/Book state
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", checkin: "", checkout: "", guests: "2", message: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Guestbook state
  const [guestbookForm, setGuestbookForm] = useState({ name: "", date: "", rating: 5, text: "" });
  const [reviews, setReviews] = useState([]);
  const [guestbookSubmitted, setGuestbookSubmitted] = useState(false);

  // Checklist state
  const [checked, setChecked] = useState({});

  // Gallery lightbox state
  const [lightbox, setLightbox] = useState(null);

  const navigate = (id) => { setPage(id); setMenuOpen(false); window.scrollTo(0, 0); };
  const toggleCheck = (k) => setChecked(p => ({ ...p, [k]: !p[k] }));
  const handleBooking = () => { if (bookingForm.name && bookingForm.email && bookingForm.checkin && bookingForm.checkout) setBookingSubmitted(true); };
  const handleGuestbook = () => {
    if (guestbookForm.name && guestbookForm.text) {
      setReviews(prev => [{ ...guestbookForm, date: guestbookForm.date || new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }) }, ...prev]);
      setGuestbookSubmitted(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = (menuOpen || lightbox !== null) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, lightbox]);

  const isLightBg = page !== "home";

  // ── HOME ─────────────────────────────────────────────────────
  if (page === "home") return (
    <div style={{ fontFamily: font }}>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} lightBg={false} />
      <MenuOverlay open={menuOpen} navigate={navigate} />
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <img src="/hero.png" alt="Pelican Point" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 24px 10vh", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)", color: "#fff", fontWeight: 400, letterSpacing: "0.1em", margin: "0 0 10px", textTransform: "uppercase", lineHeight: 1 }}>Pelican Point</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 44 }}>San Sebastian · Mozambique</p>
          <button onClick={() => navigate("story")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.55)", padding: "13px 44px", cursor: "pointer", fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>Welcome</button>
        </div>
      </div>
    </div>
  );

  // ── STORY ─────────────────────────────────────────────────────
  if (page === "story") return (
    <div style={{ fontFamily: font, background: "#FAFAF7", minHeight: "100vh" }}>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} lightBg={isLightBg} />
      <MenuOverlay open={menuOpen} navigate={navigate} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 32px 60px" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 18 }}>The Pelican Point Story</p>
        <SectionTitle>A Family, a Wilderness,<br />and a Place Called Home</SectionTitle>
        <GoldLine />
        <div style={{ width: "100%", aspectRatio: "16/9", background: "#1A3A4A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 52, borderRadius: 2 }}>
          <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>▶</div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Our Story — Video Coming Soon</p>
        </div>
        <p style={{ lineHeight: 1.95, color: "#555", fontSize: "1.02rem", marginBottom: 22 }}>There are places you visit, and places that stay with you long after you've left. The San Sebastian peninsula is the latter — stretching into the Indian Ocean along Mozambique's southern coast, one of the last truly wild coastlines in Africa. It is here, within a 30,000 hectare conservation sanctuary, that our family found its place in the world.</p>
        <blockquote style={{ borderLeft: "2px solid #C9A84C", paddingLeft: 24, margin: "40px 0", fontStyle: "italic", fontSize: "1.1rem", color: "#333", lineHeight: 1.85 }}>
          "We didn't find this land. It found us. And once it did, we knew we had to protect it — and share it."
        </blockquote>
        <p style={{ lineHeight: 1.95, color: "#555", fontSize: "1.02rem", marginBottom: 22 }}>The house takes its name from the pelicans that glide low over the lagoon at dusk — unhurried, ancient, perfectly at home. Building here meant listening to the land: where the breezes run, how the light falls, which trees offer shade in the afternoon heat. The result is a home that feels less built than grown.</p>
        <p style={{ lineHeight: 1.95, color: "#555", fontSize: "1.02rem", marginBottom: 40 }}>Pelican Point sits within The Sanctuary — a protected reserve that is home to 298 bird species, five species of nesting marine turtles, the critically endangered Dugong, and growing populations of eland, zebra, giraffe and sable. To stay here is to be a guest not just of our family, but of this extraordinary wild place.</p>
        <div style={{ background: "#fff", border: "1px solid rgba(26,58,74,0.1)", padding: "24px 28px", marginBottom: 48, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderRadius: 2 }}>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 5px" }}>Part of</p>
            <p style={{ fontSize: "1.05rem", color: "#1A3A4A", fontWeight: 400, margin: 0 }}>The Sanctuary, Mozambique</p>
            <p style={{ fontSize: "0.82rem", color: "#888", margin: "3px 0 0" }}>30,000 hectares · San Sebastian Peninsula</p>
          </div>
          <a href="https://mozsanctuary.com" target="_blank" rel="noreferrer" style={{ background: "#1A3A4A", color: "#fff", padding: "11px 24px", textDecoration: "none", fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap", borderRadius: 2 }}>Visit The Sanctuary →</a>
        </div>
        <button onClick={() => navigate("stay")} style={{ background: "#C9A84C", color: "#1A3A4A", padding: "13px 36px", border: "none", cursor: "pointer", fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, borderRadius: 2 }}>Stay at Pelican Point →</button>
      </div>
      <Footer navigate={navigate} />
    </div>
  );

  // ── STAY & BOOK ───────────────────────────────────────────────
  if (page === "stay") return (
    <div style={{ fontFamily: font, background: "#FAFAF7", minHeight: "100vh" }}>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} lightBg={isLightBg} />
      <MenuOverlay open={menuOpen} navigate={navigate} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "100px 32px 60px" }}>
        <SectionTitle>Stay at Pelican Point</SectionTitle>
        <GoldLine />
        <div style={{ background: "#fff", borderRadius: 4, padding: 32, marginBottom: 24, boxShadow: "0 2px 16px rgba(26,58,74,0.06)", border: "1px solid rgba(26,58,74,0.07)" }}>
          <p style={{ lineHeight: 1.95, color: "#555", fontSize: "1.02rem", fontStyle: "italic", marginBottom: 18 }}>Pelican Point is a thoughtfully curated retreat within The Sanctuary — a 30,000 hectare conservation reserve on Mozambique's wild San Sebastian peninsula.</p>
          <p style={{ lineHeight: 1.9, color: "#666", fontSize: "0.95rem", marginBottom: 0 }}>The house sleeps up to 6 guests and is fully equipped with a modern kitchen, outdoor dining terrace, high-speed Wi-Fi, and a curated library of local field guides. Whether you're here for a long weekend or a lazy week, our goal is simple: for you to arrive as guests and leave as friends of this special place.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 52 }}>
          {[["🛏️","6 En Suite Bedrooms"],["👨‍🍳","4 Full-Time Staff incl. Chef & Skipper"],["⛵","Boat"],["🏊","Swimming Pool"],["🚙","Game Vehicle"],["🌊","Hobie Cat · SUP Boards · Canoes"],["🤿","Snorkelling Gear"],["🦟","Mosquito Nets in All Rooms"],["📶","Fast Wi-Fi"],["🚭","No Smoking"]].map(([icon, label]) => (
            <div key={label} style={{ textAlign: "center", padding: "22px 12px", background: "#fff", borderRadius: 4, border: "1px solid rgba(26,58,74,0.08)" }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#777" }}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 }}>Meet Your Team</p>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", marginBottom: 28 }}>Four dedicated staff to make your stay exceptional.</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 60 }}>
          {STAFF.map(member => (
            <div key={member.name} style={{ background: "#fff", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(26,58,74,0.08)", boxShadow: "0 2px 12px rgba(26,58,74,0.05)" }}>
              {/* Photo */}
              <div style={{ width: "100%", aspectRatio: "1/1", background: member.tbd ? "#2E4A5A" : "#1A3A4A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {member.photo
                  ? <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <>
                      <div style={{ fontSize: 36, opacity: 0.2, marginBottom: 6 }}>👤</div>
                      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{member.tbd ? "Photo coming soon" : "Photo coming soon"}</p>
                    </>
                }
              </div>
              {/* Info */}
              <div style={{ padding: "20px 20px 24px" }}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 4px" }}>{member.role}</p>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", margin: "0 0 12px" }}>{member.name}</h4>
                <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.75, margin: 0 }}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 }}>Request a Booking</p>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", marginBottom: 28 }}>We'll confirm availability and pricing within 24 hours.</h3>
        {bookingSubmitted ? (
          <div style={{ background: "#EDF7F0", border: "1px solid #A8D4B8", borderRadius: 4, padding: 36, textAlign: "center", color: "#1A5C30" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✉️</div>
            <h3 style={{ margin: "0 0 8px" }}>Request Received!</h3>
            <p style={{ margin: 0 }}>Thank you, <strong>{bookingForm.name}</strong>. We'll be in touch at <strong>{bookingForm.email}</strong> within 24 hours.</p>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 4, padding: 32, boxShadow: "0 2px 16px rgba(26,58,74,0.06)", border: "1px solid rgba(26,58,74,0.07)" }}>
            <Label>Full Name</Label>
            <input style={inputStyle} placeholder="Your name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
            <Label>Email Address</Label>
            <input type="email" style={inputStyle} placeholder="you@example.com" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><Label>Check-in</Label><input type="date" style={inputStyle} value={bookingForm.checkin} onChange={e => setBookingForm({...bookingForm, checkin: e.target.value})} /></div>
              <div><Label>Check-out</Label><input type="date" style={inputStyle} value={bookingForm.checkout} onChange={e => setBookingForm({...bookingForm, checkout: e.target.value})} /></div>
            </div>
            <Label>Number of Guests</Label>
            <select style={inputStyle} value={bookingForm.guests} onChange={e => setBookingForm({...bookingForm, guests: e.target.value})}>
              {["1","2","3","4","5","6"].map(n => <option key={n}>{n}</option>)}
            </select>
            <Label>Message (optional)</Label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 90 }} placeholder="Any special requirements or questions..." value={bookingForm.message} onChange={e => setBookingForm({...bookingForm, message: e.target.value})} />
            <button onClick={handleBooking} style={{ background: "#C9A84C", color: "#1A3A4A", padding: "13px 36px", border: "none", borderRadius: 3, cursor: "pointer", fontFamily: font, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>Send Booking Request →</button>
          </div>
        )}
      </div>
      <Footer navigate={navigate} />
    </div>
  );

  // ── GUESTBOOK ─────────────────────────────────────────────────
  if (page === "guestbook") return (
    <div style={{ fontFamily: font, background: "#FAFAF7", minHeight: "100vh" }}>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} lightBg={isLightBg} />
      <MenuOverlay open={menuOpen} navigate={navigate} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 32px 60px" }}>
        <SectionTitle>Guestbook</SectionTitle>
        <GoldLine />
        <p style={{ color: "#888", marginBottom: 44, fontStyle: "italic", lineHeight: 1.7 }}>Pelican Point is built on stories — the ones the land holds, and the ones our guests bring. We'd love to hear yours.</p>
        {!guestbookSubmitted ? (
          <div style={{ background: "#fff", borderRadius: 4, padding: 32, marginBottom: 48, boxShadow: "0 2px 16px rgba(26,58,74,0.06)", border: "1px solid rgba(26,58,74,0.07)", borderTop: "3px solid #C9A84C" }}>
            <Label>Your Name</Label>
            <input style={inputStyle} placeholder="Name" value={guestbookForm.name} onChange={e => setGuestbookForm({...guestbookForm, name: e.target.value})} />
            <Label>When did you stay?</Label>
            <input style={inputStyle} placeholder="e.g. July 2025" value={guestbookForm.date} onChange={e => setGuestbookForm({...guestbookForm, date: e.target.value})} />
            <Label>Rating</Label>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[1,2,3,4,5].map(n => <span key={n} onClick={() => setGuestbookForm({...guestbookForm, rating: n})} style={{ fontSize: 26, cursor: "pointer", color: n <= guestbookForm.rating ? "#C9A84C" : "#ddd", transition: "color 0.2s" }}>★</span>)}
            </div>
            <Label>Your Message</Label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} placeholder="Share your experience at Pelican Point..." value={guestbookForm.text} onChange={e => setGuestbookForm({...guestbookForm, text: e.target.value})} />
            <button onClick={handleGuestbook} style={{ background: "#1A3A4A", color: "#fff", padding: "13px 32px", border: "none", borderRadius: 3, cursor: "pointer", fontFamily: font, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Add to Guestbook →</button>
          </div>
        ) : (
          <div style={{ background: "#EDF7F0", border: "1px solid #A8D4B8", borderRadius: 4, padding: 28, textAlign: "center", color: "#1A5C30", marginBottom: 48 }}>
            <p style={{ margin: 0, fontSize: "1rem" }}>Thank you, <strong>{guestbookForm.name}</strong>. Your words are now part of Pelican Point's story. 🌟</p>
          </div>
        )}
        {reviews.length > 0 ? reviews.map((r, i) => (
          <div key={i} style={{ borderLeft: "3px solid #C9A84C", paddingLeft: 20, marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontWeight: 600, color: "#1A3A4A" }}>{r.name}</span>
              <span style={{ color: "#aaa", fontSize: "0.78rem" }}>{r.date}</span>
            </div>
            <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= r.rating ? "#C9A84C" : "#ddd", fontSize: 13 }}>★</span>)}</div>
            <p style={{ color: "#555", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>{r.text}</p>
          </div>
        )) : !guestbookSubmitted && (
          <p style={{ color: "#ccc", fontStyle: "italic", textAlign: "center", marginTop: 8 }}>Be the first to leave a message in the guestbook.</p>
        )}
      </div>
      <Footer navigate={navigate} />
    </div>
  );

  // ── CHECKLIST ─────────────────────────────────────────────────
  if (page === "checklist") return (
    <div style={{ fontFamily: font, background: "#FAFAF7", minHeight: "100vh" }}>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} lightBg={isLightBg} />
      <MenuOverlay open={menuOpen} navigate={navigate} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 32px 60px" }}>
        <SectionTitle>Guest Checklist</SectionTitle>
        <GoldLine />
        <p style={{ color: "#888", marginBottom: 44, fontStyle: "italic" }}>Everything you need to prepare for a seamless stay at Pelican Point.</p>
        {CHECKLIST.map(group => (
          <div key={group.group} style={{ marginBottom: 36 }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#1A3A4A", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #eee" }}>{group.group}</div>
            {group.items.map(item => {
              const k = group.group + item;
              const isChecked = !!checked[k];
              return (
                <div key={item} onClick={() => toggleCheck(k)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #F5F3EE", cursor: "pointer", opacity: isChecked ? 0.45 : 1, transition: "opacity 0.2s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 2, border: isChecked ? "none" : "2px solid #C9A84C", background: isChecked ? "#C9A84C" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {isChecked && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ color: "#555", fontSize: "0.95rem", textDecoration: isChecked ? "line-through" : "none" }}>{item}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <Footer navigate={navigate} />
    </div>
  );

  // ── RECOMMENDATIONS ───────────────────────────────────────────
  if (page === "recommendations") return (
    <div style={{ fontFamily: font, background: "#FAFAF7", minHeight: "100vh" }}>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} lightBg={isLightBg} />
      <MenuOverlay open={menuOpen} navigate={navigate} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "100px 32px 60px" }}>
        <SectionTitle>Recommendations for Your Stay</SectionTitle>
        <GoldLine />
        <p style={{ color: "#888", marginBottom: 44, fontStyle: "italic" }}>Our personal picks to help you make the most of San Sebastian and the surrounding area.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {RECOMMENDATIONS.map(rec => (
            <div key={rec.category} style={{ background: "#fff", borderRadius: 4, padding: 28, border: "1px solid rgba(26,58,74,0.08)", boxShadow: "0 2px 12px rgba(26,58,74,0.05)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1A3A4A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{rec.icon} {rec.category}</div>
              {rec.items.map(item => (
                <div key={item} style={{ padding: "9px 0", borderBottom: "1px solid #F5F3EE", color: "#555", fontSize: "0.88rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#C9A84C", fontSize: 9, marginTop: 4, flexShrink: 0 }}>◆</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );

  // ── GALLERY ───────────────────────────────────────────────────
  if (page === "gallery") return (
    <div style={{ fontFamily: font, background: "#FAFAF7", minHeight: "100vh" }}>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} lightBg={isLightBg} />
      <MenuOverlay open={menuOpen} navigate={navigate} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 32px 60px" }}>
        <SectionTitle>Gallery</SectionTitle>
        <GoldLine />
        <p style={{ color: "#888", marginBottom: 44, fontStyle: "italic" }}>Photos of Pelican Point, the lagoon, and the wild beauty of The Sanctuary. More images coming soon.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {GALLERY_PLACEHOLDERS.map((item, i) => (
            <div key={i} onClick={() => setLightbox(i)} style={{ aspectRatio: "4/3", background: item.color, borderRadius: 3, cursor: "pointer", display: "flex", alignItems: "flex-end", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              <span style={{ position: "relative", padding: "14px 16px", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.label}</span>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo coming soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <div style={{ width: "80vw", maxWidth: 800, aspectRatio: "4/3", background: GALLERY_PLACEHOLDERS[lightbox].color, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{GALLERY_PLACEHOLDERS[lightbox].label}</span>
          </div>
          <button onClick={() => setLightbox(null)} style={{ position: "fixed", top: 24, right: 24, background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", opacity: 0.7 }}>✕</button>
          {lightbox > 0 && <button onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1); }} style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", opacity: 0.7 }}>‹</button>}
          {lightbox < GALLERY_PLACEHOLDERS.length - 1 && <button onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1); }} style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", opacity: 0.7 }}>›</button>}
        </div>
      )}
      <Footer navigate={navigate} />
    </div>
  );

  return null;
}
