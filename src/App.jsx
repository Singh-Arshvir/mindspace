import { useState } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdaqlzrz'

const psychologists = [
  {
    id: 1,
    name: 'Dr. Ananya Mehta',
    role: 'Clinical Psychologist',
    specialty: 'Anxiety • Stress • Depression',
    experience: '8+ years experience',
    price: 999,
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85',
    bg: 'bg-[#f7c6b5]',
  },
  {
    id: 2,
    name: 'Dr. Rohan Kapoor',
    role: 'Counselling Psychologist',
    specialty: 'Relationships • Personal Growth',
    experience: '6+ years experience',
    price: 799,
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85',
    bg: 'bg-[#d9e7b5]',
  },
  {
    id: 3,
    name: 'Dr. Simran Kaur',
    role: 'Child Psychologist',
    specialty: 'Students • Confidence • Focus',
    experience: '7+ years experience',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85',
    bg: 'bg-[#d9c8f5]',
  },
]

const services = [
  {
    number: '01',
    title: 'Anxiety & Stress',
    icon: '〰',
    text: 'Understand your thoughts, manage overwhelming emotions, and feel more in control.',
  },
  {
    number: '02',
    title: 'Relationships',
    icon: '♡',
    text: 'Build healthier communication and create stronger emotional connections.',
  },
  {
    number: '03',
    title: 'Personal Growth',
    icon: '✦',
    text: 'Move forward with clarity, confidence, and a better understanding of yourself.',
  },
  {
    number: '04',
    title: 'Student Support',
    icon: '↗',
    text: 'Navigate academic pressure, focus, confidence, and growing up.',
  },
]

