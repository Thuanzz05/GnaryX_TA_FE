import { cn } from '@/utils/cn'

export interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn('border-b border-border dark:border-border-dark', className)}
      role="tablist"
    >
      <div className="-mb-px flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={cn(
                'whitespace-nowrap border-b-2 px-4 py-3 text-body-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                isActive
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-text-secondary hover:border-border hover:text-text-primary dark:text-slate-400 dark:hover:text-slate-200',
              )}
            >
              {tab.label}
              {tab.count != null && (
                <span
                  className={cn(
                    'ml-2 rounded-full px-2 py-0.5 text-caption',
                    isActive
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400'
                      : 'bg-surface-muted text-text-muted dark:bg-slate-800 dark:text-slate-400',
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
