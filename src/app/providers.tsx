'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/libs/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>
          {children}
          <Toaster
            richColors
            position="top-center"
            expand
            className="font-bold"
          />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
