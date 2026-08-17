import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface WordsLearnedChartProps {
  data: { day: string; words: number }[]
}

export function WordsLearnedChart({ data }: WordsLearnedChartProps) {
  return (
    <div className="h-96 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">Words Learned This Week</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="words"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorWords)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
