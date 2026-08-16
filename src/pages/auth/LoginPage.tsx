import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
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
import { getRememberedEmail } from '@/services/authService'
import { isValidEmail, validateRequired } from '@/utils/validation'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState(getRememberedEmail)
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(!!getRememberedEmail())
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})

  function validate(): boolean {
    const nextErrors: typeof errors = {}

    const emailError = validateRequired(email, 'Email')
    if (emailError) {
      nextErrors.email = emailError
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Please enter a valid email address'
    }

    const passwordError = validateRequired(password, 'Password')
    if (passwordError) {
      nextErrors.password = passwordError
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
      await login(email, password, rememberMe)
      toast({
        type: 'success',
        title: 'Welcome back!',
        description: 'You have signed in successfully.',
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
        title: 'Signed in with Google',
        description: 'Welcome to GnaryLex!',
      })
      navigate('/dashboard', { replace: true })
    } catch {
      toast({
        type: 'error',
        title: 'Sign in failed',
        description: 'Could not sign in with Google. Please try again.',
      })
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Heading level="h1" className="text-2xl lg:text-3xl">
          Welcome back
        </Heading>
        <Text variant="muted" className="mt-2">
          Sign in to continue your vocabulary journey
        </Text>
      </div>

      {errors.form && (
        <div
          className="mb-6 rounded-card border border-error-500/30 bg-error-50 px-4 py-3 text-sm text-error-700 dark:bg-error-900/20 dark:text-error-400"
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

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
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

        <div className="flex items-center justify-between gap-4">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Sign In
        </Button>
      </form>

      <AuthDivider />

      <GoogleSignInButton onClick={handleGoogleSignIn} loading={googleLoading} />

      <p className="mt-8 text-center text-body-sm text-text-secondary dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
