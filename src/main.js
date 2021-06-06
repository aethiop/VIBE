import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import "./style.css";
const app = createApp(App);
app.directive("outside", {
	beforeMount(el, binding, vnode) {
		el.clickOutsideEvent = function (event) {
			console.log("HER");
			if (!(el === event.target || el.contains(event.target))) {
				binding.value(event, el);
			}
		};
		document.body.addEventListener("click", el.clickOutsideEvent);
	},
	unmounted(el) {
		console.log(el);
		document.body.removeEventListener("click", el.clickOutsideEvent);
	},
});
app.use(router);
app.use("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
