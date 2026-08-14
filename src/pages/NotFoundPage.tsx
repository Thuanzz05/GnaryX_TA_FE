import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Home } from 'lucide-react'
import { Button } from '@/components/common'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-6 dark:bg-surface-dark">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Illustration */}
        <div className="relative mx-auto w-48 h-48">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-full w-full items-center justify-center rounded-3xl bg-primary-100 dark:bg-primary-900/30"
          >
            <BookOpen
              className="h-20 w-20 text-primary-400 dark:text-primary-500"
              aria-hidden="true"
            />
          </motion.div>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-error-100 text-xl font-bold text-error-600 dark:bg-error-900/40 dark:text-error-400"
            aria-hidden="true"
          >
            ?
          </motion.span>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-8xl font-extrabold tracking-tight text-primary-600 dark:text-primary-400">
            404
          </h1>
          <h2 className="text-heading-2 text-text-primary dark:text-slate-100">
            Page not found
          </h2>
          <p className="text-body text-text-secondary dark:text-slate-400">
            Looks like this page went on vacation. Let&apos;s get you back to learning.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Link to="/dashboard">
            <Button leftIcon={<Home className="h-4 w-4" />}>
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-border pt-6 dark:border-border-dark">
          <p className="mb-3 text-body-sm text-text-muted dark:text-slate-500">
            Or jump to a page:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { to: '/vocabulary', label: 'Vocabulary' },
              { to: '/learn', label: 'Learn' },
              { to: '/flashcards', label: 'Flashcards' },
              { to: '/quiz', label: 'Quiz' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full border border-border px-4 py-1.5 text-body-sm font-medium text-text-secondary transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-border-dark dark:text-slate-400 dark:hover:text-primary-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
