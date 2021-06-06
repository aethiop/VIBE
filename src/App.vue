<template lang="pug">
router-view
</template>

<script setup>
	import { onMounted } from "vue";
	import { useRouter } from "vue-router";
	import useLocalStorage from "@/hooks/useLocalStorage.js";
	import useAuthentication from "@/hooks/useAuthentication.js";
	import useGun from "@/hooks/useGun.js";
	const router = useRouter();
	const { keyPair, getKeyPair } = useLocalStorage();
	const { gun, username } = useGun();
	const { login, profile } = useAuthentication();

	// Redirect to dashboard if key found
	onMounted(() => {
		getKeyPair();
		if (keyPair.key) {
			login(keyPair.key);
			router.push("/dashboard");
		}
	});
</script>
