import { Ref, ref } from 'vue'

export const useVisibilityToggle = (): {
  passwordVisible: Ref<boolean>
  togglePasswordVisibility: () => void
} => {
  const passwordVisible = ref(false)

  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value
  }

  return {
    passwordVisible,
    togglePasswordVisibility,
  }
}
