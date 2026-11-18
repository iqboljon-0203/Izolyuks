'use client'

import { useActionState } from 'react'
import { Logo } from '@/components/ui'
import { login } from './actions'

export default function LoginForm() {
  const [err, action, pending] = useActionState(login, null)
  return (
    <div className="ad-login">
      <form action={action} className="cbox">
        <Logo height={30} />
        <h1>Admin panel</h1>
        <p className="muted">Saytdagi matn, rasm, narx va mahsulotlarni boshqarish.</p>
        <label className="sr" htmlFor="pw">Parol</label>
        <input id="pw" name="password" type="password" placeholder="Parol" autoComplete="current-password" required autoFocus />
        <button className="btn btn-dark" disabled={pending}>{pending ? 'Tekshirilmoqda...' : 'Kirish'}</button>
        {err && <div className="note-box err">{err}</div>}
      </form>
    </div>
  )
}
