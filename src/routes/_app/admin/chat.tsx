import { createFileRoute } from '@tanstack/react-router'
import { ChatBotPage } from './chat-multilang'

export const Route = createFileRoute('/_app/admin/chat')({
  component: ChatBotPage,
})
