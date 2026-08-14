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

import type { Achievement } from '@/types'

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1',  title: 'First Steps',      description: 'Learned your first 10 words',          icon: '🌱', unlocked: true,  unlockedAt: '2026-07-10', xpReward: 50  },
  { id: 'ach-2',  title: '7-Day Streak',      description: 'Studied 7 days in a row',              icon: '🔥', unlocked: true,  unlockedAt: '2026-07-14', xpReward: 100 },
  { id: 'ach-3',  title: '100 Words',         description: 'Learned 100 vocabulary words',         icon: '📚', unlocked: true,  unlockedAt: '2026-07-18', xpReward: 150 },
  { id: 'ach-4',  title: '500 Words',         description: 'Learned 500 vocabulary words',         icon: '🎒', unlocked: true,  unlockedAt: '2026-08-01', xpReward: 200 },
  { id: 'ach-5',  title: 'Quiz Master',       description: 'Scored 100% on a quiz',               icon: '🏆', unlocked: true,  unlockedAt: '2026-07-20', xpReward: 100 },
  { id: 'ach-6',  title: 'Speed Learner',     description: 'Learned 50 words in one day',         icon: '⚡', unlocked: true,  unlockedAt: '2026-07-22', xpReward: 120 },
  { id: 'ach-7',  title: 'Flashcard Fan',     description: 'Reviewed 200 flashcards',             icon: '🃏', unlocked: true,  unlockedAt: '2026-07-25', xpReward: 80  },
  { id: 'ach-8',  title: 'Early Bird',        description: 'Studied before 8am for 5 days',       icon: '🌅', unlocked: true,  unlockedAt: '2026-07-28', xpReward: 70  },
  { id: 'ach-9',  title: 'Perfect Week',      description: 'Met daily goal every day this week',  icon: '✨', unlocked: false, xpReward: 200 },
  { id: 'ach-10', title: '30-Day Streak',     description: 'Studied 30 days in a row',            icon: '🌊', unlocked: false, xpReward: 300 },
  { id: 'ach-11', title: '1000 Words',        description: 'Learned 1000 vocabulary words',       icon: '🎓', unlocked: false, xpReward: 500 },
  { id: 'ach-12', title: 'Vocabulary Pro',    description: 'Completed all B2 level words',        icon: '💡', unlocked: false, xpReward: 400 },
  { id: 'ach-13', title: 'Course Completer',  description: 'Finished a full course',              icon: '🎯', unlocked: false, xpReward: 250 },
  { id: 'ach-14', title: 'Social Learner',    description: 'Shared a word with a friend',         icon: '🤝', unlocked: false, xpReward: 60  },
  { id: 'ach-15', title: 'Night Owl',         description: 'Studied after 10pm for 5 days',       icon: '🦉', unlocked: false, xpReward: 70  },
  { id: 'ach-16', title: 'Polyglot Start',    description: 'Added 10 words to favorites',         icon: '❤️', unlocked: false, xpReward: 50  },
  { id: 'ach-17', title: 'Practice Makes',    description: 'Completed all 4 exercise types',      icon: '🏋️', unlocked: false, xpReward: 150 },
  { id: 'ach-18', title: 'Top Scorer',        description: 'Scored 95%+ on 5 quizzes',            icon: '🥇', unlocked: false, xpReward: 300 },
  { id: 'ach-19', title: 'Review Master',     description: 'Reviewed 500 words total',            icon: '🔄', unlocked: false, xpReward: 200 },
  { id: 'ach-20', title: 'Level Up',          description: 'Reached learner level 15',            icon: '⬆️', unlocked: false, xpReward: 500 },
]

export const MOCK_ALL_ACTIVITIES: LearningActivity[] = [
  { id: 'all-1',  type: 'learn',     description: 'Learned 15 new words',                     timestamp: new Date(Date.now() - 2  * 3600000).toISOString(), xpEarned: 75  },
  { id: 'all-2',  type: 'lesson',    description: 'Completed Business English Lesson 3',       timestamp: new Date(Date.now() - 5  * 3600000).toISOString(), xpEarned: 50  },
  { id: 'all-3',  type: 'flashcard', description: 'Reviewed 20 flashcards',                    timestamp: new Date(Date.now() - 8  * 3600000).toISOString(), xpEarned: 40  },
  { id: 'all-4',  type: 'quiz',      description: 'Scored 90% on Vocabulary Quiz',             timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), xpEarned: 90  },
  { id: 'all-5',  type: 'streak',    description: 'Achieved a 7-day streak',                   timestamp: new Date(Date.now() - 26 * 3600000).toISOString(), xpEarned: 20  },
  { id: 'all-6',  type: 'learn',     description: 'Learned 10 new words – Travel English',     timestamp: new Date(Date.now() - 48 * 3600000).toISOString(), xpEarned: 50  },
  { id: 'all-7',  type: 'quiz',      description: 'Scored 80% on IELTS Vocabulary Quiz',       timestamp: new Date(Date.now() - 50 * 3600000).toISOString(), xpEarned: 80  },
  { id: 'all-8',  type: 'lesson',    description: 'Completed Travel English Lesson 2',          timestamp: new Date(Date.now() - 52 * 3600000).toISOString(), xpEarned: 50  },
  { id: 'all-9',  type: 'flashcard', description: 'Reviewed 30 flashcards – Business Words',   timestamp: new Date(Date.now() - 72 * 3600000).toISOString(), xpEarned: 60  },
  { id: 'all-10', type: 'learn',     description: 'Learned 20 new words – Daily Conversation', timestamp: new Date(Date.now() - 96 * 3600000).toISOString(), xpEarned: 100 },
  { id: 'all-11', type: 'quiz',      description: 'Scored 95% on Business English Quiz',       timestamp: new Date(Date.now() - 98 * 3600000).toISOString(), xpEarned: 95  },
  { id: 'all-12', type: 'streak',    description: 'Achieved a 5-day streak',                   timestamp: new Date(Date.now() - 100* 3600000).toISOString(), xpEarned: 20  },
  { id: 'all-13', type: 'lesson',    description: 'Completed Beginner Foundations Lesson 8',   timestamp: new Date(Date.now() - 120* 3600000).toISOString(), xpEarned: 50  },
  { id: 'all-14', type: 'learn',     description: 'Learned 12 new words – Technology',         timestamp: new Date(Date.now() - 144* 3600000).toISOString(), xpEarned: 60  },
  { id: 'all-15', type: 'flashcard', description: 'Reviewed 25 flashcards – IELTS Prep',       timestamp: new Date(Date.now() - 146* 3600000).toISOString(), xpEarned: 50  },
  { id: 'all-16', type: 'quiz',      description: 'Scored 70% on Advanced Vocabulary Quiz',    timestamp: new Date(Date.now() - 168* 3600000).toISOString(), xpEarned: 70  },
  { id: 'all-17', type: 'learn',     description: 'Learned 8 new words – Academic Writing',    timestamp: new Date(Date.now() - 170* 3600000).toISOString(), xpEarned: 40  },
  { id: 'all-18', type: 'lesson',    description: 'Completed TOEIC Vocabulary Lesson 1',       timestamp: new Date(Date.now() - 192* 3600000).toISOString(), xpEarned: 50  },
  { id: 'all-19', type: 'flashcard', description: 'Reviewed 40 flashcards – All Words',        timestamp: new Date(Date.now() - 194* 3600000).toISOString(), xpEarned: 80  },
  { id: 'all-20', type: 'streak',    description: 'Achieved a 3-day streak',                   timestamp: new Date(Date.now() - 216* 3600000).toISOString(), xpEarned: 20  },
]
