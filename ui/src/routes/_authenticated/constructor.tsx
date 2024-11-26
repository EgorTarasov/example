import { createFileRoute } from '@tanstack/react-router'
import Constructor from "@/pages/authenticated/constructor.tsx";

export const Route = createFileRoute('/_authenticated/constructor')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
      <Constructor/>
)
}
