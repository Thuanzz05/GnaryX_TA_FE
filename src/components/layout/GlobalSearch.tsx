import { useState, useEffect, useRef } from 'react';
import { Search, X, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { vocabularyService } from '@/services/vocabularyService';
import type { VocabularyWord } from '@/types';

const POPULAR_SEARCHES = ['resilient', 'achieve', 'strategy', 'collaborate', 'flexible'];

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<VocabularyWord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = window.setTimeout(async () => {
      const words = await vocabularyService.search(trimmed);
      setResults(words.slice(0, 8));
      setIsSearching(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  const handleSelectWord = (wordId: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/vocabulary/${wordId}`);
  };

  return (
    <div className="relative w-full max-w-lg" ref={searchRef}>
      <div
        className={`relative z-51 flex h-10 w-full items-center rounded-full border transition-all ${
          isOpen
            ? 'border-indigo-500 bg-white ring-4 ring-indigo-50 dark:bg-gray-900 dark:ring-indigo-900/20'
            : 'border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50'
        }`}
      >
        <Search size={18} className="ml-4 shrink-0 text-gray-400" />
        <input
          type="text"
          placeholder="Search vocabulary..."
          className="w-full border-none bg-transparent px-3 text-sm text-gray-900 outline-none focus:ring-0 placeholder:text-gray-400 dark:text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mr-3 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-[calc(100%+8px)] z-50 flex max-h-[70vh] w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:max-h-[380px]"
          >
            <div className="overflow-y-auto">
              {!query ? (
                <div className="p-4">
                  <h4 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <History size={14} /> Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <h4 className="mb-2 px-2 pt-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Dictionary Suggestions
                  </h4>
                  {isSearching ? (
                    <div className="p-4 text-center text-sm text-gray-500">Searching…</div>
                  ) : results.length === 0 ? (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No vocabulary found for "<span className="font-semibold text-gray-900 dark:text-white">{query}</span>"
                    </div>
                  ) : (
                    results.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectWord(item.id)}
                        className="group flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex flex-col pr-4">
                          <div className="flex items-center gap-2">
                            <Search size={14} className="text-gray-400 transition-colors group-hover:text-indigo-500" />
                            <span className="font-semibold text-gray-900 dark:text-white">{item.word}</span>
                            <span className="hidden text-xs font-mono text-gray-500 sm:inline-block">{item.phonetic}</span>
                          </div>
                          <div className="mt-0.5 ml-6 line-clamp-1 text-sm text-gray-500">
                            {item.meaning} <span className="italic text-gray-400">({item.meaningVi})</span>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          {item.level}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
