import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFormStore = defineStore('formStore', () => {
	const userEmail = ref(null)
	const loading = ref(false)

	const isAuthSelector = computed(() => Boolean(userEmail.value))

	const logout = () => {
		if (window.confirm('Are you sure that want to logout')) {
			userEmail.value = null
			window.localStorage.removeItem('token')
		}
	}

	const setLoading = (value: any) => (loading.value = value)
	const setUserEmail = (value: any) => (userEmail.value = value)

	return {
		userEmail,
		logout,
		loading,
		isAuthSelector,
		setLoading,
		setUserEmail,
	}
})
