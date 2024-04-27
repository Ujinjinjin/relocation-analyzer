import { defineStore } from 'pinia'
import { ref, type Ref, watch } from 'vue'
import type { TTabCode } from '@/types/navigation'

export const useNavigationStore = defineStore('navigation', () => {
  const lastTab: Ref<TTabCode> = ref('distribution')

  const localStorage = window.localStorage.getItem('ra-navigation')
  if (localStorage) {
    lastTab.value = JSON.parse(localStorage)
  }

  watch(lastTab, () => {
    window.localStorage.setItem('ra-navigation', JSON.stringify(lastTab.value))
  })

  function navigatedTo (tab: TTabCode): void {
    lastTab.value = tab
  }

  return {
    lastTab: lastTab,
    navigatedTo: navigatedTo,
  }
})