const faqs = [
  {
    question: 'How does online consultation work?',
    answer:
      'Choose a psychologist, select a suitable time, complete your booking, and join your private online consultation.',
  },
  {
    question: 'Are my sessions private?',
    answer:
      'Your consultation is designed to be a private and confidential space between you and your psychologist.',
  },
  {
    question: 'Can I choose my psychologist?',
    answer:
      'Yes. You can explore different psychologists and choose one based on your needs and preferences.',
  },
  {
    question: 'Can I reschedule my appointment?',
    answer:
      'You can contact the support team regarding appointment rescheduling according to the applicable policy.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [selectedPsychologist, setSelectedPsychologist] = useState(null)

  const [activeFaq, setActiveFaq] = useState(null)

  const [booking, setBooking] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  })

  const [loading, setLoading] = useState(false)

  const [bookingSuccess, setBookingSuccess] = useState(false)

  const openBooking = (psychologist) => {
    setSelectedPsychologist(psychologist)

    setBookingSuccess(false)

    setBooking({
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
    })
  }

  const closeBooking = () => {
    setSelectedPsychologist(null)

    setBookingSuccess(false)
  }

  const handleChange = (event) => {
    setBooking({
      ...booking,
      [event.target.name]: event.target.value,
    })
  }

  const handleBooking = async (event) => {
    event.preventDefault()

    if (
      !booking.date ||
      !booking.time ||
      !booking.name ||
      !booking.email ||
      !booking.phone
    ) {
      alert('Please fill all appointment details.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        body: JSON.stringify({
          subject: `New Appointment Booking - ${booking.name}`,

          psychologist: selectedPsychologist.name,

          psychologist_role: selectedPsychologist.role,

          appointment_date: booking.date,

          appointment_time: booking.time,

          patient_name: booking.name,

          patient_email: booking.email,

          patient_phone: booking.phone,

          consultation_fee: `₹${selectedPsychologist.price}`,

          message: `New consultation booking with ${selectedPsychologist.name}`,
        }),
      })

      if (response.ok) {
        setBookingSuccess(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)

      alert('Unable to submit appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f4ec] text-[#202d2b]">
      {/* NAVBAR */}

      <nav className="sticky top-0 z-40 border-b border-[#202d2b]/10 bg-[#f8f4ec]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 rotate-[-8deg] items-center justify-center rounded-[45%] bg-[#202d2b] text-2xl text-[#f7c6b5]">
              ✦
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-[-0.08em]">
                mind<span className="text-[#e76f51]">space</span>
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em]">
                mental wellness
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 font-semibold md:flex">
            <a href="#how-it-works" className="transition hover:text-[#e76f51]">
              How it works
            </a>

            <a href="#services" className="transition hover:text-[#e76f51]">
              Support
            </a>

            <a href="#specialists" className="transition hover:text-[#e76f51]">
              Specialists
            </a>

            <a href="#faq" className="transition hover:text-[#e76f51]">
              FAQ
            </a>
          </div>

          <a
            href="#specialists"
            className="hidden rounded-full bg-[#e76f51] px-6 py-3 font-black text-white transition hover:-translate-y-1 md:block"
          >
            Book a session →
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl md:hidden"
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#202d2b]/10 px-5 py-6 md:hidden">
            <div className="flex flex-col gap-5 font-bold">
              <a href="#how-it-works">How it works</a>

              <a href="#services">Support</a>

              <a href="#specialists">Specialists</a>

              <a href="#faq">FAQ</a>

              <a
                href="#specialists"
                className="rounded-full bg-[#e76f51] px-5 py-3 text-center text-white"
              >
                Book a session →
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}

      <section id="home" className="relative px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-7 inline-block rotate-[-3deg] rounded-full border-2 border-[#202d2b] bg-[#f7c6b5] px-5 py-3 font-black">
              ✦ A little support can change a lot
            </div>

            <h2 className="text-[4.5rem] font-black leading-[0.82] tracking-[-0.09em] sm:text-7xl lg:text-[8rem]">
              Make
              <br />
              room
              <br />
              <span className="text-[#e76f51]">for your mind.</span>
            </h2>

            <p className="mt-9 max-w-xl text-lg leading-8 text-[#202d2b]/65">
              A safe, simple space to talk to qualified psychologists, feel
              understood, and take the next step at your own pace.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#specialists"
                className="rounded-full bg-[#202d2b] px-7 py-4 text-center font-black text-white transition hover:-translate-y-1"
              >
                Find your psychologist →
              </a>

              <a
                href="#how-it-works"
                className="rounded-full border-2 border-[#202d2b] px-7 py-4 text-center font-black transition hover:bg-[#202d2b] hover:text-white"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-3 -top-10 z-10 flex h-32 w-32 rotate-12 items-center justify-center rounded-[42%] bg-[#d9e7b5] text-center text-sm font-black">
              You do not
              <br />
              have to do it
              <br />
              alone ✦
            </div>

            <div className="rounded-[4rem] bg-[#d9c8f5] p-5">
              <div className="overflow-hidden rounded-[3rem]">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85"
                  alt="Psychologist"
                  className="h-[520px] w-full object-cover lg:h-[650px]"
                />
              </div>

              <div className="absolute bottom-8 left-8 rounded-3xl bg-[#f8f4ec] p-5 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" />

                  <span className="font-black">Support is available</span>
                </div>

                <p className="mt-2 text-sm text-[#202d2b]/60">
                  Start with one conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}

      <div className="rotate-[-1deg] border-y-2 border-[#202d2b] bg-[#e76f51] py-6">
        <div className="flex min-w-max gap-12 whitespace-nowrap text-2xl font-black uppercase text-white">
          <span>Talk it out ✦</span>
          <span>Feel understood ✦</span>
          <span>Take your time ✦</span>
          <span>Talk it out ✦</span>
          <span>Feel understood ✦</span>
        </div>
      </div>

      {/* HOW IT WORKS */}

      <section id="how-it-works" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-black uppercase tracking-[0.2em] text-[#e76f51]">
            Simple by design
          </p>

          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-8xl">
            Getting support
            <br />
            should feel easy.
          </h2>

          <div className="mt-16 grid gap-5 md:grid-cols-4">
            {[
              [
                '01',
                'Choose',
                'Find a psychologist who feels right for you.',
                'bg-[#d9e7b5]',
              ],
              [
                '02',
                'Book',
                'Pick a date and time that works for your life.',
                'bg-[#f7c6b5]',
              ],
              [
                '03',
                'Connect',
                'Join your private online consultation.',
                'bg-[#d9c8f5]',
              ],
              [
                '04',
                'Grow',
                'Keep moving forward, one conversation at a time.',
                'bg-[#f6df9b]',
              ],
            ].map(([number, title, text, background]) => (
              <div
                key={number}
                className={`rounded-[2.5rem] ${background} p-7 transition hover:-translate-y-2`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-black">{number}</span>

                  <span className="text-4xl">✦</span>
                </div>

                <div className="mt-20">
                  <h3 className="text-3xl font-black">{title}</h3>

                  <p className="mt-4 leading-7 text-[#202d2b]/65">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section
        id="services"
        className="bg-[#202d2b] px-5 py-24 text-[#f8f4ec] lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-[#f7c6b5]">
                What we can help with
              </p>

              <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-8xl">
                Whatever is
                <br />
                on your mind.
              </h2>

              <p className="mt-8 max-w-md text-lg leading-8 text-white/55">
                You do not need to have everything figured out before asking for
                support.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.number}
                  className="rounded-[2.5rem] border border-white/15 p-7 transition hover:-translate-y-2 hover:bg-white/10"
                >
                  <div className="flex justify-between">
                    <span className="font-black text-white/50">
                      {service.number}
                    </span>

                    <span className="text-5xl text-[#f7c6b5]">
                      {service.icon}
                    </span>
                  </div>

                  <h3 className="mt-16 text-2xl font-black">{service.title}</h3>

                  <p className="mt-4 leading-7 text-white/55">{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PSYCHOLOGISTS */}

      <section id="specialists" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-black uppercase tracking-[0.2em] text-[#e76f51]">
            Meet your support team
          </p>

          <h2 className="mt-6 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-8xl">
            Good support
            <br />
            starts with connection.
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {psychologists.map((psychologist) => (
              <div
                key={psychologist.id}
                className={`overflow-hidden rounded-[3rem] ${psychologist.bg}`}
              >
                <div className="h-[380px] overflow-hidden">
                  <img
                    src={psychologist.image}
                    alt={psychologist.name}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <p className="text-sm font-bold opacity-60">
                    {psychologist.role}
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    {psychologist.name}
                  </h3>

                  <p className="mt-3 text-sm font-semibold opacity-70">
                    {psychologist.specialty}
                  </p>

                  <div className="mt-7 flex items-center justify-between border-t border-[#202d2b]/15 pt-5">
                    <div>
                      <p className="text-sm font-bold">
                        {psychologist.experience}
                      </p>

                      <p className="mt-1 text-xl font-black">
                        ₹{psychologist.price}
                      </p>
                    </div>

                    <button
                      onClick={() => openBooking(psychologist)}
                      className="rounded-full bg-[#202d2b] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e76f51]"
                    >
                      Book appointment →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LARGE CTA */}

      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[4rem] bg-[#f6df9b] px-8 py-16 text-center md:px-20 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-7 text-6xl">☺ ✦ ♡</div>

            <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-8xl">
              One conversation
              <br />
              can be a beginning.
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#202d2b]/65">
              You do not need to solve everything today. You just need to take
              the first step.
            </p>

            <a
              href="#specialists"
              className="mt-9 inline-block rounded-full bg-[#202d2b] px-8 py-4 font-black text-white transition hover:-translate-y-1"
            >
              Find your psychologist →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section id="faq" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-black uppercase tracking-[0.2em] text-[#e76f51]">
            Questions, answered
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-8xl">
            Wondering
            <br />
            about something?
          </h2>

          <div className="mt-14">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="border-b border-[#202d2b]/20">
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between py-7 text-left"
                >
                  <span className="text-lg font-black md:text-xl">
                    {faq.question}
                  </span>

                  <span className="text-3xl">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>

                {activeFaq === index && (
                  <p className="max-w-3xl pb-7 leading-8 text-[#202d2b]/60">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#202d2b] px-5 py-16 text-[#f8f4ec] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.08em]">
                mind<span className="text-[#e76f51]">space</span>
              </h2>

              <p className="mt-4 max-w-sm leading-7 text-white/55">
                A softer, simpler way to connect with mental health
                professionals.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 font-bold text-white/70">
              <a href="#home">Home</a>

              <a href="#services">Support</a>

              <a href="#specialists">Specialists</a>

              <a href="#faq">FAQ</a>
            </div>
          </div>

          <div className="mt-14 border-t border-white/15 pt-6 text-sm text-white/40">
            © 2026 Mindspace. Your wellbeing matters.
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}

      {selectedPsychologist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#202d2b]/80 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-[2.5rem] bg-[#f8f4ec] p-7 md:p-9">
            {!bookingSuccess ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-black uppercase tracking-[0.2em] text-[#e76f51]">
                      Book your session
                    </p>

                    <h2 className="mt-3 text-3xl font-black">
                      {selectedPsychologist.name}
                    </h2>

                    <p className="mt-2 text-[#202d2b]/60">
                      {selectedPsychologist.role}
                    </p>
                  </div>

                  <button
                    onClick={closeBooking}
                    className="text-4xl font-light"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 rounded-3xl bg-[#f7c6b5] p-5">
                  <div className="flex justify-between">
                    <span className="font-bold">Consultation fee</span>

                    <span className="text-xl font-black">
                      ₹{selectedPsychologist.price}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleBooking} className="mt-7 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-black">
                      Choose date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={booking.date}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-[#202d2b]/15 bg-white px-4 py-4 outline-none focus:border-[#e76f51]"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black">
                      Choose time
                    </label>

                    <select
                      name="time"
                      value={booking.time}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-[#202d2b]/15 bg-white px-4 py-4 outline-none"
                      required
                    >
                      <option value="">Select a time</option>

                      <option>10:00 AM</option>

                      <option>12:00 PM</option>

                      <option>03:00 PM</option>

                      <option>06:00 PM</option>

                      <option>08:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black">
                      Full name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={booking.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-[#202d2b]/15 bg-white px-4 py-4 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black">
                      Email address
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={booking.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-[#202d2b]/15 bg-white px-4 py-4 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black">
                      Phone number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={booking.phone}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-[#202d2b]/15 bg-white px-4 py-4 outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#e76f51] px-5 py-4 font-black text-white transition hover:bg-[#d85e42] disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Book appointment →'}
                  </button>

                  <p className="text-center text-xs text-[#202d2b]/50">
                    Your appointment details will be securely sent to our team.
                  </p>
                </form>
              </>
            ) : (
              <div className="rounded-3xl bg-[#d9e7b5] p-7">
                <div className="text-6xl">✓</div>

                <h2 className="mt-5 text-4xl font-black">You're booked!</h2>

                <p className="mt-4 leading-7">
                  Your appointment request has been successfully submitted. Our
                  team will contact you shortly to confirm your session.
                </p>

                <div className="mt-7 space-y-4 rounded-3xl bg-white/60 p-6">
                  <div>
                    <p className="text-sm font-bold opacity-60">Psychologist</p>

                    <p className="font-black">{selectedPsychologist.name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold opacity-60">Appointment</p>

                    <p className="font-black">
                      {booking.date} • {booking.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold opacity-60">Patient</p>

                    <p className="font-black">{booking.name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold opacity-60">Email</p>

                    <p className="break-all font-black">{booking.email}</p>
                  </div>
                </div>

                <button
                  onClick={closeBooking}
                  className="mt-7 w-full rounded-full bg-[#202d2b] px-5 py-4 font-black text-white"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
