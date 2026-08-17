import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

const LEVEL_NAMES: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Int.',
  C1: 'Advanced',
  C2: 'Mastery',
}

interface CEFRProgressProps {
  data: { level: string; learned: number; total: number; progress: number }[]
}

export function CEFRProgress({ data }: CEFRProgressProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">CEFR Level Progress</h3>

      <div className="space-y-6">
        {data.map((item, index) => {
          const locked = item.total === 0
          return (
            <div key={item.level} className={`relative ${locked ? 'opacity-50' : ''}`}>
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <span className="mr-2 font-bold text-gray-900 dark:text-white">{item.level}</span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{LEVEL_NAMES[item.level] || item.level}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400">{item.learned}/{item.total} words</span>
                  {locked ? (
                    <Lock size={14} className="text-gray-400" />
                  ) : (
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.progress}%</span>
                  )}
                </div>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    item.progress === 100 ? 'bg-green-500' : 'bg-indigo-600 dark:bg-indigo-500'
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
