import { useToast } from 'primevue/usetoast'
import { createSharedComposable } from '@vueuse/core'

const isMobile = () => window.innerWidth < 768

export const useToaster = createSharedComposable(() => {
  const toast = useToast()

  const base = (severity: string, message: string, summary: string, life: number) => {
    toast.add({
      severity,
      summary,
      detail: message,
      life,
      group: isMobile() ? 'mobile' : 'desktop',
    })
  }

  const success = (message: string, summary = 'Berhasil') =>
    base('success', message, summary, 3000)

  const error = (message: string, summary = 'Error') =>
    base('error', message, summary, 4000)

  const warning = (message: string, summary = 'Peringatan') =>
    base('warn', message, summary, 4000)

  const info = (message: string, summary = 'Info') =>
    base('info', message, summary, 3000)

  return { success, error, warning, info }
})
