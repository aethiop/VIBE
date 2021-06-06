import { reactive, watch } from "vue";
const keyPair = reactive({
	key: null,
});
function setKeyPair(key) {
	if (!keyPair.key) {
		keyPair.key = key;
	}
}
function removeKeyPair(key) {
	keyPair.key = null;
	localStorage.removeItem("vibe_key");
}
function getKeyPair() {
	keyPair.key = JSON.parse(localStorage.getItem("vibe_key"));
}
watch(keyPair, ({ key }) => {
	localStorage.setItem("vibe_key", JSON.stringify(key));
});
export default () => ({
	getKeyPair,
	setKeyPair,
	keyPair,
	removeKeyPair,
});
