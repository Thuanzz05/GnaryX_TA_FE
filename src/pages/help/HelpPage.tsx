import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  LifeBuoy,
  Mail,
  MessageCircle,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Button, Card, Heading, Text } from '@/components/common'

interface FAQ { q: string; a: string }

const FAQS: FAQ[] = [
  {
    q: 'How does spaced repetition work?',
    a: 'Spaced repetition shows you words at increasing intervals. Words you find easy appear less often; words you find hard appear more frequently. This maximizes long-term retention with minimal study time.',
  },
  {
    q: 'How do I earn XP?',
    a: 'You earn XP by learning new words (+5 XP each), completing quizzes (+10 XP per correct answer), finishing lessons (+50 XP), and maintaining daily streaks (+20 XP bonus).',
  },
  {
    q: 'What do the CEFR levels mean?',
    a: 'CEFR levels range from A1 (beginner) to C2 (mastery). A1–A2 covers everyday basics, B1–B2 is intermediate, and C1–C2 represents advanced and near-native proficiency.',
  },
  {
    q: 'How do I set my daily goal?',
    a: 'Go to Settings → Learning and choose your preferred number of words per day. The default is 20 words. You can change this anytime without losing your progress.',
  },
  {
    q: 'Can I use GnaryLex on mobile?',
    a: 'Yes! GnaryLex is fully responsive. Use the bottom navigation bar on mobile or the hamburger menu on tablet. Flashcards and quizzes are optimized for touch.',
  },
  {
    q: 'How does the pronunciation feature work?',
    a: 'GnaryLex uses your browser\'s built-in Speech Synthesis API for pronunciation. Click the 🔊 button on any word to hear it spoken in English. A real audio API can be integrated in the future.',
  },
]

const QUICK_LINKS = [
  { icon: BookOpen, label: 'Vocabulary', to: '/vocabulary', desc: 'Browse and search words' },
  { icon: Sparkles, label: 'Flashcards', to: '/flashcards', desc: 'Study with smart cards' },
  { icon: GraduationCap, label: 'Learn', to: '/learn', desc: 'Structured courses' },
  { icon: Zap, label: 'Quiz', to: '/quiz', desc: 'Test your knowledge' },
]

function FAQItem({ faq, defaultOpen = false }: { faq: FAQ; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border last:border-0 dark:border-border-dark">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-medium text-text-primary dark:text-slate-100">{faq.q}</span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-text-muted transition-transform dark:text-slate-400 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-body-sm text-text-secondary dark:text-slate-400">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HelpPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl space-y-8"
    >
      <header className="space-y-2">
        <Heading level="h1">Help & Support</Heading>
        <Text variant="body-sm">Everything you need to make the most of GnaryLex.</Text>
      </header>

      {/* Quick links */}
      <section>
        <Heading level="h3" className="mb-4">Quick Navigation</Heading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link to={item.to}>
                  <Card
                    className="flex flex-col items-center gap-3 text-center transition-shadow hover:shadow-md cursor-pointer"
                    padding="md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary dark:text-slate-100">{item.label}</p>
                      <p className="text-caption text-text-muted dark:text-slate-500">{item.desc}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Getting started */}
      <section>
        <Card padding="lg">
          <Heading level="h3" className="mb-4">Getting Started</Heading>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Choose your level', desc: 'Go to Settings and set your CEFR level so GnaryLex recommends the right words for you.' },
              { step: '2', title: 'Set a daily goal', desc: 'Pick how many words you want to learn each day. Start with 10–20 words for sustainable progress.' },
              { step: '3', title: 'Start a course', desc: 'Head to the Learn page and pick a course that matches your goals — business, travel, IELTS, and more.' },
              { step: '4', title: 'Review daily', desc: 'Visit the Review page each day to practice due words using spaced repetition.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-400">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-text-primary dark:text-slate-100">{item.title}</p>
                  <p className="text-body-sm text-text-secondary dark:text-slate-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      {/* FAQ */}
      <section>
        <Heading level="h3" className="mb-4">Frequently Asked Questions</Heading>
        <Card padding="lg">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} defaultOpen={i === 0} />
          ))}
        </Card>
      </section>

      {/* Contact */}
      <Card
        className="bg-linear-to-br from-primary-50 to-white dark:from-primary-950/30 dark:to-surface-card-dark"
        padding="lg"
      >
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
            <LifeBuoy className="h-7 w-7 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <Heading level="h3">Still need help?</Heading>
            <Text variant="muted" className="mt-1">
              Reach out and we'll get back to you as soon as possible.
            </Text>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<MessageCircle className="h-4 w-4" />}
            >
              Live Chat
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Mail className="h-4 w-4" />}
            >
              Email Us
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
