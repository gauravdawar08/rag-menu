import { useState, useRef, useEffect } from 'react'
import { Coffee, MessageCircle, X, Send, Sparkles, MapPin, Clock, AtSign, Phone, ArrowRight } from 'lucide-react'
import { menuSections, cafeInfo, dietaryLegend, type MenuItem } from './data/menu'

// ---------- Dietary tags ----------
function DietaryTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[1.5px] font-medium text-[#6b4e2e]">
      {tags.map(t => (
        <span key={t} className="px-1.5 py-0.5 border border-[#c9a07a]/60 rounded-sm">
          ({t})
        </span>
      ))}
    </span>
  )
}

// ---------- Menu item row (Algorithm AU style) ----------
function MenuRow({ item }: { item: MenuItem }) {
  return (
    <div className="group py-8 border-b border-[#c9a07a]/30 last:border-0 relative">
      {item.popular && (
        <div className="absolute -left-4 top-10 hidden lg:block">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c8a267] ring-4 ring-[#c8a267]/20 animate-pulse" />
        </div>
      )}

      <div className="flex items-baseline gap-4 mb-3">
        <h3 className="font-serif text-[28px] md:text-[32px] font-medium leading-none text-[#1c1916] tracking-tight">
          {item.name}
        </h3>
        <DietaryTags tags={item.dietary} />
        <div className="dotted-line hidden md:block" />

        <div className="flex items-baseline gap-3 ml-auto md:ml-0">
          {item.sizes.map((s, i) => (
            <div key={i} className="text-right">
              {s.label && <div className="text-[10px] uppercase tracking-widest text-[#6b4e2e]/70">{s.label}</div>}
              <div className="font-serif text-2xl font-medium text-[#1c1916] tabular-nums">${s.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[15px] text-[#6b4e2e] leading-relaxed max-w-3xl mb-4">
        {item.description}
      </p>

      {(item.addOns || item.notes) && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#6b4e2e]/80">
          {item.addOns?.map((a, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <span className="text-[#1c1916]">+</span> {a.label}
              <span className="font-medium text-[#1c1916]">${a.price.toFixed(2)}</span>
            </span>
          ))}
          {item.notes && (
            <span className="italic text-[#8c6a45]">{item.notes}</span>
          )}
        </div>
      )}
    </div>
  )
}

// ---------- Chat Window ----------
function ChatWindow({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant' as const,
      content: "G'day, I'm Bean — your AI barista at Brew & Bite.\n\nAsk me about our menu, dietary options, or help picking your next favourite drink ☕",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const send = (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || isLoading) return
    setMessages(p => [...p, { role: 'user', content: msg }])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const replies: Record<string, string> = {
        default: "I can help with menu recommendations, allergens, or customisations. What are you in the mood for today?",
        vegan: "Our Falafel Wrap and Vegan Brownie are vegan by default! The Avocado Toast is also vegan if you skip the feta, and the Acai Bowl is vegan without the honey.",
        gluten: "For gluten-free options, you can add a GF wrap (+$2) or GF bread (+$3) to most items. The Long Black and Fresh Orange Juice are naturally gluten-free.",
        strong: "Our Long Black (double shot) and Cold Brew are our strongest coffees. The Cold Brew has about 200mg caffeine — the biggest kick on the menu!",
        sweet: "Try the Mocha with whipped cream, the Hot Chocolate (ask for extra marshmallows), or our Vegan Brownie for something chocolatey and fudgy.",
      }
      const lower = msg.toLowerCase()
      let reply = replies.default
      if (/vegan|plant|dairy/.test(lower)) reply = replies.vegan
      else if (/gluten|celiac|gf\b/.test(lower)) reply = replies.gluten
      else if (/strong|caffeine|kick|wake/.test(lower)) reply = replies.strong
      else if (/sweet|dessert|chocolate|sugar/.test(lower)) reply = replies.sweet
      else if (/flat white/.test(lower)) reply = "The Flat White is our signature — velvety microfoam with a double shot. $4.80 regular or $5.50 large. Oat milk pairs beautifully (+$1)."
      else if (/recommend|popular|best/.test(lower)) reply = "Our most-loved items: the Flat White, Cold Brew, Avocado Toast, and Vegan Brownie. What kind of thing are you after — coffee, breakfast, or something sweet?"

      setMessages(p => [...p, { role: 'assistant', content: reply }])
      setIsLoading(false)
    }, 900)
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#1c1916]/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#faf5ec] z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="bg-[#1c1916] text-[#f4efe6] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 bg-[#c8a267] rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#1c1916]" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full ring-2 ring-[#1c1916]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-medium">Bean</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c8a267]" />
              </div>
              <p className="text-[11px] text-[#c9a07a] tracking-wide uppercase">AI Barista • Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-7 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 bg-[#c8a267] rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                  <Coffee className="w-3.5 h-3.5 text-[#1c1916]" />
                </div>
              )}
              <div
                className={`max-w-[82%] px-4 py-3 text-[14px] leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-[#1c1916] text-[#f4efe6] rounded-2xl rounded-tr-sm'
                    : 'bg-white border border-[#c9a07a]/30 text-[#1c1916] rounded-2xl rounded-tl-sm'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 bg-[#c8a267] rounded-full flex items-center justify-center">
                <Coffee className="w-3.5 h-3.5 text-[#1c1916]" />
              </div>
              <div className="bg-white border border-[#c9a07a]/30 rounded-2xl px-4 py-3 flex gap-1.5">
                <div className="w-2 h-2 bg-[#c9a07a] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#c9a07a] rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 bg-[#c9a07a] rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {['What is a Flat White?', 'Vegan options?', 'Strongest coffee?', 'Something sweet'].map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-3 py-2 bg-white border border-[#c9a07a]/40 rounded-full hover:border-[#1c1916] hover:bg-[#1c1916] hover:text-[#f4efe6] transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 bg-white border-t border-[#c9a07a]/30">
          <div className="flex items-center gap-2 bg-[#faf5ec] rounded-full border border-[#c9a07a]/50 focus-within:border-[#1c1916] transition-colors pr-1.5 pl-4">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about the menu…"
              className="flex-1 bg-transparent outline-none py-3.5 text-sm placeholder:text-[#6b4e2e]/50"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-[#1c1916] hover:bg-[#3d2817] disabled:bg-[#c9a07a]/40 text-[#f4efe6] rounded-full flex items-center justify-center transition-all disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-[#6b4e2e]/60 text-center mt-2.5 tracking-[1.5px] uppercase">
            Powered by RAG • via ngrok
          </p>
        </div>
      </div>
    </>
  )
}

// ---------- Main page ----------
export default function BrewAndBite() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('all')

  const visibleSections = activeSection === 'all'
    ? menuSections
    : menuSections.filter(s => s.id === activeSection)

  return (
    <div className="min-h-screen bg-[#f4efe6] text-[#1c1916]">

      {/* ========= NAVIGATION ========= */}
      <nav className="sticky top-0 z-30 bg-[#f4efe6]/90 backdrop-blur-xl border-b border-[#c9a07a]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#1c1916] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Coffee className="w-5 h-5 text-[#c8a267]" />
            </div>
            <div className="leading-none">
              <div className="font-serif text-[22px] font-semibold tracking-tight">Brew &amp; Bite</div>
              <div className="text-[10px] tracking-[2.5px] text-[#6b4e2e] uppercase mt-0.5">Sydney · Est. 2018</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10 text-[13px] tracking-[2px] uppercase font-medium text-[#3d2817]">
            <a href="#menu" className="hover:text-[#1c1916] transition-colors">Menu</a>
            <a href="#story" className="hover:text-[#1c1916] transition-colors">Story</a>
            <a href="#visit" className="hover:text-[#1c1916] transition-colors">Visit</a>
          </div>

          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 bg-[#1c1916] text-[#f4efe6] pl-4 pr-5 py-2.5 rounded-full hover:bg-[#3d2817] transition-all group"
          >
            <div className="w-7 h-7 bg-[#c8a267] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Sparkles className="w-3.5 h-3.5 text-[#1c1916]" />
            </div>
            <span className="text-sm font-medium">Ask Bean</span>
          </button>
        </div>
      </nav>

      {/* ========= HERO ========= */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20 md:pb-24">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <div className="text-[11px] tracking-[4px] uppercase text-[#6b4e2e] font-medium mb-8 flex items-center gap-3">
                <div className="w-10 h-px bg-[#6b4e2e]" />
                {cafeInfo.location}
              </div>

              <h1 className="font-serif font-light text-[64px] sm:text-[96px] md:text-[140px] leading-[0.88] tracking-[-0.04em] text-[#1c1916]">
                Brew
                <br />
                <span className="italic font-normal text-[#6b4e2e]">&amp; Bite.</span>
              </h1>

              <div className="mt-10 max-w-xl">
                <p className="text-[17px] md:text-[19px] leading-relaxed text-[#3d2817]">
                  A neighbourhood café in Surry Hills serving specialty coffee,
                  seasonal breakfast, and pastries baked fresh every morning.
                  Thoughtful menu. Kind people. Good mornings.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-3 bg-[#1c1916] text-[#f4efe6] px-8 py-4 rounded-full font-medium hover:bg-[#3d2817] transition-all group"
                >
                  Browse the menu
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="inline-flex items-center gap-2 text-[#1c1916] font-medium underline decoration-[#c8a267] decoration-2 underline-offset-8 hover:decoration-[#1c1916] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#c8a267]" />
                  or ask Bean for a recommendation
                </button>
              </div>
            </div>

            <div className="md:col-span-4 md:pb-10 space-y-5">
              <div className="border-t border-[#c9a07a]/50 pt-5">
                <div className="text-[10px] tracking-[3px] uppercase text-[#6b4e2e] mb-2">Hours</div>
                <div className="font-serif text-base leading-snug">
                  Mon — Fri · {cafeInfo.hours.weekday}<br />
                  Sat — Sun · {cafeInfo.hours.weekend}
                </div>
              </div>
              <div className="border-t border-[#c9a07a]/50 pt-5">
                <div className="text-[10px] tracking-[3px] uppercase text-[#6b4e2e] mb-2">Address</div>
                <div className="font-serif text-base leading-snug">{cafeInfo.address}</div>
              </div>
              <div className="border-t border-[#c9a07a]/50 pt-5">
                <div className="text-[10px] tracking-[3px] uppercase text-[#6b4e2e] mb-2">Say hi</div>
                <div className="font-serif text-base leading-snug">{cafeInfo.instagram}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= MENU ========= */}
      <section id="menu" className="bg-[#faf5ec] py-20 md:py-28 border-y border-[#c9a07a]/40">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <div className="text-center mb-16">
            <div className="text-[11px] tracking-[4px] uppercase text-[#6b4e2e] mb-4">— The Menu —</div>
            <h2 className="font-serif text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[0.9]">
              Thoughtfully<br />
              <span className="italic font-normal text-[#6b4e2e]">curated by our chefs.</span>
            </h2>
            <p className="mt-8 text-[15px] text-[#3d2817] max-w-xl mx-auto">
              Please ask about our Chef's Specials, available daily. All coffee uses full cream milk by default — plant alternatives available.
            </p>
          </div>

          {/* Section filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 border-y border-[#c9a07a]/40 py-4">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-5 py-2 text-[11px] tracking-[2px] uppercase font-medium rounded-full transition-all ${
                activeSection === 'all' ? 'bg-[#1c1916] text-[#f4efe6]' : 'text-[#3d2817] hover:bg-[#c9a07a]/20'
              }`}
            >
              Everything
            </button>
            {menuSections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-5 py-2 text-[11px] tracking-[2px] uppercase font-medium rounded-full transition-all ${
                  activeSection === s.id ? 'bg-[#1c1916] text-[#f4efe6]' : 'text-[#3d2817] hover:bg-[#c9a07a]/20'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Menu sections */}
          <div className="space-y-20">
            {visibleSections.map(section => (
              <div key={section.id} id={section.id}>
                <div className="text-center mb-10">
                  <div className="text-[11px] tracking-[4px] uppercase text-[#6b4e2e] mb-2">—</div>
                  <h3 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">{section.title}</h3>
                  {section.subtitle && (
                    <p className="mt-3 text-[14px] italic text-[#6b4e2e]">{section.subtitle}</p>
                  )}
                  <div className="text-[11px] tracking-[4px] uppercase text-[#6b4e2e] mt-2">—</div>
                </div>

                <div className="max-w-4xl mx-auto">
                  {section.items.map(item => (
                    <MenuRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dietary legend */}
          <div className="mt-20 pt-10 border-t border-[#c9a07a]/40 text-center">
            <div className="text-[11px] tracking-[3px] uppercase text-[#6b4e2e] mb-5">Dietary Requirements</div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[#3d2817]">
              {dietaryLegend.map(d => (
                <span key={d.tag}>
                  <span className="font-semibold">({d.tag})</span> {d.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========= STORY ========= */}
      <section id="story" className="py-24 md:py-32 max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-[11px] tracking-[4px] uppercase text-[#6b4e2e] mb-6 flex items-center gap-3">
          <div className="w-10 h-px bg-[#6b4e2e]" />
          Our Story
        </div>
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              Small batch.<br />
              <span className="italic text-[#6b4e2e]">Big mornings.</span>
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 text-[16px] text-[#3d2817] leading-[1.75] md:pt-3">
            <p>
              We opened in 2018 with a simple idea — make the coffee we wish we could find on every corner,
              and the kind of food you'd make for someone you love.
            </p>
            <p>
              Our beans come from a small roaster in Redfern, roasted every Tuesday. Our pastries are
              baked by hand each morning. And our AI barista, Bean, has been trained on every recipe and
              ingredient — he's here whenever you need a recommendation.
            </p>
          </div>
        </div>
      </section>

      {/* ========= VISIT ========= */}
      <section id="visit" className="bg-[#1c1916] text-[#f4efe6] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[11px] tracking-[4px] uppercase text-[#c8a267] mb-6 flex items-center gap-3">
                <div className="w-10 h-px bg-[#c8a267]" />
                Come Visit
              </div>
              <h2 className="font-serif text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
                Find us<br />
                <span className="italic text-[#c8a267]">on the corner.</span>
              </h2>
              <p className="mt-8 text-[16px] text-[#c9a07a] leading-relaxed max-w-md">
                We're a short walk from Central Station. Pet friendly, free wifi,
                outdoor seating, and always a warm welcome.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(cafeInfo.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#c8a267] text-[#1c1916] px-7 py-3.5 rounded-full font-medium hover:bg-[#f4efe6] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get directions
                </a>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="inline-flex items-center gap-2 border border-[#c9a07a]/40 hover:border-[#c8a267] text-[#f4efe6] px-7 py-3.5 rounded-full font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask Bean
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-t border-[#c9a07a]/30 pt-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#c8a267] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-[11px] tracking-[3px] uppercase text-[#c9a07a] mb-2">Hours</div>
                    <div className="font-serif text-lg">Mon — Fri · {cafeInfo.hours.weekday}</div>
                    <div className="font-serif text-lg">Sat — Sun · {cafeInfo.hours.weekend}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#c9a07a]/30 pt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#c8a267] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-[11px] tracking-[3px] uppercase text-[#c9a07a] mb-2">Address</div>
                    <div className="font-serif text-lg">{cafeInfo.address}</div>
                    <div className="font-serif text-lg text-[#c9a07a]">{cafeInfo.location}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#c9a07a]/30 pt-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#c8a267] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-[11px] tracking-[3px] uppercase text-[#c9a07a] mb-2">Contact</div>
                    <div className="font-serif text-lg">{cafeInfo.phone}</div>
                    <div className="flex items-center gap-1.5 text-[#c9a07a]">
                      <AtSign className="w-4 h-4" /> {cafeInfo.instagram.replace('@', '')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= FOOTER ========= */}
      <footer className="py-14 text-center bg-[#f4efe6]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 bg-[#1c1916] rounded-full flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#c8a267]" />
            </div>
          </div>
          <div className="font-serif text-xl text-[#1c1916] mb-2">Brew &amp; Bite</div>
          <div className="text-[11px] tracking-[3px] uppercase text-[#6b4e2e]">
            Made with ♥ in Sydney · © 2026 all rights reserved
          </div>
        </div>
      </footer>

      {/* ========= FLOATING CHAT BUTTON ========= */}
      <button
        onClick={() => setIsChatOpen(true)}
        aria-label="Chat with Bean"
        className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${
          isChatOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-[#c8a267] animate-soft-pulse" />
          <div className="relative w-[72px] h-[72px] bg-[#1c1916] rounded-full shadow-2xl flex items-center justify-center transition-all group-hover:scale-110 active:scale-95 border-2 border-[#c8a267]">
            <Coffee className="w-8 h-8 text-[#c8a267] group-hover:rotate-12 transition-transform" />
          </div>
          <div className="absolute -top-1 -right-1 bg-[#c8a267] text-[#1c1916] text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full ring-[3px] ring-[#f4efe6] tracking-tighter">
            AI
          </div>
          <div className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-[#1c1916] text-[#f4efe6] text-sm px-4 py-2 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none font-medium">
            Chat with Bean →
          </div>
        </div>
      </button>

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
