import type { Achievement, Course, Lesson, User } from '@/types'
import { MOCK_COURSES, MOCK_LESSONS } from '@/data/mockCourses'
import { MOCK_ACHIEVEMENTS, MOCK_ALL_ACTIVITIES } from '@/data/mockDashboard'
import { BACKEND_MOCK_VOCABULARY } from '@/data/backendVocabulary'
import type { Flashcard } from './flashcardService'

const keys = {
  user: 'gnarylex-local-user',
  settings: 'gnarylex-local-settings',
  lessonProgress: 'gnarylex-local-lesson-progress',
  flashcards: 'gnarylex-local-flashcards-v2',
  quizAttempts: 'gnarylex-local-quiz-attempts',
  activities: 'gnarylex-local-activities',
}

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const localData = {
  keys,
  read,
  write,
  getUser(): User {
    return read<User>(keys.user, {
      id: 'local-demo-user', fullName: 'Local Learner', email: 'demo@gnarylex.local',
      level: 'A2', xp: 400, levelNumber: 2, streak: 2, dailyGoal: 15, preferredTopics: ['Travel'],
    })
  },
  setUser(user: User) { write(keys.user, user) },
  getCourses(): Course[] { return MOCK_COURSES.map((course) => ({ ...course })) },
  getLessons(courseId: string): Lesson[] { return (MOCK_LESSONS[courseId] || []).map((lesson) => ({ ...lesson })) },
  getFlashcards(): Flashcard[] {
    return read<Flashcard[]>(keys.flashcards, BACKEND_MOCK_VOCABULARY.map((word) => ({ ...word, exampleVi: word.exampleVi || '' })))
  },
  setFlashcards(cards: Flashcard[]) { write(keys.flashcards, cards) },
  getAchievements(): Achievement[] { return MOCK_ACHIEVEMENTS.map((item) => ({ ...item })) },
  getActivities() { return read(keys.activities, MOCK_ALL_ACTIVITIES) },
  addActivity(activity: unknown) { write(keys.activities, [activity, ...localData.getActivities()]) },
  getQuizAttempts(): any[] { return read<any[]>(keys.quizAttempts, []) },
  setQuizAttempts(attempts: any[]) { write(keys.quizAttempts, attempts) },
}
