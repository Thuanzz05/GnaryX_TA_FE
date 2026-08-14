import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { Button, Heading, Input, Text, useToast } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { isValidEmail, validateRequired } from '@/utils/validation'

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; form?: string }>({})

  function validate(): boolean {
    const nextErrors: typeof errors = {}

    const emailError = validateRequired(email, 'Email')
    if (emailError) {
      nextErrors.email = emailError
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Please enter a valid email address'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setErrors({})

    try {
      await forgotPassword(email)
      setSubmitted(true)
      toast({
        type: 'success',
        title: 'Reset link sent',
        description: 'Check your email for password reset instructions.',
      })
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-50 dark:bg-success-900/20">
          <CheckCircle2 className="h-8 w-8 text-success-600 dark:text-success-500" />
        </div>
        <Heading level="h1" className="text-2xl lg:text-3xl">
          Check your email
        </Heading>
        <Text variant="muted" className="mt-3">
          We sent a password reset link to{' '}
          <span className="font-medium text-text-primary dark:text-slate-200">{email}</span>.
          The link will expire in 24 hours.
        </Text>
        <div className="mt-8 space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              setSubmitted(false)
              setEmail('')
            }}
          >
            Try a different email
          </Button>
          <Link to="/login" className="block">
            <Button variant="ghost" fullWidth leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/login"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Sign In
      </Link>

      <div className="mb-8">
        <Heading level="h1" className="text-2xl lg:text-3xl">
          Reset your password
        </Heading>
        <Text variant="muted" className="mt-2">
          Enter your email address and we&apos;ll send you a password reset link.
        </Text>
      </div>

      {errors.form && (
        <div
          className="mb-6 rounded-[var(--radius-card)] border border-error-500/30 bg-error-50 px-4 py-3 text-sm text-error-700 dark:bg-error-900/20 dark:text-error-400"
          role="alert"
        >
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Send Reset Link
        </Button>
      </form>
    </div>
  )
}
