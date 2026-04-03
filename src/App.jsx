import { useState, useEffect, useRef } from "react";

const CHECKLIST = [
  {
    group: "Daywear",
    items: [
      "Costumes / swimwear",
      "Rashvests and fishing shirts",
      "Light windbreaker for boat trips or sunset game drives",
      "Sarongs, light dresses and kaftans",
      "T-shirt and shorts you don't mind getting wet",
      "Long-sleeve linen or cotton shirts",
      "Leggings or light trousers with walking shoes — there are ticks, snakes and thorns, so bring gear that provides adequate protection on walks",
      "Cap or hat and sunglasses",
      "Water shoes for wading at low tide and watersports — there are razor clams in some areas",
      "Slip-slops",
      "Exercise gear — prepare for thick sand if you want to run",
      "Sunblock (best brand for no stains on whites) and anti-sun treatments",
      "Repellent for ticks and mosquitoes",
      "Binoculars",
      "Fins and goggles",
      "Fishing and kiting gear",
    ],
  },
  {
    group: "Nightwear",
    items: [
      "After 5pm, change into mosquito and insect-proof clothing — loose-fitting, breathable materials (linen or light cotton) that cover arms and legs. Light colours work best",
      "Pull-on pants — kikoi, pyjama style or very light single-jersey trackpant",
      "Long-sleeve shirt in very light fabric or long-sleeve t-shirt",
      "Long-sleeve kaftans",
      "A sweatshirt for the colder months",
      "Espadrilles or a light, soft shoe for walking around at night",
      "Pocket torch — very useful at night",
    ],
  },
  {
    group: "Travel Insurance",
    items: [
      "Take out comprehensive travel insurance covering medical emergencies with emergency evacuation to high-quality trauma facilities in Maputo or Johannesburg",
    ],
  },
  {
    group: "Malaria",
    items: [
      "Pelican Point is in a malaria area — discuss medication options with your doctor before arriving",
      "The highest risk is when in Vilankulos. Very few cases have been reported in the Pelican Point area",
      "All rooms are equipped with mosquito nets",
      "Bring mosquito repellent",
    ],
  },
  {
    group: "Medication",
    items: [
      "There is a basic first aid kit at the house and on the boat for minor injuries",
      "Bring all your own medication — Pelican Point is in a remote area",
      "Bring a course of antibiotics for more serious infections",
      "Topical mupirocin ointment for minor infections (e.g. Supiroban)",
      "Antihistamine, stop-itch cream or Mylocort (one of these is important)",
      "Thick body cream (e.g. Bergamot cream from The Body Shop)",
    ],
  },
];

const RECOMMENDATIONS = [
  {
    category: "Eat & Drink",
    icon: "🍽️",
    photo: null,
    photoCaption: null,
    items: [
      "All food and drink can be ordered and delivered to Pelican Point via the Sanctuary office",
      "Mozambique has strict rules on the importation of alcohol and certain food items — please check these before packing",
    ],
  },
  {
    category: "Marine Activities",
    icon: "🌊",
    photo: null,
    photoCaption: null,
    items: [
      "SUP boarding and kayaking in the mangroves at high tide",
      "Beach walks at low tide",
      "Lunch or sundowners on a sandbank or Banque Island",
      "Snorkelling at low tide — Artificial reef at Mazarette, Magaruque Island, or the aquarium at the 2-mile reef (the best)",
      "Scuba diving — outfitters from Vilankulos come to The Sanctuary by arrangement. Contact Dive Bazaruto or Odyssey Dive",
      "Kitesurfing lessons in Vilankulos — Kitesurfing Centre",
      "Horse riding in Vilankulos — Vilankulos Horse Safaris",
      "__LINK__Check the tide table before planning activities|https://mozsanctuary.com/info/tide-table/",
    ],
  },
  {
    category: "Fishing",
    icon: "🎣",
    photo: null,
    photoCaption: null,
    items: [
      "Deep-sea fishing with a specialist skipper — available on request",
      "Salt water fly fishing and spinning permitted in the main channels beyond the Marine Protected Areas",
      "Fishing is prohibited within the Marine Protected Areas off The Sanctuary's shoreline (marked by buoys) and restricted to designated areas in the Bazaruto Archipelago National Park",
      "Each angler must carry a personal fishing licence valid for 30 days — issued by The Sanctuary office",
      "Adhere to recreational size and bag limits. Trophy species require a special licence",
      "Release undersize or over-limit fish carefully and promptly. Sale of recreational fish is not permitted",
      "We encourage catch and release",
    ],
  },
  {
    category: "Terrestrial Activities",
    icon: "🦒",
    photo: null,
    photoCaption: null,
    items: [
      "Sundowners at World's View and Ocean View",
      "Bush drives to the waterhole and lighthouse",
      "Bush walks",
      "__LINK__Download the Sanctuary Birds Checklist (298 species)|/New-2017-comprehensive-bird-checklist-The-S..pdf",
    ],
  },
];

