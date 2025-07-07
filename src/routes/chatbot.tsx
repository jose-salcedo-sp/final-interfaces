import { ChatForm } from '@/components/chat-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chatbot')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ChatForm />
}
