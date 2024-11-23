import { createFileRoute } from '@tanstack/react-router'
import Settings from '@/pages/authenticated/settings.tsx'

export const Route = createFileRoute('/_authenticated/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Settings />
}
