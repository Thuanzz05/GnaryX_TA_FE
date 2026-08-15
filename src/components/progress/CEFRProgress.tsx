import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

const levels = [
  { level: 'A1', name: 'Beginner', progress: 100, words: '500/500' },
  { level: 'A2', name: 'Elementary', progress: 82, words: '410/500' },
  { level: 'B1', name: 'Intermediate', progress: 54, words: '432/800' },
  { level: 'B2', name: 'Upper Int.', progress: 20, words: '160/800' },
  { level: 'C1', name: 'Advanced', progress: 5, words: '40/800' },
  { level: 'C2', name: 'Mastery', progress: 0, words: '0/800', locked: true },
]

export function CEFRProgress() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">CEFR Level Progress</h3>

      <div className="space-y-6">
        {levels.map((item, index) => (
          <div key={item.level} className={`relative ${item.locked ? 'opacity-50' : ''}`}>
            <div className="mb-2 flex items-end justify-between">
              <div>
                <span className="mr-2 font-bold text-gray-900 dark:text-white">{item.level}</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-400">{item.words} words</span>
                {item.locked ? (
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
        ))}
      </div>
    </div>
  )
}
