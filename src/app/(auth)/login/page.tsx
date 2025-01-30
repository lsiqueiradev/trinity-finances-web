import Link from 'next/link'
import { SignInForm } from './sign-in-form'

export default function LoginPage() {
  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Insira seu e-mail e senha abaixo para acessar sua conta
          </p>
        </div>
        <SignInForm />
        <div className="text-center text-sm">
          Não tem uma conta?{' '}
          <Link href="#" className="font-medium underline underline-offset-4">
            Inscreva-se agora
          </Link>
        </div>
      </div>
    </div>
  )
}