const ROOMS = [
  { name: "Bedroom 1", description: "Description coming soon.", photo: null },
  { name: "Bedroom 2", description: "Description coming soon.", photo: null },
  { name: "Bedroom 3", description: "Description coming soon.", photo: null },
  { name: "Bedroom 4", description: "Description coming soon.", photo: null },
  { name: "Bedroom 5 — Children's Room", description: "Specifically equipped for young or adolescent children, with a cot and two single beds in addition to the king-size bed.", photo: null },
  { name: "Bedroom 6", description: "Description coming soon.", photo: null },
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

const DEBBIE_SCRIPT = `Pelican Point is a place where you can reconnect with family and friends, away from the distractions and relentless pace of everyday life by being fully immersed in a remote sub-tropical escape.

From the day you arrive, you'll find yourself to be fully immersed in the unique dune forest and estuary ecosystems in which Pelican Point exists. With no walls between you and the dune forest or barriers between you and the sea, slowly you'll find yourself surrendering to the tides and rhythm of the day in this breathtakingly beautiful and restorative environment.

The Sanctuary, in which Pelican Point resides, consists of thirty thousand hectares of protected coastline, wetland, and sea, and is part of the greater Bazaruto Archipelago, one of the last truly intact marine ecosystems on earth. When you stay here, your visit directly funds its protection and uplifts the communities that have lived on this coastline for generations.`;

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
    <div style={{ width: "100%", overflow: "hidden", background: "#1A3A4A" }}>
      <img src="/Pelican Point Image.jpeg" alt="Pelican Point" style={{ width: "100%", height: "auto", display: "block" }} />
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
  const subHead = { fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 14, fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif", fontWeight: 600 };
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
          <div style={{ position: "absolute", inset: 0, backgroundImage: 'url("/Mum Wading in Water.jpeg")', backgroundSize: "cover", backgroundPosition: "center 65%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 24px 10vh", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)", color: "#fff", fontWeight: 400, letterSpacing: "0.1em", margin: "0 0 10px", textTransform: "uppercase", lineHeight: 1 }}>Pelican Point</h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 44 }}>San Sebastian · Mozambique</p>
            <button onClick={() => scrollTo("stay")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.55)", padding: "13px 44px", cursor: "pointer", fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>Book</button>
          </div>
        </div>

        {/* ── STORY ── */}
        <div ref={el => sectionRefs.current.story = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ background: "#1A3A4A", padding: "clamp(40px, 6vw, 80px) 0" }}>
            <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 clamp(20px, 6vw, 80px)" }}>
              <p style={{ color: "#C9A84C", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, marginTop: 0 }}>The Pelican Point Story</p>
              {DEBBIE_SCRIPT.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontFamily: font, fontStyle: "italic", fontSize: "1rem", lineHeight: 1.9, color: "rgba(255,255,255,0.82)", marginBottom: 22, marginTop: 0 }}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* ── STAY ── */}
        <div ref={el => sectionRefs.current.stay = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={sectionHead}>Stay at Pelican Point</h2>
            {goldLine}

            {/* Intro */}
            <p style={{ fontStyle: "italic", marginBottom: 48, lineHeight: 1.95, color: "rgba(245,240,232,0.75)", fontSize: "1rem" }}>Pelican Point accommodates up to 12 adult guests across six en suite bedrooms, and any booking grants exclusive access to the house.</p>

            {/* Feature tiles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 16, marginBottom: 60 }}>
              {[
                { icon: "🛏️", title: "Six En Suite Bedrooms", text: "All rooms have king-size beds, hot water, showers and baths, mosquito nets, overhead fans and plug points. One room is configured for children with a cot and two single beds in addition to the king-size bed. Please note the water is not suitable for drinking." },
                { icon: "🍳", title: "Fully Equipped Kitchen", text: "Two fridges, dishwasher, gas hob, pantry and a gas braai." },
                { icon: "👨‍🍳", title: "Full-Time Staff", text: "Three full-time staff are included to make your stay comfortable and enjoyable — a house manager, personal chef and housekeeper." },
                { icon: "🎱", title: "Entertainment Area", text: "Bar (guests must stock), filtered water dispenser, coffee machine, kettle, toaster, ice maker, wireless speaker, pool table and table tennis." },
                { icon: "🏊", title: "Swimming Pool", text: "The pool is uncovered — vigilance is required with young children and swimming is at guests' own risk. No glass in the pool at any time." },
                { icon: "🛥️", title: "Motor Boat", text: "Available for island transfers and exploration of the Archipelago within the reef. A skipper is provided at all times — no guests are permitted to drive the boat. Please get in touch for deep-sea fishing enquiries." },
                { icon: "🚙", title: "Game Vehicle", text: "Available for excursions into the Sanctuary's interior. A guide is provided to drive at all times — no guests are permitted to drive the vehicle." },
                { icon: "🌊", title: "Water Sports", text: "Two kayaks and SUP boards on site. A Hobie Cat is available on request. Guests are encouraged to bring their own snorkelling, fishing or preferred water sports gear." },
                { icon: "📡", title: "Wi-Fi (Starlink)", text: "Wi-Fi is available via Starlink. Currently a little slow, so for those needing to work we recommend supplementing with a local cellular data package." },
                { icon: "📋", title: "House Rules", text: "No glass in the pool · No smoking · No recreational drugs on the premises · All guests must adhere to the Sanctuary's noise policy." },
              ].map(({ icon, title, text }) => (
                <div key={title} style={{ background: "#fff", borderRadius: 4, padding: 24, border: "1px solid rgba(26,58,74,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1A3A4A", margin: "0 0 10px" }}>{title}</p>
                  <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Rooms */}
            <p style={subHead}>The Rooms</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "rgba(245,240,232,0.75)", marginBottom: 28 }}>Each room opens onto a different aspect of the surrounding ecosystem.</h3>
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
                    <h4 style={{ fontSize: "1rem", fontWeight: 400, fontStyle: "italic", color: "#1A3A4A", margin: "0 0 10px" }}>{room.name}</h4>
                    <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.75, margin: 0 }}>{room.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability & Booking */}
            <p style={subHead}>Availability</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "rgba(245,240,232,0.75)", marginBottom: 28 }}>Check available dates below.</h3>
            <AvailabilityCalendar />
            <p style={subHead}>Request a Booking</p>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "rgba(245,240,232,0.75)", marginBottom: 28 }}>We'll confirm availability and pricing within 24 hours.</h3>
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
            <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 44, fontStyle: "italic" }}>Everything you need to make the most of your time at Pelican Point and the surrounding Bazaruto Archipelago.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 20 }}>
              {RECOMMENDATIONS.map(rec => (
                <div key={rec.category} style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1A3A4A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{rec.icon} {rec.category}</div>
                  {rec.items.map(item => {
                      const isLink = item.startsWith("__LINK__");
                      const parts = isLink ? item.replace("__LINK__","").split("|") : null;
                      return (
                        <div key={item} style={{ padding: "9px 0", borderBottom: "1px solid #f5f5f5", color: "#555", fontSize: "0.88rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: "#C9A84C", fontSize: 9, marginTop: 4, flexShrink: 0 }}>◆</span>
                          {isLink
                            ? <a href={parts[1]} target="_blank" rel="noreferrer" style={{ color: "#1A3A4A", textDecoration: "underline", fontSize: "0.88rem" }}>{parts[0]}</a>
                            : item}
                        </div>
                      );
                    })}

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
        </div>

        {/* ── SANCTUARY MAP ── */}
        <div ref={el => sectionRefs.current.sanctuarymap = el} style={{ width: "100%", background: "#1A3A4A" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) 80px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#F5F0E8", marginBottom: 14 }}>The Sanctuary</h2>
            <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 36 }} />
            <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 52, fontStyle: "italic", maxWidth: 700 }}>Pelican Point sits within The Sanctuary — 30,000 hectares of protected coastline, wetland and sea on the San Sebastian Peninsula, part of the greater Bazaruto Archipelago.</p>
            {[
              { src: "/Map of Sanctuary and Archipelago .png", title: "The Sanctuary & Bazaruto Archipelago" },
              { src: "/Map of Sanctuary .png", title: "The Sanctuary" },
              { src: "/Mazarette site numbers.png", title: "Mazarette Site Numbers" },
            ].map(({ src, title }) => (
              <div key={title} style={{ marginBottom: 60 }}>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 }}>{title}</p>
                <img src={src} alt={title} style={{ width: "100%", height: "auto", display: "block", borderRadius: 2 }} />
              </div>
            ))}
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
