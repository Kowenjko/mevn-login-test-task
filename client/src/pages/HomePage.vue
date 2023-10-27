<script setup>
import { ref, onMounted } from 'vue'
import AuthForm from '../components/AuthForm.vue'
import Info from '../components/Info.vue'
import PopUp from '../components/PopUp.vue'
import axios from 'axios'

import { useFormStore } from '../stores/store.js'

const email = ref('')
const password = ref('')
const currentPassword = ref('')
const isOpenLogIn = ref(false)
const isOpenRegister = ref(false)

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

// const { isAuthSelector, userEmail, registerUser, setLoading } = useFormStore()
const formStore = useFormStore()

const register = async () => {
	try {
		formStore.setLoading(true)
		const { data } = await axios.post(`${BASE_URL}/register`, {
			email: email.value,
			password: password.value,
		})

		console.log(data?.token)
		if (data?.token) {
			{
				window.localStorage.setItem('token', data.token)
				formStore.setUserEmail(data.email || null)
			}
		}
	} catch (error) {
		console.log(error)
	} finally {
		formStore.setLoading(false)
		isOpenRegister.value = false
	}
}
const login = async () => {
	try {
		formStore.setLoading(true)
		const { data } = await axios.post(`${BASE_URL}/login`, {
			email: email.value,
			password: password.value,
		})

		console.log(data?.token)
		if (data?.token) {
			{
				window.localStorage.setItem('token', data.token)
				formStore.setUserEmail(data.email || null)
			}
		}
	} catch (error) {
		console.log(error)
	} finally {
		formStore.setLoading(false)
		isOpenRegister.value = false
	}
}

onMounted(async () => {
	const token = window.localStorage.getItem('token')
	if (token) {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		}
		try {
			const { data } = await axios.get(`${BASE_URL}/me`, config)
			formStore.setUserEmail(data.email)
		} catch (error) {
			console.log(error)
		}
	}
})
</script>

<template>
	<v-container>
		<div class="d-flex align-center justify-center flex-column h-screen">
			<info v-if="formStore.isAuthSelector" :userEmail="formStore.userEmail" />

			<div class="mt-4">
				<v-btn
					v-if="formStore.isAuthSelector"
					@click="formStore.logout"
					color="blue"
					>LogOut</v-btn
				>
				<div class="d-flex" v-else>
					<pop-up name-button="LogIn" v-model:is-open="isOpenLogIn">
						<auth-form
							type="LogIn"
							v-model:email="email"
							v-model:password="password"
							v-model:current-password="currentPassword"
							@login="login"
						/>
					</pop-up>
					<pop-up name-button="Register" v-model:is-open="isOpenRegister">
						<auth-form
							type="Register"
							v-model:email="email"
							v-model:password="password"
							v-model:current-password="currentPassword"
							@register="register"
						/>
					</pop-up>
				</div>
			</div>
		</div>
	</v-container>
</template>

<style lang="scss" scoped></style>
