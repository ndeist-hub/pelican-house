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

const ROOMS = [
  { name: "Bedroom 1", description: "Description coming soon.", photo: null },
  { name: "Bedroom 2", description: "Description coming soon.", photo: null },
  { name: "Bedroom 3", description: "Description coming soon.", photo: null },
  { name: "Bedroom 4", description: "Description coming soon.", photo: null },
  { name: "Bedroom 5", description: "Description coming soon.", photo: null },
  { name: "Bedroom 6 — Children's Room", description: "Specifically equipped for young or adolescent children, with a cot and two single beds.", photo: null },
];

const GALLERY_PLACEHOLDERS = [
  { label: "Pelican Point", color: "#1A3A4A" },
  { label: "The Sanctuary", color: "#3D6B4A" },
  { label: "Bazaruto Archipelago", color: "#2E6B7A" },
];

const STAFF = [
  { name: "Juvencio", role: "House Manager", photo: null, bio: "Juvencio is the heart of Pelican Point. As house manager, he oversees every detail of your stay — from your arrival to your departure — ensuring everything runs seamlessly and that every guest feels genuinely at home. Any issues during your stay should be directed to Juvencio in the first instance." },
  { name: "Raymondo", role: "Chef", photo: null, bio: "Raymondo brings the flavours of Mozambique to life in every meal. Drawing on fresh local ingredients — fish from the bay, vegetables from the market — he creates dishes that are both deeply rooted in the region and endlessly memorable. Raymondo will help you cook meals and attend to your food-related requirements." },
  { name: "Ramiro", role: "Room Upkeep, Household Maintenance & Laundry", photo: null, bio: "Ramiro keeps Pelican Point in impeccable order. Quietly attentive and endlessly capable, he ensures every room is pristine and that you have fresh linen and towels throughout your stay." },
  { name: "Our Skipper", role: "Skipper", photo: null, bio: "Our skipper knows these waters like few others — the tides, the fishing grounds, the hidden coves. The boat will be driven only by our skipper or Juvencio, and will ferry you to and from Vilankulos as required, serving as your primary mode of transport in the Archipelago.", tbd: true },
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
  { id: "sanctuarymap",    label: "The Sanctuary Map" },
];

const font = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";
const goldLine = <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />;

