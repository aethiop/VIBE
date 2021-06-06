import { reactive, toRefs } from "vue";
import { gun, user } from "./gun";

const store = reactive({
	isAuthenticated: null,
	username: null,
	pub: null,
	key: null,
	err: {},
});

export default function useAuth() {
	const addError = (key, error) => {
		const arr = store.err[key] || [];
		arr.push(error);
		console.log(arr);
		store.err = { [key]: arr };
	};
	function create(alias, pass) {
		gun.get(`~@${alias}`).once((data) => {
			if (!data) {
				user.create(alias, pass, async (ack) => {
					if (!ack.err) {
						login(alias, pass);
					} else {
						addError("alias", ack.err);
					}
				});
			} else {
				addError("username", "User already exists");
			}
		});
	}

	function login(alias, pass) {
		user.auth(alias, pass, (ack) => {
			if (!ack.err) {
				fetchInfo(ack);
				store.key = JSON.stringify(user._.sea);
				localStorage.setItem("userKey", store.key);
			} else {
				addError("alias", ack.err);
			}
		});
	}
	function fetchInfo(ack) {
		gun.get(ack.soul).on((user) => {
			store.username = user.alias;
			store.isAuthenticated = true;
		});
	}

	return {
		...toRefs(store),
		create,
		login,
	};
}
