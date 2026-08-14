export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border dark:border-border-dark" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-surface-muted px-3 text-caption text-text-muted dark:bg-surface-dark dark:text-slate-400">
          or
        </span>
      </div>
    </div>
  )
}
