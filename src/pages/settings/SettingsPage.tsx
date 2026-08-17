import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, Lock, Moon, Palette, Sun, User, Monitor, LogOut } from 'lucide-react'
import { Button, Card, Heading, Input, Select, Text, useToast } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { userService } from '@/services/userService'
import type { ThemeMode } from '@/types'

const DAILY_GOAL_OPTIONS = [5, 10, 15, 20, 30, 50].map((n) => ({ value: String(n), label: `${n} words per day` }))
const LEVEL_OPTIONS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l) => ({ value: l, label: l }))
const TOPIC_OPTIONS = ['Business', 'Technology', 'Daily Life', 'Academic', 'Travel', 'Health'].map((t) => ({ value: t, label: t }))

interface SectionProps { title: string; icon: React.ElementType; children: React.ReactNode }

function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <Card padding="lg">
      <div className="mb-5 flex items-center gap-3 border-b border-border pb-4 dark:border-border-dark">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <Heading level="h3">{title}</Heading>
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const [name, setName] = useState(user?.fullName ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [dailyGoal, setDailyGoal] = useState(String(user?.dailyGoal ?? 20))
  const [level, setLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">(user?.level ?? 'B1')
  const [topic, setTopic] = useState(user?.preferredTopics?.[0] ?? 'Business')
  const [notifications, setNotifications] = useState({ daily: true, review: true, achievement: true })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function loadSettings() {
      const settings = await userService.getSettings()
      if (cancelled || !settings) return
      if (settings.dailyGoal) setDailyGoal(String(settings.dailyGoal))
      if (settings.level) setLevel(settings.level)
      if (settings.preferredTopics?.[0]) setTopic(settings.preferredTopics[0])
      if (settings.theme && settings.theme !== theme) setTheme(settings.theme as ThemeMode)
      setNotifications((prev) => ({ ...prev, daily: Boolean(settings.notifications) }))
    }
    loadSettings()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await Promise.all([
        userService.updateProfile({ fullName: name, dailyGoal: Number(dailyGoal) }),
        userService.updateSettings({
          dailyGoal: Number(dailyGoal),
          preferredTopics: [topic],
          theme,
          notifications: notifications.daily,
        }),
      ])
      toast({ type: 'success', title: 'Settings saved', description: 'Your preferences have been updated.' })
    } catch {
      toast({ type: 'error', title: 'Save failed', description: 'Something went wrong while saving your settings.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast({ type: 'success', title: 'Signed out', description: 'You have been successfully signed out.' })
    navigate('/login', { replace: true })
  }

  const THEME_OPTIONS: { value: ThemeMode; label: string; icon: React.ElementType }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-2xl space-y-6"
    >
      <header>
        <Heading level="h1">Settings</Heading>
        <Text variant="body-sm" className="mt-1">Manage your account and preferences.</Text>
      </header>

      <Section title="Account" icon={User}>
        <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button variant="outline" size="sm" leftIcon={<Lock className="h-4 w-4" />}>
          Change Password
        </Button>
      </Section>

      <Section title="Learning" icon={Bell}>
        <Select
          label="English Level"
          value={level}
          options={LEVEL_OPTIONS}
          onChange={(e) => setLevel(e.target.value as "A1" | "A2" | "B1" | "B2" | "C1" | "C2")}
        />
        <Select
          label="Daily Goal"
          value={dailyGoal}
          options={DAILY_GOAL_OPTIONS}
          onChange={(e) => setDailyGoal(e.target.value)}
        />
        <Select
          label="Preferred Topic"
          value={topic}
          options={TOPIC_OPTIONS}
          onChange={(e) => setTopic(e.target.value)}
        />
      </Section>

      <Section title="Notifications" icon={Bell}>
        {[
          { key: 'daily', label: 'Daily Reminder', desc: 'Remind me to study every day' },
          { key: 'review', label: 'Review Reminder', desc: 'Notify when words are ready for review' },
          { key: 'achievement', label: 'Achievement Alerts', desc: 'Celebrate when you unlock achievements' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-border-dark">
            <div>
              <p className="font-medium text-text-primary dark:text-slate-100">{item.label}</p>
              <p className="text-body-sm text-text-secondary dark:text-slate-400">{item.desc}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications[item.key as keyof typeof notifications]}
              onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                notifications[item.key as keyof typeof notifications]
                  ? 'bg-primary-600'
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        ))}
      </Section>

      <Section title="Appearance" icon={Palette}>
        <div>
          <p className="mb-3 text-body-sm font-medium text-text-primary dark:text-slate-100">Theme</p>
          <div className="grid grid-cols-3 gap-3">
            {THEME_OPTIONS.map((opt) => {
              const Icon = opt.icon
              const isActive = theme === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTheme(opt.value)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                    isActive
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-500 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'border-border text-text-secondary hover:border-primary-300 dark:border-border-dark dark:text-slate-400'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="text-body-sm font-medium">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Section>

      <Section title="Account Security" icon={Lock}>
        <div className="space-y-3">
          <p className="text-body-sm text-text-secondary dark:text-slate-400">
            Sign out from this device and all sessions.
          </p>
          <Button 
            variant="danger" 
            size="md" 
            leftIcon={<LogOut className="h-4 w-4" />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </Section>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </motion.div>
  )
}
