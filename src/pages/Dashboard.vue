<template lang="pug">
div(class="w-full h-screen items-center px-14")
    div(class="flex flex-row justify-between h-14 py-2")
        h1(class="font-bold text-2xl") {{username}} <span class="font-thin text-sm">{{chatlink}}</span>
        button(class="btn primary", @click="handleLogout") Logout
    div(class="flex  flex-col-reverse pt-7  md:flex-row")
        div(class="flex-1 flex-col justify-center md:pt-24  text-center")
            div(class="inline-block h-full max-h-md w-full max-w-md p-4 overflow-hidden text-left align-middle justify-center transition-all transform bg-gray-100 shadow-xl rounded-3xl")
                div(class="flex flex-col ")
                    input(class="input", placeholder="User ID", v-model="id")
                div(class="mt-4 flex flex-row justify-end")
                    button(class="btn secondary", @click="search") Search Friend
       
       
</template>
<script setup>
	import FlashMessage from "@/components/FlashMessage.vue";
	import { useRouter } from "vue-router";
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
		TransitionChild,
		TransitionRoot,
	} from "@headlessui/vue";
	import { ref, onMounted, watch, watchEffect } from "vue";
	import useAuthentication from "@/hooks/useAuthentication.js";

	const { profile, logout, isAuthenticated, addFriend, channels } =
		useAuthentication();
	const chatlink = ref("");
	const id = ref("");
	const username = ref("");
	const key = ref("");
	const router = useRouter();
	onMounted(() => {
		chatlink.value = profile.chatlink;
		username.value = profile.username;
		key.value = profile.key;
		console.log(channels.value);
	});
	watch(isAuthenticated, () => {
		chatlink.value = profile.chatlink;

		username.value = profile.username;
		key.value = profile.key;
		console.log(channels.value);
	});

	watch(channels.value, () => {
		console.log(channels.value);
	});
	function search() {
		console.log(id.value);
		addFriend(id.value);
	}
	function handleLogout() {
		logout();
		router.push("/");
	}
</script>
