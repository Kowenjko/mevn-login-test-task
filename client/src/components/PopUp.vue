<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
	nameButton: string
	isOpen: boolean
}>()

const emit = defineEmits(['update:isOpen'])

const dialog = ref(false)

watch(dialog, (value) => emit('update:isOpen', value))
watch(
	() => props.isOpen,
	(value) => (dialog.value = value)
)
</script>

<template>
	<div class="text-center ml-4">
		<v-btn color="blue">
			{{ nameButton }}

			<v-dialog v-model="dialog" activator="parent" width="auto">
				<slot />
			</v-dialog>
		</v-btn>
	</div>
</template>

<style scoped></style>
