import { useToast } from 'primevue/usetoast'
import { createSharedComposable } from '@vueuse/core'

export const useToaster = createSharedComposable(() => {
  const toast = useToast()

  const success = (message: string, summary = 'Berhasil') => {
    toast.add({
      severity: 'success',
      summary,
      detail: message,
      life: 3000,
    })
  }

  const error = (message: string, summary = 'Error') => {
    toast.add({
      severity: 'error',
      summary,
      detail: message,
      life: 4000,
    })
  }

  const warning = (message: string, summary = 'Peringatan') => {
    toast.add({
      severity: 'warn',
      summary,
      detail: message,
      life: 4000,
    })
  }

  const info = (message: string, summary = 'Info') => {
    toast.add({
      severity: 'info',
      summary,
      detail: message,
      life: 3000,
    })
  }

  return { success, error, warning, info }
})
