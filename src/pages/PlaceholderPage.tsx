import { Construction } from 'lucide-react'
import { Badge, Card, CardContent, Heading, Text } from '@/components/common'

interface PlaceholderPageProps {
  title: string
  description: string
  phase?: string
}

export function PlaceholderPage({ title, description, phase }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card variant="elevated">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/30">
            <Construction className="h-7 w-7 text-primary-600 dark:text-primary-400" />
          </div>
          {phase && (
            <Badge variant="primary" className="mb-3">
              {phase}
            </Badge>
          )}
          <Heading level="h2">{title}</Heading>
          <Text variant="muted" className="mt-2 max-w-md">
            {description}
          </Text>
        </CardContent>
      </Card>
    </div>
  )
}
