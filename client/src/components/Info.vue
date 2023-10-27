<script setup lang="ts">
defineProps<{
	userEmail: string | null
}>()
</script>
<template>
	<v-card class="mx-auto" width="400">
		<v-card-text>
			<h4 class="text-h4 text-center">You are logged in!</h4>
			<h5 class="text-h5 text-center pt-4">User Email: {{ userEmail }}</h5>
		</v-card-text>
	</v-card>
</template>

<style scoped></style>
