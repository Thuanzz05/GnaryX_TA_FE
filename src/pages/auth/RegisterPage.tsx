import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Text,
  useToast,
} from '@/components/common'
import { AuthDivider, GoogleSignInButton } from '@/components/auth'
import { useAuth } from '@/hooks/useAuth'
import { isValidEmail, validatePassword, validateRequired } from '@/utils/validation'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loginWithGoogle } = useAuth()
  const { toast } = useToast()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string
    form?: string
  }>({})

  function validate(): boolean {
    const nextErrors: typeof errors = {}

    const nameError = validateRequired(fullName, 'Full name')
    if (nameError) nextErrors.fullName = nameError

    const emailError = validateRequired(email, 'Email')
    if (emailError) {
      nextErrors.email = emailError
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Please enter a valid email address'
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      nextErrors.password = passwordError
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    if (!agreedToTerms) {
      nextErrors.terms = 'You must agree to the Terms of Service and Privacy Policy'
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
      await register({ fullName, email, password })
      toast({
        type: 'success',
        title: 'Account created!',
        description: 'Welcome to GnaryLex. Start learning today.',
      })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setErrors({ form: message })
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
      toast({
        type: 'success',
        title: 'Account ready',
        description: 'Signed in with Google successfully.',
      })
      navigate('/dashboard', { replace: true })
    } catch {
      toast({
        type: 'error',
        title: 'Sign up failed',
        description: 'Could not continue with Google. Please try again.',
      })
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Heading level="h1" className="text-2xl lg:text-3xl">
          Create your account
        </Heading>
        <Text variant="muted" className="mt-2">
          Join thousands of learners mastering English vocabulary
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
          label="Full Name"
          type="text"
          name="fullName"
          autoComplete="name"
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          leftIcon={<User className="h-4 w-4" />}
          required
        />

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

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={!errors.password ? 'Must be at least 8 characters' : undefined}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="rounded p-0.5 transition-colors hover:text-text-primary dark:hover:text-white"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          required
        />

        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="rounded p-0.5 transition-colors hover:text-text-primary dark:hover:text-white"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          required
        />

        <div>
          <Checkbox
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            label={
              <span>
                I agree to the{' '}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </a>
              </span>
            }
          />
          {errors.terms && (
            <p className="mt-1.5 text-caption text-error-600 dark:text-error-500" role="alert">
              {errors.terms}
            </p>
          )}
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Create Account
        </Button>
      </form>

      <AuthDivider />

      <GoogleSignInButton onClick={handleGoogleSignIn} loading={googleLoading} />

      <p className="mt-8 text-center text-body-sm text-text-secondary dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}
