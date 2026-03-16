import { useState, useEffect, useRef } from "react";

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
  { name: "Juvencio", role: "House Manager", photo: null, bio: "Juvencio is the heart of Pelican Point. As house manager, he oversees every detail of your stay — from your arrival to your departure — ensuring everything runs seamlessly and that every guest feels genuinely at home." },
  { name: "Raymondo", role: "Chef", photo: null, bio: "Raymondo brings the flavours of Mozambique to life in every meal. Drawing on fresh local ingredients — fish from the bay, vegetables from the market — he creates dishes that are both deeply rooted in the region and endlessly memorable." },
  { name: "Ramiro", role: "Room Upkeep, Household Maintenance & Laundry", photo: null, bio: "Ramiro keeps Pelican Point in impeccable order. Quietly attentive and endlessly capable, he ensures every room is pristine, every repair handled swiftly, and every guest's comfort maintained throughout their stay." },
  { name: "Our Skipper", role: "Skipper", photo: null, bio: "Our skipper knows these waters like few others — the tides, the fishing grounds, the hidden coves. Whether you're heading out for deep-sea fishing, a sunrise cruise, or an afternoon on the water, you're in expert hands.", tbd: true },
];

const BOOKED_DATES = [
  // { start: "2025-07-01", end: "2025-07-14" },
];

const NAV_SECTIONS = [
  { id: "hero",            label: "Home" },
  { id: "story",           label: "The Pelican Point Story" },
  { id: "stay",            label: "Stay at Pelican Point" },
  { id: "guestbook",       label: "Guestbook" },
  { id: "checklist",       label: "Guest Checklist" },
  { id: "recommendations", label: "Recommendations for Your Stay" },
  { id: "gallery",         label: "Gallery" },
];

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";

// Alternating section backgrounds
const sectionBg = (i) => i % 2 === 0 ? "#FAFAF7" : "#1A3A4A";
const sectionColor = (i) => i % 2 === 0 ? "#2C2C2C" : "#F5F0E8";
const sectionMuted = (i) => i % 2 === 0 ? "#666" : "rgba(245,240,232,0.65)";
const goldLine = <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />;

function AvailabilityCalendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const isBooked = (date) => { const d = date.getTime(); return BOOKED_DATES.some(({ start, end }) => { const s = new Date(start).getTime(); const e = new Date(end).getTime(); return d >= s && d <= e; }); };
  const isPast = (date) => date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const year = viewDate.getFullYear(), month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = viewDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
  const cellStyle = (date) => { if (!date) return { background: "transparent" }; if (isPast(date)) return { background: "rgba(255,255,255,0.1)", color: "rgba(245,240,232,0.2)" }; if (isBooked(date)) return { background: "#C9A84C", color: "#1A3A4A", fontWeight: 600 }; return { background: "rgba(255,255,255,0.12)", color: "#F5F0E8" }; };
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: 24, border: "1px solid rgba(255,255,255,0.1)", marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#F5F0E8", padding: "4px 10px" }}>‹</button>
        <span style={{ fontFamily: font, fontStyle: "italic", color: "#F5F0E8", fontSize: "0.95rem" }}>{monthName}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#F5F0E8", padding: "4px 10px" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 6 }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d} style={{ textAlign: "center", fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(245,240,232,0.4)", textTransform: "uppercase" }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {days.map((date, i) => <div key={i} style={{ textAlign: "center", padding: "7px 2px", borderRadius: 2, fontSize: "0.8rem", ...cellStyle(date) }}>{date ? date.getDate() : ""}</div>)}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
        {[["rgba(255,255,255,0.12)","rgba(255,255,255,0.2)","Available"],["#C9A84C",null,"Booked"],["rgba(255,255,255,0.1)","rgba(255,255,255,0.15)","Past"]].map(([bg, border, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: bg, border: border ? `1px solid ${border}` : "none" }} />
            <span style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.5)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Full-screen divider image between sections
function Divider({ src, fallbackColor = "#1A3A4A" }) {
  return (
    <div style={{ width: "100%", height: "100vh", scrollSnapAlign: "start", position: "relative", overflow: "hidden", flexShrink: 0 }}>
      {src
        ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        : <div style={{ width: "100%", height: "100%", background: fallbackColor }} />
      }
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.15))" }} />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", checkin: "", checkout: "", guests: "2", message: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [guestbookForm, setGuestbookForm] = useState({ name: "", date: "", rating: 5, text: "" });
  const [reviews, setReviews] = useState([]);
  const [guestbookSubmitted, setGuestbookSubmitted] = useState(false);
  const [checked, setChecked] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const containerRef = useRef(null);
  const sectionRefs = useRef({});

  const toggleCheck = (k) => setChecked(p => ({ ...p, [k]: !p[k] }));
  const handleBooking = () => { if (bookingForm.name && bookingForm.email && bookingForm.checkin && bookingForm.checkout) setBookingSubmitted(true); };
  const handleGuestbook = () => { if (guestbookForm.name && guestbookForm.text) { setReviews(prev => [{ ...guestbookForm, date: guestbookForm.date || new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }) }, ...prev]); setGuestbookSubmitted(true); } };

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => { document.body.style.overflow = (menuOpen || lightbox !== null) ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen, lightbox]);

  const inputStyle = { width: "100%", padding: "11px 14px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, fontFamily: font, fontSize: "0.95rem", color: "#F5F0E8", background: "rgba(255,255,255,0.07)", boxSizing: "border-box", marginBottom: 16, outline: "none" };
  const inputStyleLight = { width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: 2, fontFamily: font, fontSize: "0.95rem", color: "#2C2C2C", background: "#fff", boxSizing: "border-box", marginBottom: 16, outline: "none" };
  const Label = ({ children, dark }) => <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: dark ? "#888" : "rgba(245,240,232,0.5)", marginBottom: 6 }}>{children}</label>;

  return (
    <div style={{ fontFamily: font }}>
      {/* Hamburger */}
      <button onClick={() => setMenuOpen(o => !o)} style={{ position: "fixed", top: 24, left: 24, zIndex: 1000, background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: 26, height: 1.5, background: "#fff", transition: "all 0.3s", transform: menuOpen ? (i===0 ? "rotate(45deg) translate(4.5px,4.5px)" : i===2 ? "rotate(-45deg) translate(4.5px,-4.5px)" : "scaleX(0)") : "none", opacity: menuOpen && i===1 ? 0 : 1 }} />
        ))}
      </button>

      {/* Menu overlay */}
      <div style={{ position: "fixed", inset: 0, background: "rgba(13,31,26,0.97)", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "all" : "none", transition: "opacity 0.35s ease", fontFamily: font, padding: "0 24px" }}>
        {NAV_SECTIONS.map((item, i) => (
          <div key={item.id} style={{ textAlign: "center" }}>
            <button onClick={() => scrollTo(item.id)} style={{ background: "none", border: "none", color: "#F5F0E8", fontFamily: font, fontSize: "clamp(1.1rem, 3vw, 1.9rem)", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", padding: "9px 0", display: "block" }}>{item.label}</button>
            {i < NAV_SECTIONS.length - 1 && <div style={{ width: 1, height: 14, background: "rgba(201,168,76,0.3)", margin: "0 auto" }} />}
          </div>
        ))}
      </div>

      {/* Scroll container */}
      <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory" }}>

        {/* ── HERO ── */}
        <div ref={el => sectionRefs.current.hero = el} style={{ width: "100%", height: "100vh", scrollSnapAlign: "start", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <video autoPlay loop muted playsInline style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: "100%", minHeight: "100%", width: "auto", height: "auto", objectFit: "cover" }} src="/Houseflyover2.mp4" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 24px 10vh", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)", color: "#fff", fontWeight: 400, letterSpacing: "0.1em", margin: "0 0 10px", textTransform: "uppercase", lineHeight: 1 }}>Pelican Point</h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 44 }}>San Sebastian · Mozambique</p>
            <button onClick={() => scrollTo("story")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.55)", padding: "13px 44px", cursor: "pointer", fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>Welcome</button>
          </div>
        </div>

        {/* ── STORY ── */}
        <div ref={el => sectionRefs.current.story = el} style={{ width: "100%", minHeight: "100vh", scrollSnapAlign: "start", background: sectionBg(0), flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 32px 80px", flex: 1 }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 18 }}>The Pelican Point Story</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", marginBottom: 14, lineHeight: 1.25 }}>A Family, a Wilderness,<br />and a Place Called Home</h2>
            {goldLine}
            <div style={{ width: "100%", aspectRatio: "16/9", background: "#1A3A4A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 48, borderRadius: 2 }}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>▶</div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Our Story — Video Coming Soon</p>
            </div>
            <p style={{ lineHeight: 1.95, color: "#555", fontSize: "1.02rem", marginBottom: 22 }}>There are places you visit, and places that stay with you long after you've left. The San Sebastian peninsula is the latter — stretching into the Indian Ocean along Mozambique's southern coast, one of the last truly wild coastlines in Africa. It is here, within a 30,000 hectare conservation sanctuary, that our family found its place in the world.</p>
            <blockquote style={{ borderLeft: "2px solid #C9A84C", paddingLeft: 24, margin: "40px 0", fontStyle: "italic", fontSize: "1.1rem", color: "#333", lineHeight: 1.85 }}>"We didn't find this land. It found us. And once it did, we knew we had to protect it — and share it."</blockquote>
            <p style={{ lineHeight: 1.95, color: "#555", fontSize: "1.02rem", marginBottom: 22 }}>The house takes its name from the pelicans that glide low over the lagoon at dusk — unhurried, ancient, perfectly at home. Building here meant listening to the land: where the breezes run, how the light falls, which trees offer shade in the afternoon heat.</p>
            <p style={{ lineHeight: 1.95, color: "#555", fontSize: "1.02rem", marginBottom: 40 }}>Pelican Point sits within The Sanctuary — a protected reserve home to 298 bird species, five species of nesting marine turtles, the critically endangered Dugong, and growing populations of eland, zebra, giraffe and sable.</p>
            <div style={{ background: "#fff", border: "1px solid rgba(26,58,74,0.1)", padding: "24px 28px", marginBottom: 48, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderRadius: 2 }}>
              <div>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 5px" }}>Part of</p>
                <p style={{ fontSize: "1.05rem", color: "#1A3A4A", fontWeight: 400, margin: 0 }}>The Sanctuary, Mozambique</p>
                <p style={{ fontSize: "0.82rem", color: "#888", margin: "3px 0 0" }}>30,000 hectares · San Sebastian Peninsula</p>
              </div>
              <a href="https://mozsanctuary.com" target="_blank" rel="noreferrer" style={{ background: "#1A3A4A", color: "#fff", padding: "11px 24px", textDecoration: "none", fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap", borderRadius: 2 }}>Visit The Sanctuary →</a>
            </div>
          </div>
        </div>

        {/* ── DIVIDER 2 ── */}
        <Divider src="/divider2.png" fallbackColor="#1A3A4A" />

        {/* ── STAY ── */}
        <div ref={el => sectionRefs.current.stay = el} style={{ width: "100%", minHeight: "100vh", scrollSnapAlign: "start", background: sectionBg(1), flexShrink: 0 }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "100px 32px 80px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 14 }}>Stay at Pelican Point</h2>
            <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: 32, marginBottom: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ lineHeight: 1.95, color: "rgba(245,240,232,0.75)", fontSize: "1.02rem", fontStyle: "italic", marginBottom: 18 }}>Pelican Point is a thoughtfully curated retreat within The Sanctuary — a 30,000 hectare conservation reserve on Mozambique's wild San Sebastian peninsula.</p>
              <p style={{ lineHeight: 1.9, color: "rgba(245,240,232,0.6)", fontSize: "0.95rem", marginBottom: 0 }}>The house sleeps up to 6 guests and is fully equipped with a modern kitchen, outdoor dining terrace, high-speed Wi-Fi, and a curated library of local field guides.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 52 }}>
              {[["🛏️","6 En Suite Bedrooms"],["👨‍🍳","4 Full-Time Staff incl. Chef & Skipper"],["⛵","Boat"],["🏊","Swimming Pool"],["🚙","Game Vehicle"],["🌊","Hobie Cat · SUP Boards · Canoes"],["🤿","Snorkelling Gear"],["🦟","Mosquito Nets in All Rooms"],["📶","Fast Wi-Fi"],["🚭","No Smoking"]].map(([icon, label]) => (
                <div key={label} style={{ textAlign: "center", padding: "20px 10px", background: "rgba(255,255,255,0.05)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,240,232,0.55)", lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Staff */}
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 }}>Meet Your Team</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 28 }}>Four dedicated staff to make your stay exceptional.</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 60 }}>
              {STAFF.map(member => (
                <div key={member.name} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ width: "100%", aspectRatio: "1/1", background: "rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    {member.photo ? <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <>
                      <div style={{ fontSize: 36, opacity: 0.15, marginBottom: 6 }}>👤</div>
                      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Photo coming soon</p>
                    </>}
                  </div>
                  <div style={{ padding: "18px 18px 22px" }}>
                    <p style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 4px" }}>{member.role}</p>
                    <h4 style={{ fontSize: "1rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", margin: "0 0 10px" }}>{member.name}</h4>
                    <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.75, margin: 0 }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking */}
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 }}>Availability</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 28 }}>Check available dates below.</h3>
            <AvailabilityCalendar />
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 }}>Request a Booking</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 28 }}>We'll confirm availability and pricing within 24 hours.</h3>
            {bookingSubmitted ? (
              <div style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 4, padding: 36, textAlign: "center", color: "#C9A84C" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✉️</div>
                <h3 style={{ margin: "0 0 8px", color: "#C9A84C" }}>Request Received!</h3>
                <p style={{ margin: 0, color: "rgba(201,168,76,0.8)" }}>Thank you, <strong>{bookingForm.name}</strong>. We'll be in touch at <strong>{bookingForm.email}</strong> within 24 hours.</p>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, padding: 32, border: "1px solid rgba(255,255,255,0.08)" }}>
                <form action="https://formspree.io/f/xqeylopw" method="POST" onSubmit={(e) => { e.preventDefault(); handleBooking(); fetch("https://formspree.io/f/xqeylopw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: bookingForm.name, email: bookingForm.email, checkin: bookingForm.checkin, checkout: bookingForm.checkout, guests: bookingForm.guests, message: bookingForm.message, _subject: `Booking Request — Pelican Point — ${bookingForm.checkin} to ${bookingForm.checkout}` }) }); }}>
                  <Label>Full Name</Label>
                  <input name="name" style={inputStyle} placeholder="Your name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} required />
                  <Label>Email Address</Label>
                  <input name="email" type="email" style={inputStyle} placeholder="you@example.com" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} required />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div><Label>Check-in</Label><input name="checkin" type="date" style={inputStyle} value={bookingForm.checkin} onChange={e => setBookingForm({...bookingForm, checkin: e.target.value})} required /></div>
                    <div><Label>Check-out</Label><input name="checkout" type="date" style={inputStyle} value={bookingForm.checkout} onChange={e => setBookingForm({...bookingForm, checkout: e.target.value})} required /></div>
                  </div>
                  <Label>Number of Guests</Label>
                  <select name="guests" style={inputStyle} value={bookingForm.guests} onChange={e => setBookingForm({...bookingForm, guests: e.target.value})}>
                    {["1","2","3","4","5","6"].map(n => <option key={n} style={{ background: "#1A3A4A" }}>{n}</option>)}
                  </select>
                  <Label>Message (optional)</Label>
                  <textarea name="message" style={{ ...inputStyle, resize: "vertical", minHeight: 90 }} placeholder="Any special requirements..." value={bookingForm.message} onChange={e => setBookingForm({...bookingForm, message: e.target.value})} />
                  <input type="hidden" name="_cc" value="mark.deist@gmail.com,ndeist@gmail.com" />
                  <button type="submit" style={{ background: "#C9A84C", color: "#1A3A4A", padding: "13px 36px", border: "none", borderRadius: 2, cursor: "pointer", fontFamily: font, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>Send Booking Request →</button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* ── DIVIDER 3 ── */}
        <Divider src="/divider3.png" fallbackColor="#0D1F1A" />

        {/* ── GUESTBOOK ── */}
        <div ref={el => sectionRefs.current.guestbook = el} style={{ width: "100%", minHeight: "100vh", scrollSnapAlign: "start", background: sectionBg(0), flexShrink: 0 }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 32px 80px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", marginBottom: 14 }}>Guestbook</h2>
            {goldLine}
            <p style={{ color: "#888", marginBottom: 44, fontStyle: "italic", lineHeight: 1.7 }}>Pelican Point is built on stories — the ones the land holds, and the ones our guests bring. We'd love to hear yours.</p>
            {!guestbookSubmitted ? (
              <div style={{ background: "#fff", borderRadius: 4, padding: 32, marginBottom: 48, boxShadow: "0 2px 16px rgba(26,58,74,0.06)", border: "1px solid rgba(26,58,74,0.07)", borderTop: "3px solid #C9A84C" }}>
                <Label dark>Your Name</Label>
                <input style={inputStyleLight} placeholder="Name" value={guestbookForm.name} onChange={e => setGuestbookForm({...guestbookForm, name: e.target.value})} />
                <Label dark>When did you stay?</Label>
                <input style={inputStyleLight} placeholder="e.g. July 2025" value={guestbookForm.date} onChange={e => setGuestbookForm({...guestbookForm, date: e.target.value})} />
                <Label dark>Rating</Label>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(n => <span key={n} onClick={() => setGuestbookForm({...guestbookForm, rating: n})} style={{ fontSize: 26, cursor: "pointer", color: n <= guestbookForm.rating ? "#C9A84C" : "#ddd", transition: "color 0.2s" }}>★</span>)}
                </div>
                <Label dark>Your Message</Label>
                <textarea style={{ ...inputStyleLight, resize: "vertical", minHeight: 100 }} placeholder="Share your experience at Pelican Point..." value={guestbookForm.text} onChange={e => setGuestbookForm({...guestbookForm, text: e.target.value})} />
                <button onClick={handleGuestbook} style={{ background: "#1A3A4A", color: "#fff", padding: "13px 32px", border: "none", borderRadius: 2, cursor: "pointer", fontFamily: font, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Add to Guestbook →</button>
              </div>
            ) : (
              <div style={{ background: "#EDF7F0", border: "1px solid #A8D4B8", borderRadius: 4, padding: 28, textAlign: "center", color: "#1A5C30", marginBottom: 48 }}>
                <p style={{ margin: 0 }}>Thank you, <strong>{guestbookForm.name}</strong>. Your words are now part of Pelican Point's story. 🌟</p>
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
            )) : !guestbookSubmitted && <p style={{ color: "#ccc", fontStyle: "italic", textAlign: "center" }}>Be the first to leave a message in the guestbook.</p>}
          </div>
        </div>

        {/* ── DIVIDER 4 ── */}
        <Divider src="/divider4.png" fallbackColor="#1A3A4A" />

        {/* ── CHECKLIST ── */}
        <div ref={el => sectionRefs.current.checklist = el} style={{ width: "100%", minHeight: "100vh", scrollSnapAlign: "start", background: sectionBg(1), flexShrink: 0 }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 32px 80px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 14 }}>Guest Checklist</h2>
            <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />
            <p style={{ color: "rgba(245,240,232,0.6)", marginBottom: 44, fontStyle: "italic" }}>Everything you need to prepare for a seamless stay at Pelican Point.</p>
            {CHECKLIST.map(group => (
              <div key={group.group} style={{ marginBottom: 36 }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{group.group}</div>
                {group.items.map(item => {
                  const k = group.group + item; const isChecked = !!checked[k];
                  return (
                    <div key={item} onClick={() => toggleCheck(k)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", opacity: isChecked ? 0.4 : 1, transition: "opacity 0.2s" }}>
                      <div style={{ width: 20, height: 20, borderRadius: 2, border: isChecked ? "none" : "1px solid rgba(201,168,76,0.6)", background: isChecked ? "#C9A84C" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                        {isChecked && <span style={{ color: "#1A3A4A", fontSize: 11, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ color: "rgba(245,240,232,0.7)", fontSize: "0.95rem", textDecoration: isChecked ? "line-through" : "none" }}>{item}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER 5 ── */}
        <Divider src="/divider5.png" fallbackColor="#0D1F1A" />

        {/* ── RECOMMENDATIONS ── */}
        <div ref={el => sectionRefs.current.recommendations = el} style={{ width: "100%", minHeight: "100vh", scrollSnapAlign: "start", background: sectionBg(0), flexShrink: 0 }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "100px 32px 80px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", marginBottom: 14 }}>Recommendations for Your Stay</h2>
            {goldLine}
            <p style={{ color: "#888", marginBottom: 44, fontStyle: "italic" }}>Our personal picks to help you make the most of San Sebastian.</p>
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
        </div>

        {/* ── DIVIDER 6 ── */}
        <Divider src="/divider6.png" fallbackColor="#1A3A4A" />

        {/* ── GALLERY ── */}
        <div ref={el => sectionRefs.current.gallery = el} style={{ width: "100%", minHeight: "100vh", scrollSnapAlign: "start", background: sectionBg(1), flexShrink: 0 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 32px 80px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 14 }}>Gallery</h2>
            <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />
            <p style={{ color: "rgba(245,240,232,0.55)", marginBottom: 44, fontStyle: "italic" }}>Photos of Pelican Point and the wild beauty of The Sanctuary. More images coming soon.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
              {GALLERY_PLACEHOLDERS.map((item, i) => (
                <div key={i} onClick={() => setLightbox(i)} style={{ aspectRatio: "4/3", background: item.color, borderRadius: 2, cursor: "pointer", display: "flex", alignItems: "flex-end", overflow: "hidden", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                  <span style={{ position: "relative", padding: "14px 16px", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.label}</span>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo coming soon</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer style={{ background: "#0D1F1A", color: "rgba(245,240,232,0.35)", textAlign: "center", padding: "36px 24px", fontSize: "0.72rem", letterSpacing: "0.1em", fontFamily: font }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
              <img src="/logo.png" alt="Pelican Point" style={{ width: 32, height: 32, objectFit: "contain" }} />
              <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", color: "#C9A84C", fontFamily: font, fontStyle: "italic", fontSize: "1rem", cursor: "pointer" }}>Pelican Point</button>
            </div>
            <div>San Sebastian · Mozambique · <a href="mailto:hello@pelicanpointmoz.com" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "none" }}>hello@pelicanpointmoz.com</a></div>
            <div style={{ marginTop: 8 }}>© 2025 Pelican Point · <a href="https://mozsanctuary.com" target="_blank" rel="noreferrer" style={{ color: "#C9A84C", textDecoration: "none" }}>The Sanctuary</a></div>
          </footer>
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <div style={{ width: "80vw", maxWidth: 800, aspectRatio: "4/3", background: GALLERY_PLACEHOLDERS[lightbox].color, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{GALLERY_PLACEHOLDERS[lightbox].label}</span>
            </div>
            <button onClick={() => setLightbox(null)} style={{ position: "fixed", top: 24, right: 24, background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer" }}>✕</button>
            {lightbox > 0 && <button onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1); }} style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer" }}>‹</button>}
            {lightbox < GALLERY_PLACEHOLDERS.length - 1 && <button onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1); }} style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer" }}>›</button>}
          </div>
        )}

      </div>
    </div>
  );
}
