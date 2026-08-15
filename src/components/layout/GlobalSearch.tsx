import { useState } from 'react';
import { Search } from 'lucide-react';

const POPULAR_SEARCHES = ['Resilient', 'Achieve', 'Strategy', 'Collaborate'];

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative flex h-10 w-full items-center rounded-full border border-gray-200 bg-gray-50 px-4 dark:border-gray-700 dark:bg-gray-800">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search vocabulary..."
          className="w-full border-none bg-transparent px-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-slate-100"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="p-4">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Popular Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <span
                  key={term}
                  className="cursor-pointer rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
