import { createFileRoute } from '@tanstack/react-router'
import Constructor from '@/pages/authenticated/constructor.tsx'

export const Route = createFileRoute('/_authenticated/pipeline/$pipelineId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Constructor />
}
