<template lang="pug">
div(v-if="showing", style="backdrop-filter: blur(8px);" class=" fixed inset-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-30")
    div(class="w-full max-w-md bg-white shadow-lg rounded-lg p-4")
        div(class="p-2 flex justify-between")
            h1(class="font-black text-xl") {{title}}
            span(class="font-black tracking-widest cursor-pointer" @click="emit('cancel')")
                svg(xmlns="http://www.w3.org/2000/svg", class="h-6 w-6 stroke-current text-black font-black", fill="none", viewBox="0 0 24 24", stroke="currentColor")
                    path(strokeLinecap="round", strokeLinejoin="round", strokeWidth=6, d="M6 18L18 6M6 6l12 12")
        div(class="p-2")
            slot(name="body")
        div(class="p-2 flex justify-end items-center")
            slot(name="secondary")
            slot(name="primary")
                
</template>
<script setup>
	import { defineProps, defineEmit } from "vue";
	const props = defineProps({
		showing: Boolean,
		title: String,
	});

	const emit = defineEmit(["cancel"]);
</script>
