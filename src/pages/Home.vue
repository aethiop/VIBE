<template lang="pug">
div(class="w-full bg-gray-200 h-screen items-center px-14")
    div(class="flex flex-row justify-between h-14 py-2")
        img(class="w-12 h-12", src="@/assets/logo.svg")
        button(class="btn primary", @click="isOpen = true") Sign In
    div(class="flex  flex-col-reverse pt-7  md:flex-row")
        div(class="flex-1 flex-col justify-center md:pt-24 space-y-4 text-center")
            div(class="inline-block h-full max-h-md w-full max-w-md p-4 overflow-hidden text-left align-middle justify-center transition-all transform bg-gray-100 shadow-xl rounded-2xl")
                div(class="flex flex-col ")
                    input(class="input", placeholder="Username", v-model="username")
                    //- input(class="input border border-gray-600", type="key", placeholder="Login With Key", v-model="key")
                div(class="mt-4 flex flex-row justify-end")
                    button(class="btn secondary", @click="signUp") Sign Up
            div(class="inline-block h-full max-h-md w-full max-w-md p-4 overflow-hidden text-left align-middle justify-center transition-all transform bg-gray-100 shadow-xl rounded-2xl")
                div(class="flex flex-col ")
                    input(class="input", placeholder="Key", v-model="key")
                    //- input(class="input border border-gray-600", type="key", placeholder="Login With Key", v-model="key")
                div(class="mt-4 flex flex-row justify-end")
                    button(class="btn primary", @click="signIn") Sign In
       

                            


    //- modal(:showing="isOpen", title="Hello,", @cancel="cancel")
    //-     template(v-slot:body, class="space-y-2")
            //- div(class="flex flex-col")
            //-     input(class="input border-black focus:animate-pulse", placeholder="Username", v-model="username")
            //-     input(class="input border-black focus:animate-pulse", placeholder="Password", v-model="password", type="password")
    //-     template(v-slot:secondary)
    //-         button(class="btn secondary", @click="signUp") Sign Up
    //-     template(v-slot:primary)
    //-         button(class="btn primary", @click="signIn") Sign In
            
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

	import useAuthentication from "@/hooks/useAuthentication.js";
	import { ref, watch, onMounted } from "vue";

	const username = ref("");
	// const password = ref("");
	const key = ref("");
	const router = useRouter();
	const { login, create, profile, isAuthenticated } = useAuthentication();
	// const handleSignIn = () => {
	// 	login(username.value, password.value).then((res) => {
	// 		console.log(profile.username);
	// 		router.push("/dashboard");
	// 	});
	// };
	const signUp = () => {
		create(username.value);
		router.push("/dashboard");
	};
	const signIn = () => {
		login(key.value);
		router.push("/dashboard");
	};

	const isOpen = ref(false);
	const closeModal = () => {
		isOpen.value = false;
	};
	const openModal = () => {
		isOpen.value = true;
	};
	watch(isAuthenticated, () => {
		router.push("/dashboard");
	});
</script>
