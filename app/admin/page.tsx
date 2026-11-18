import { isAdmin } from '@/lib/auth'
import { getContent, hasBlob } from '@/lib/content'
import AdminEditor from './AdminEditor'
import LoginForm from './LoginForm'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!(await isAdmin())) return <LoginForm />
  const c = await getContent()
  return (
    <AdminEditor
      initial={c}
      storage={hasBlob() ? 'blob' : process.env.VERCEL ? 'none' : 'local'}
      telegram={!!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)}
    />
  )
}