const DEBBIE_SCRIPT = `We set out to find a place where our family could truly reconnect, away from the distractions and relentless pace of everyday life. Somewhere we could recharge, be present with each other, and create the kind of memories that become part of who you are.

Pelican Point was born from that search. A place built not against nature, but completely within it. No walls between you and the dune forest. No barrier between you and the sea. You arrive, and slowly, without noticing exactly when it happens, you surrender to the tides and the rhythm of the day. Being in harmony with the natural forces of this unique environment is the source of Pelican Point's restorative power for both body and soul.

It's also important to remember that Pelican Point serves a greater purpose — as visitors to this environment, we have a duty to preserve the ecosystem and contribute to the upliftment of the communities that live within it. The Sanctuary, in which Pelican Point resides, consists of thirty thousand hectares of protected coastline, wetland, and sea, and is part of the greater Bazaruto Archipelago, one of the last truly intact marine ecosystems on earth. When you stay here, your visit directly funds its protection and uplifts the communities that have lived on this coastline for generations.`;

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
  const cellStyle = (date) => { if (!date) return { background: "transparent" }; if (isPast(date)) return { background: "#f5f5f5", color: "#ccc" }; if (isBooked(date)) return { background: "#1A3A4A", color: "#fff", fontWeight: 600 }; return { background: "#EDF7F0", color: "#1A5C30" }; };
  return (
    <div style={{ background: "#fff", borderRadius: 4, padding: 24, border: "1px solid rgba(26,58,74,0.1)", marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#1A3A4A", padding: "4px 10px" }}>‹</button>
        <span style={{ fontFamily: font, fontStyle: "italic", color: "#1A3A4A", fontSize: "0.95rem" }}>{monthName}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#1A3A4A", padding: "4px 10px" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 6 }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d} style={{ textAlign: "center", fontSize: "0.58rem", letterSpacing: "0.1em", color: "#888", textTransform: "uppercase" }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {days.map((date, i) => <div key={i} style={{ textAlign: "center", padding: "7px 2px", borderRadius: 2, fontSize: "0.8rem", ...cellStyle(date) }}>{date ? date.getDate() : ""}</div>)}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
        {[["#EDF7F0","#A8D4B8","Available"],["#1A3A4A",null,"Booked"],["#f5f5f5","#eee","Past"]].map(([bg, border, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: bg, border: border ? `1px solid ${border}` : "none" }} />
            <span style={{ fontSize: "0.68rem", color: "#666" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ width: "100%", height: "60vh", background: "#0D1F2A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <div style={{ fontSize: 36, opacity: 0.2 }}>▶</div>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Video coming soon</p>
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
  const scrollTo = (id) => { const el = sectionRefs.current[id]; if (el) el.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  useEffect(() => { document.body.style.overflow = (menuOpen || lightbox !== null) ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen, lightbox]);

  const inputStyle = { width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: 2, fontFamily: font, fontSize: "0.95rem", color: "#2C2C2C", background: "#FAFAF7", boxSizing: "border-box", marginBottom: 16, outline: "none" };
  const Label = ({ children }) => <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>{children}</label>;

  const prose = { lineHeight: 1.95, color: "#444", fontSize: "1rem", marginBottom: 20 };
  const sectionHead = { fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 14 };
  const subHead = { fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 };
  const cardStyle = { background: "#fff", borderRadius: 4, padding: 28, border: "1px solid rgba(26,58,74,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" };

  return (
    <div style={{ fontFamily: font, background: "#1A3A4A" }}>
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .section-pad { padding: 60px 20px 60px !important; }
          .story-float { float: none !important; width: 100% !important; margin-right: 0 !important; margin-bottom: 24px !important; }
          .story-grid { grid-template-columns: 1fr !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .wide-pad { padding: 60px 20px 60px !important; }
          .booking-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

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

      <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll" }}>

        {/* ── HERO ── */}
        <div ref={el => sectionRefs.current.hero = el} style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <video autoPlay loop muted playsInline style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: "100%", minHeight: "100%", width: "auto", height: "auto", objectFit: "cover" }} src="/Houseflyover3.mp4" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 24px 10vh", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)", color: "#fff", fontWeight: 400, letterSpacing: "0.1em", margin: "0 0 10px", textTransform: "uppercase", lineHeight: 1 }}>Pelican Point</h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 44 }}>San Sebastian · Mozambique</p>
            <button onClick={() => scrollTo("story")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.55)", padding: "13px 44px", cursor: "pointer", fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>Welcome</button>
          </div>
        </div>

        {/* ── STORY ── */}
        <div ref={el => sectionRefs.current.story = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ background: "#1A3A4A", padding: "clamp(40px, 6vw, 80px) 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 6vw, 80px)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 300px) 1fr", gap: "clamp(30px, 5vw, 60px)", alignItems: "start" }}>
                {/* Photo */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ width: "100%", aspectRatio: "3/4", background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                    <img src="/family.jpg" alt="The Deist Family" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                    <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                      <div style={{ fontSize: 48, opacity: 0.15 }}>📷</div>
                      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Photo coming soon</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <p style={{ color: "#C9A84C", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px" }}>The Deist Family</p>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontStyle: "italic", fontSize: "0.9rem", margin: 0 }}>San Sebastian, Mozambique</p>
                  </div>
                </div>
                {/* Script */}
                <div style={{ minWidth: 0, paddingTop: 4 }}>
                  <p style={{ color: "#C9A84C", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, marginTop: 0 }}>The Pelican Point Story</p>
                  {DEBBIE_SCRIPT.split("\n\n").map((para, i) => (
                    <p key={i} style={{ fontFamily: font, fontStyle: "italic", fontSize: "1rem", lineHeight: 1.9, color: "rgba(255,255,255,0.82)", marginBottom: 22, marginTop: 0 }}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER 2 ── */}
        <Divider />

        {/* ── STAY ── */}
        <div ref={el => sectionRefs.current.stay = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={sectionHead}>Stay at Pelican Point</h2>
            {goldLine}

            {/* Intro */}
            <div style={{ ...cardStyle, marginBottom: 40 }}>
              <p style={{ ...prose, fontStyle: "italic" }}>The house has six en suite bedrooms, one of which is specifically equipped for young or adolescent children. At full capacity, we can accommodate 12 adult guests.</p>
              <p style={prose}>All rooms have access to hot running water and electricity, and include an overhead fan, mosquito nets and plug points to charge devices or power a hairdryer. All the rooms have a king-size bed, and the children's room includes a cot and 2 single beds for young children. Ramiro will ensure your rooms are clean and that you have fresh linen and towels throughout your stay.</p>
              <p style={prose}>You will have access to our fully equipped kitchen, which includes two fridges, a dishwasher, pantry space and a gas hob, along with the necessary cooking items. We also have a gas braai that you can use. Raymondo, our chef, will help you cook meals and attend to your food-related requirements.</p>
              <p style={prose}>Our entertainment area includes a bar with a filtered water dispenser, coffee machines, mini fridges and ice-making machines. Please note that our pool is uncovered, so please be extra vigilant with anyone who can't swim. We also have a table tennis and pool table which you are welcome to enjoy.</p>
              <p style={prose}>As part of your stay, you will have access to our boat, which will be driven only by our skipper or Juvencio. The boat will ferry you to and from Vilankulos as required and serve as your primary mode of transport in the Archipelago. The boat can be made available for deep-sea fishing upon request and at an additional charge.</p>
              <p style={prose}>You will have access to our SUPs and kayaks, and we encourage you to bring your own snorkelling gear. The Hobie Cat will be available only upon request and for an additional fee, subject to strict safety rules.</p>
              <p style={prose}>We have a game vehicle that you will have access to, to explore the Sanctuary's interior, and this must be driven by Juvencio.</p>
              <p style={{ ...prose, marginBottom: 0, color: "#444", fontWeight: 500 }}>As general policy, we allow no glass in the pool, and smoking and recreational drug use are strictly forbidden on the premises. Any issues regarding your stay whilst on site should be directed to Juvencio and can then be escalated appropriately to Debbie Deist.</p>
            </div>

            {/* Amenity icons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(130px, 45%), 1fr))", gap: 10, marginBottom: 60 }}>
              {[["🛏️","6 En Suite Bedrooms"],["👨‍🍳","4 Full-Time Staff incl. Chef & Skipper"],["⛵","Boat"],["🏊","Swimming Pool"],["🚙","Game Vehicle"],["🌊","Hobie Cat · SUP Boards · Canoes"],["🤿","Snorkelling Gear"],["🦟","Mosquito Nets in All Rooms"],["📶","Fast Wi-Fi"],["🚭","No Smoking & No Drugs"]].map(([icon, label]) => (
                <div key={label} style={{ textAlign: "center", padding: "20px 10px", background: "#fff", borderRadius: 3, border: "1px solid rgba(26,58,74,0.08)" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#555", lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Rooms */}
            <p style={subHead}>The Rooms</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 28 }}>Each room opens onto a different aspect of the surrounding ecosystem.</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20, marginBottom: 60 }}>
              {ROOMS.map((room, i) => (
                <div key={i} style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
                  <div style={{ width: "100%", aspectRatio: "4/3", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {room.photo
                      ? <img src={room.photo} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 28, opacity: 0.15, marginBottom: 8 }}>📷</div>
                          <p style={{ color: "#ccc", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Photo coming soon</p>
                        </div>
                    }
                  </div>
                  <div style={{ padding: "20px 24px 24px" }}>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 6px" }}>Bedroom {i + 1}</p>
                    <h4 style={{ fontSize: "1rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", margin: "0 0 10px" }}>{room.name}</h4>
                    <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.75, margin: 0 }}>{room.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Staff */}
            <p style={subHead}>Meet Your Team</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 28 }}>Four dedicated staff to make your stay exceptional.</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 20, marginBottom: 60 }}>
              {STAFF.map(member => (
                <div key={member.name} style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
                  <div style={{ width: "100%", aspectRatio: "1/1", background: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    {member.photo ? <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <>
                      <div style={{ fontSize: 36, opacity: 0.15, marginBottom: 6 }}>👤</div>
                      <p style={{ color: "#ccc", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Photo coming soon</p>
                    </>}
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <p style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 4px" }}>{member.role}</p>
                    <h4 style={{ fontSize: "1rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", margin: "0 0 10px" }}>{member.name}</h4>
                    <p style={{ fontSize: "0.82rem", color: "#333", lineHeight: 1.75, margin: 0 }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability & Booking */}
            <p style={subHead}>Availability</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 28 }}>Check available dates below.</h3>
            <AvailabilityCalendar />
            <p style={subHead}>Request a Booking</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 28 }}>We'll confirm availability and pricing within 24 hours.</h3>
            {bookingSubmitted ? (
              <div style={{ background: "#EDF7F0", border: "1px solid #A8D4B8", borderRadius: 4, padding: 36, textAlign: "center", color: "#1A5C30" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✉️</div>
                <h3 style={{ margin: "0 0 8px" }}>Request Received!</h3>
                <p style={{ margin: 0 }}>Thank you, <strong>{bookingForm.name}</strong>. We'll be in touch at <strong>{bookingForm.email}</strong> within 24 hours.</p>
              </div>
            ) : (
              <div style={cardStyle}>
                <form action="https://formspree.io/f/xqeylopw" method="POST" onSubmit={(e) => { e.preventDefault(); handleBooking(); fetch("https://formspree.io/f/xqeylopw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: bookingForm.name, email: bookingForm.email, checkin: bookingForm.checkin, checkout: bookingForm.checkout, guests: bookingForm.guests, message: bookingForm.message, _subject: `Booking Request — Pelican Point — ${bookingForm.checkin} to ${bookingForm.checkout}` }) }); }}>
                  <Label>Full Name</Label>
                  <input name="name" style={inputStyle} placeholder="Your name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} required />
                  <Label>Email Address</Label>
                  <input name="email" type="email" style={inputStyle} placeholder="you@example.com" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} required />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 16 }}>
                    <div><Label>Check-in</Label><input name="checkin" type="date" style={inputStyle} value={bookingForm.checkin} onChange={e => setBookingForm({...bookingForm, checkin: e.target.value})} required /></div>
                    <div><Label>Check-out</Label><input name="checkout" type="date" style={inputStyle} value={bookingForm.checkout} onChange={e => setBookingForm({...bookingForm, checkout: e.target.value})} required /></div>
                  </div>
                  <Label>Number of Guests</Label>
                  <select name="guests" style={inputStyle} value={bookingForm.guests} onChange={e => setBookingForm({...bookingForm, guests: e.target.value})}>
                    {["1","2","3","4","5","6","7","8","9","10","11","12"].map(n => <option key={n}>{n}</option>)}
                  </select>
                  <Label>Message (optional)</Label>
                  <textarea name="message" style={{ ...inputStyle, resize: "vertical", minHeight: 90 }} placeholder="Any special requirements or questions..." value={bookingForm.message} onChange={e => setBookingForm({...bookingForm, message: e.target.value})} />
                  <input type="hidden" name="_cc" value="mark.deist@gmail.com,ndeist@gmail.com" />
                  <button type="submit" style={{ background: "#C9A84C", color: "#1A3A4A", padding: "13px 36px", border: "none", borderRadius: 2, cursor: "pointer", fontFamily: font, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>Send Booking Request →</button>
                </form>
              </div>
            )}
          </div>
        </div>


        {/* ── GUESTBOOK ── */}
        <div ref={el => sectionRefs.current.guestbook = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={sectionHead}>Guestbook</h2>
            {goldLine}
            <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 44, fontStyle: "italic", lineHeight: 1.7 }}>Pelican Point is built on stories — the ones the land holds, and the ones our guests bring. We'd love to hear yours.</p>
            {!guestbookSubmitted ? (
              <div style={{ background: "#fff", borderRadius: 4, padding: 28, border: "1px solid rgba(26,58,74,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", marginBottom: 48, borderTop: "3px solid #C9A84C" }}>
                <Label>Your Name</Label>
                <input style={inputStyle} placeholder="Name" value={guestbookForm.name} onChange={e => setGuestbookForm({...guestbookForm, name: e.target.value})} />
                <Label>When did you stay?</Label>
                <input style={inputStyle} placeholder="e.g. July 2025" value={guestbookForm.date} onChange={e => setGuestbookForm({...guestbookForm, date: e.target.value})} />
                <Label>Rating</Label>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(n => <span key={n} onClick={() => setGuestbookForm({...guestbookForm, rating: n})} style={{ fontSize: 26, cursor: "pointer", color: n <= guestbookForm.rating ? "#C9A84C" : "#ddd" }}>★</span>)}
                </div>
                <Label>Your Message</Label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} placeholder="Share your experience at Pelican Point..." value={guestbookForm.text} onChange={e => setGuestbookForm({...guestbookForm, text: e.target.value})} />
                <button onClick={handleGuestbook} style={{ background: "#C9A84C", color: "#1A3A4A", padding: "13px 32px", border: "none", borderRadius: 2, cursor: "pointer", fontFamily: font, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>Add to Guestbook →</button>
              </div>
            ) : (
              <div style={{ background: "#EDF7F0", border: "1px solid #A8D4B8", borderRadius: 4, padding: 28, textAlign: "center", color: "#1A5C30", marginBottom: 48 }}>
                <p style={{ margin: 0 }}>Thank you, <strong>{guestbookForm.name}</strong>. Your words are now part of Pelican Point's story. 🌟</p>
              </div>
            )}
            {reviews.length > 0 ? reviews.map((r, i) => (
              <div key={i} style={{ borderLeft: "3px solid #C9A84C", paddingLeft: 20, marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: "#F5F0E8" }}>{r.name}</span>
                  <span style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.78rem" }}>{r.date}</span>
                </div>
                <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= r.rating ? "#C9A84C" : "#ddd", fontSize: 13 }}>★</span>)}</div>
                <p style={{ color: "rgba(245,240,232,0.8)", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>{r.text}</p>
              </div>
            )) : !guestbookSubmitted && <p style={{ color: "#ccc", fontStyle: "italic", textAlign: "center" }}>Be the first to leave a message in the guestbook.</p>}
          </div>
        </div>


        {/* ── CHECKLIST ── */}
        <div ref={el => sectionRefs.current.checklist = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={sectionHead}>Guest Checklist</h2>
            {goldLine}
            <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 44, fontStyle: "italic" }}>Everything you need to prepare for a seamless stay at Pelican Point.</p>
            {CHECKLIST.map(group => (
              <div key={group.group} style={{ background: "#fff", borderRadius: 4, padding: 28, marginBottom: 20, border: "1px solid rgba(26,58,74,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#1A3A4A", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #eee" }}>{group.group}</div>
                {group.items.map(item => {
                  const k = group.group + item; const isChecked = !!checked[k];
                  return (
                    <div key={item} onClick={() => toggleCheck(k)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #f5f5f5", cursor: "pointer", opacity: isChecked ? 0.45 : 1, transition: "opacity 0.2s" }}>
                      <div style={{ width: 20, height: 20, borderRadius: 2, border: isChecked ? "none" : "1px solid rgba(201,168,76,0.6)", background: isChecked ? "#C9A84C" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                        {isChecked && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ color: "#444", fontSize: "0.95rem", textDecoration: isChecked ? "line-through" : "none" }}>{item}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>


        {/* ── RECOMMENDATIONS ── */}
        <div ref={el => sectionRefs.current.recommendations = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={sectionHead}>Recommendations for Your Stay</h2>
            {goldLine}
            <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 44, fontStyle: "italic" }}>Our personal picks to help you make the most of San Sebastian and the surrounding area.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 20 }}>
              {RECOMMENDATIONS.map(rec => (
                <div key={rec.category} style={cardStyle}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1A3A4A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{rec.icon} {rec.category}</div>
                  {rec.items.map(item => (
                    <div key={item} style={{ padding: "9px 0", borderBottom: "1px solid #f5f5f5", color: "#555", fontSize: "0.88rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A84C", fontSize: 9, marginTop: 4, flexShrink: 0 }}>◆</span>{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ── GALLERY ── */}
        <div ref={el => sectionRefs.current.gallery = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={sectionHead}>Gallery</h2>
            {goldLine}
            <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 44, fontStyle: "italic" }}>Photos of Pelican Point and the wild beauty of The Sanctuary. More images coming soon.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: 10 }}>
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

        {/* ── SANCTUARY MAP ── */}
        <div ref={el => sectionRefs.current.sanctuarymap = el} style={{ width: "100%", minHeight: "100vh", background: "#1A3A4A", flexShrink: 0 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 14 }}>The Sanctuary</h2>
            <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />
            <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 44, fontStyle: "italic", maxWidth: 700 }}>Pelican Point sits within The Sanctuary — 30,000 hectares of protected coastline, wetland and sea on the San Sebastian Peninsula, part of the greater Bazaruto Archipelago.</p>
            <div style={{ width: "100%", background: "#1A3A4A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Replace sanctuary-map.png with your map image */}
              <img src="/sanctuary-map.png" alt="The Sanctuary Map" style={{ width: "100%", maxWidth: 900, display: "block", margin: "0 auto" }}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
              <div style={{ display: "none", width: "100%", height: 500, alignItems: "center", justifyContent: "center", border: "1px dashed rgba(26,58,74,0.2)", borderRadius: 4, flexDirection: "column", gap: 12 }}>
                <p style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Map coming soon</p>
                <p style={{ color: "#bbb", fontSize: "0.8rem" }}>Upload sanctuary-map.png to your public/ folder</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
          <footer style={{ background: "#1A3A4A", color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "36px 24px", fontSize: "0.72rem", letterSpacing: "0.1em", fontFamily: font, marginTop: 60 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
              <img src="/logo.png" alt="Pelican Point" style={{ width: 32, height: 32, objectFit: "contain" }} />
              <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", color: "#C9A84C", fontFamily: font, fontStyle: "italic", fontSize: "1rem", cursor: "pointer" }}>Pelican Point</button>
            </div>
            <div>San Sebastian · Mozambique · <a href="mailto:debbiedeist@icon.co.za" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>debbiedeist@icon.co.za</a></div>
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
