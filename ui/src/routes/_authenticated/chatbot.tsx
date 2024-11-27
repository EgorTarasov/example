import ChatBotWidget from '@/pages/authenticated/chatbot'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/chatbot')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ChatBotWidget/>
}
