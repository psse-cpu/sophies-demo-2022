import { useVisibilityToggle } from './use-visibility-toggle'

describe('useVisibilityToggle()', () => {
  describe('#togglePasswordVisibility()', () => {
    it('toggles password from invisible to visible', () => {
      const { passwordVisible, togglePasswordVisibility } =
        useVisibilityToggle()
      togglePasswordVisibility()

      expect(passwordVisible.value).toBe(true)
    })
    it('toggles password from visible to invisible', () => {
      const { passwordVisible, togglePasswordVisibility } =
        useVisibilityToggle()
      togglePasswordVisibility() // make visible as the previous test shows

      togglePasswordVisibility()
      expect(passwordVisible.value).toBe(false)
    })
  })
})
