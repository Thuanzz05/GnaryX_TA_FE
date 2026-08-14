import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  Volume2,
} from 'lucide-react'
import { BRAND } from '@/constants/brand'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Heading,
  Input,
  Logo,
  Modal,
  Select,
  Text,
  Textarea,
  useToast,
} from '@/components/common'

export default function DesignSystemPage() {
  const { toast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  const handleValidateEmail = () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
      toast({ type: 'success', title: 'Valid email!', description: email })
    }
  }

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-surface-muted px-4 py-10 dark:bg-surface-dark">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <Badge variant="primary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" />
              Phase 2 Complete
            </Badge>
            <Logo size="lg" />
            <Text variant="muted" className="mt-2">
              Global Design System — {BRAND.description}
            </Text>
          </div>
          <Button
            variant="outline"
            leftIcon={isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            onClick={toggleTheme}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </motion.div>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Heading and text scale for the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Heading level="display">Display — Learn vocabulary daily</Heading>
            <Heading level="h1">Heading 1 — Dashboard</Heading>
            <Heading level="h2">Heading 2 — Section title</Heading>
            <Heading level="h3">Heading 3 — Card title</Heading>
            <Text>Body text — Explore and master thousands of English words.</Text>
            <Text variant="body-sm">Body small — Secondary information text.</Text>
            <Text variant="caption">Caption — Labels and metadata</Text>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Variants, sizes, and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                leftIcon={<Volume2 className="h-4 w-4" />}
                variant="outline"
              >
                Listen
              </Button>
              <Button
                leftIcon={<Heart className="h-4 w-4" />}
                variant="primary"
              >
                Favorite
              </Button>
              <Button loading={loading} onClick={simulateLoading}>
                {loading ? 'Saving...' : 'Save Settings'}
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status and level indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="primary">B1</Badge>
              <Badge variant="secondary">IELTS</Badge>
              <Badge variant="success" dot>
                Learned
              </Badge>
              <Badge variant="warning">Review</Badge>
              <Badge variant="error">Difficult</Badge>
              <Badge variant="outline">noun</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Form controls with validation states</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              required
            />
            <Input
              label="Search"
              placeholder="Search for a word..."
              leftIcon={<Search className="h-4 w-4" />}
              helperText="Try typing 'ab' for suggestions"
            />
            <Select
              label="English Level"
              options={[
                { value: 'a1', label: 'A1 — Beginner' },
                { value: 'b1', label: 'B1 — Intermediate' },
                { value: 'c1', label: 'C1 — Advanced' },
              ]}
            />
            <Textarea
              label="Notes"
              placeholder="Add your learning notes..."
              helperText="Optional personal notes"
            />
            <div className="sm:col-span-2">
              <Checkbox
                label="I agree to the Terms of Service"
                description="Required to create an account"
              />
            </div>
            <div className="sm:col-span-2">
              <Button onClick={handleValidateEmail}>Validate Email</Button>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card variant="default" hoverable>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card with border</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="body-sm">Words learned: 1,248</Text>
            </CardContent>
          </Card>
          <Card variant="elevated" hoverable>
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Shadow emphasis</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="body-sm">Current streak: 7 days</Text>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Bordered Card</CardTitle>
              <CardDescription>Strong border variant</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm" fullWidth>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Modal & Toast */}
        <Card>
          <CardHeader>
            <CardTitle>Modal & Toast</CardTitle>
            <CardDescription>Interactive feedback components</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  type: 'success',
                  title: 'Word added to favorites.',
                })
              }
            >
              Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  type: 'info',
                  title: 'Daily goal completed!',
                  description: '+120 XP earned today',
                })
              }
            >
              Info Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  type: 'warning',
                  title: '20 words are ready for review.',
                })
              }
            >
              Warning Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  type: 'error',
                  title: 'Something went wrong.',
                  description: 'Please try again.',
                })
              }
            >
              Error Toast
            </Button>
          </CardContent>
        </Card>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Mark as Learned"
          description="This word will be added to your learned vocabulary."
          footer={
            <>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false)
                  toast({ type: 'success', title: 'Marked as learned' })
                }}
              >
                Confirm
              </Button>
            </>
          }
        >
          <Text variant="body-sm">
            Are you sure you want to mark <strong>resilient</strong> as learned?
          </Text>
        </Modal>

        <Text variant="caption" className="text-center block">
          Phase 3 — Layout (Sidebar, Header, Navigation) coming next.
        </Text>
      </div>
    </div>
  )
}
