<template lang="pug">
div(
    v-if="message",
    :class="{'bg-red-200 text-red-900': message.type === 'error','bg-green-200 text-green-900': message.type === 'success'}",
    class="bg-red-200 text-red-900 rounded-lg shadow-md p-6 pr-10",style="min-width: 240px")
    button(class="opacity-75 cursor-pointer absolute top-0 right-0 py-2 px-3 hover:opacity-100").
        ×
    div(class="flex items-center").
        {{ message.text }}
</template>
<script setup>
	import { ref } from "vue";
	const message = ref(null);
</script>
