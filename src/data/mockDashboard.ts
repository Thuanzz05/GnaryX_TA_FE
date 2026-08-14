import type {
  ContinueLearning,
  DashboardStat,
  LearningActivity,
  LearningPlanItem,
  LearningProgress,
  DailyGoal,
} from '@/types'
import { WORD_OF_THE_DAY } from './mockVocabulary'

export const MOCK_PROGRESS: LearningProgress = {
  totalWords: 1248,
  wordsThisWeek: 86,
  wordsThisMonth: 312,
  currentStreak: 7,
  longestStreak: 14,
  totalStudyTimeMinutes: 1122,
  xp: 4250,
  level: 12,
}

export const MOCK_DAILY_GOAL: DailyGoal = {
  target: 20,
  completed: 12,
  xpEarnedToday: 120,
}

export const MOCK_DASHBOARD_STATS: DashboardStat[] = [
  {
    id: 'words-learned',
    label: 'Words Learned',
    value: '1,248',
    icon: 'book',
    trend: { value: '+12% this week', direction: 'up' },
  },
  {
    id: 'review-today',
    label: 'Review Today',
    value: '24',
    icon: 'refresh',
    trend: { value: '8 due soon', direction: 'neutral' },
  },
  {
    id: 'current-streak',
    label: 'Current Streak',
    value: '🔥 7 days',
    icon: 'flame',
    trend: { value: 'Personal best: 14', direction: 'up' },
  },
  {
    id: 'study-time',
    label: 'Study Time',
    value: '18h 42m',
    icon: 'clock',
    trend: { value: '+2h this week', direction: 'up' },
  },
]

export const MOCK_CONTINUE_LEARNING: ContinueLearning = {
  courseId: 'business-english',
  courseTitle: 'Business English',
  lessonNumber: 4,
  lessonTitle: 'Communication',
  progress: 65,
  wordsCompleted: 24,
  wordsTotal: 40,
  color: '#6366f1',
}

export const MOCK_LEARNING_PLAN: LearningPlanItem[] = [
  {
    id: 'plan-1',
    title: 'Learn 10 new words',
    description: 'Expand your vocabulary with today\'s curated word set',
    icon: 'book-open',
    completed: true,
    actionLabel: 'Review',
    actionHref: '/vocabulary',
  },
  {
    id: 'plan-2',
    title: 'Review 15 words',
    description: 'Strengthen memory with spaced repetition review',
    icon: 'refresh-cw',
    completed: false,
    actionLabel: 'Start',
    actionHref: '/review',
  },
  {
    id: 'plan-3',
    title: 'Complete vocabulary quiz',
    description: 'Test your knowledge with a quick 10-question quiz',
    icon: 'clipboard-check',
    completed: false,
    actionLabel: 'Take Quiz',
    actionHref: '/quiz',
  },
  {
    id: 'plan-4',
    title: 'Practice difficult words',
    description: 'Focus on words you struggle with most',
    icon: 'target',
    completed: false,
    actionLabel: 'Practice',
    actionHref: '/practice',
  },
]

export const MOCK_RECENT_ACTIVITY: LearningActivity[] = [
  {
    id: 'act-1',
    type: 'learn',
    description: 'Learned 15 new words',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    xpEarned: 75,
  },
  {
    id: 'act-2',
    type: 'lesson',
    description: 'Completed Business English Lesson 3',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    xpEarned: 50,
  },
  {
    id: 'act-3',
    type: 'flashcard',
    description: 'Reviewed 20 flashcards',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    xpEarned: 40,
  },
  {
    id: 'act-4',
    type: 'quiz',
    description: 'Scored 90% on Vocabulary Quiz',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    xpEarned: 90,
  },
  {
    id: 'act-5',
    type: 'streak',
    description: 'Achieved a 7-day streak',
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    xpEarned: 20,
  },
]

export { WORD_OF_THE_DAY }
