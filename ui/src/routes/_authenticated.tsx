import { createFileRoute, redirect } from '@tanstack/react-router'
import {rootStore} from '../stores/RootStore.ts'
// import Dashboard from "@/pages/authenticated/dashboard.tsx";
import Constructor from "@/pages/authenticated/constructor.tsx";

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    if (!rootStore.token) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Constructor />
}
