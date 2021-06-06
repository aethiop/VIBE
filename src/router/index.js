import { createRouter, createWebHistory } from "vue-router";
import { computed } from "vue";
import useAuthentication from "@/hooks/useAuthentication.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";

const { isAuthenticated } = useAuthentication();
const { keyPair, getKeyPair } = useLocalStorage();
const routes = [
	{
		path: "/",
		name: "home",
		component: import("@/pages/Home.vue"),
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import("@/pages/Dashboard.vue"),
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ["home"];
	const authRequired = !publicPages.includes(to.name);
	const key = keyPair.key;
	if (authRequired && !key) {
		return next("/");
	}

	next();
});
export default router;
