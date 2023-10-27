<script setup lang="ts">
import { watch, ref } from 'vue'
import { useFormStore } from '../stores/store.js'

const props = defineProps<{
	type: string
	email: string
	password: string
	currentPassword?: string
}>()

const fieldEmail = ref(props.email)
const fieldPassword = ref(props.password)
const fieldCurrentPassword = ref(props.currentPassword)
const form = ref(false)

const showPassword = ref(false)
const showCurrentPassword = ref(false)

const formStore = useFormStore()

const emits = defineEmits([
	'update:email',
	'update:password',
	'update:currentPassword',
	'register',
	'login',
])

const onSubmit = () =>
	props.type === 'LogIn' ? emits('login') : emits('register')

watch(fieldEmail, (value) => emits('update:email', value))
watch(fieldPassword, (value) => emits('update:password', value))
watch(fieldCurrentPassword, (value) => emits('update:currentPassword', value))
</script>

<template>
	<v-card class="mx-auto" width="400">
		<v-card-title> {{ type }} </v-card-title>
		<v-card-text>
			<v-form v-model="form" @submit.prevent="onSubmit">
				<v-container>
					<v-row>
						<v-col cols="12" md="12">
							<v-text-field
								v-model="fieldEmail"
								color="blue"
								label="Email"
								type="email"
								variant="outlined"
								density="compact"
								required
								hide-details
							></v-text-field>
						</v-col>

						<v-col cols="12" md="12">
							<v-text-field
								v-model="fieldPassword"
								color="blue"
								label="Password"
								:type="showPassword ? 'text' : 'password'"
								variant="outlined"
								density="compact"
								:append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append-inner="showPassword = !showPassword"
								hide-details
								required
							></v-text-field>
						</v-col>
						<v-col v-if="type === 'Register'" cols="12" md="12">
							<v-text-field
								v-model="fieldCurrentPassword"
								color="blue"
								label="Current Password"
								variant="outlined"
								density="compact"
								:type="showCurrentPassword ? 'text' : 'password'"
								:append-inner-icon="
									showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'
								"
								@click:append-inner="showCurrentPassword = !showCurrentPassword"
								hide-details
								required
							></v-text-field>
						</v-col>
					</v-row>
				</v-container>

				<v-btn
					:disabled="!form"
					:loading="formStore.loading"
					block
					color="blue"
					size="large"
					type="submit"
					variant="elevated"
				>
					{{ type }}
				</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<style scoped></style>
