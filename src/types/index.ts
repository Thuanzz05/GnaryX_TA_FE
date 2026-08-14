export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'pronoun'
  | 'interjection'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface User {
  id: string
  fullName: string
  email: string
  avatar?: string
  level: CEFRLevel
  xp: number
  levelNumber: number
  streak: number
  dailyGoal: number
  preferredTopics: string[]
}

export interface VocabularyWord {
  id: string
  word: string
  phonetic: string
  partOfSpeech: PartOfSpeech
  meaning: string
  meaningVi: string
  example: string
  exampleVi?: string
  synonyms: string[]
  antonyms: string[]
  wordFamily: string[]
  collocations: string[]
  level: CEFRLevel
  topic: string
  difficulty: Difficulty
  isLearned: boolean
  isFavorite: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  level: string
  category: string
  lessonCount: number
  wordCount: number
  progress: number
  icon: string
  color: string
}

export interface Lesson {
  id: string
  courseId: string
  number: number
  title: string
  description: string
  wordCount: number
  progress: number
  status: 'completed' | 'in-progress' | 'locked'
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  wordId?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  questionCount: number
  timeLimit: number
  questions: QuizQuestion[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  xpReward: number
}

export interface LearningProgress {
  totalWords: number
  wordsThisWeek: number
  wordsThisMonth: number
  currentStreak: number
  longestStreak: number
  totalStudyTimeMinutes: number
  xp: number
  level: number
}

export interface LearningActivity {
  id: string
  type: string
  description: string
  timestamp: string
  xpEarned?: number
}

export interface DailyGoal {
  target: number
  completed: number
  xpEarnedToday: number
}

export interface FavoriteWord extends VocabularyWord {
  savedAt: string
}
