'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInWithEmailAndPasswordSchema } from '@/schemas/sign-in-with-email-and-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { signInWithEmailAndPasswordAction } from './actions'

type SignInWithEmailAndPasswordSchema = z.infer<
  typeof signInWithEmailAndPasswordSchema
>

export function SignInForm() {
  const router = useRouter()
  const form = useForm<SignInWithEmailAndPasswordSchema>({
    mode: 'onChange',
    resolver: zodResolver(signInWithEmailAndPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async ({
    email,
    password,
  }: SignInWithEmailAndPasswordSchema) => {
    try {
      await signInWithEmailAndPasswordAction({ email, password })
      router.push('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    }
  }

  useEffect(() => {
    const sessionExpired = getCookie('session-expired')
    if (sessionExpired) {
      toast.error(sessionExpired)
    }
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="password">Senha</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-6 mt-2">
          <Link
            href="#"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>
        <div className="space-y-4">
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Entrar
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
          <Button variant="outline" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Entrar com Google
          </Button>
        </div>
      </form>
    </Form>
  )
}
