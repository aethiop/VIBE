import { watch, ref, computed } from "vue";
import useLocalStorage from "./useLocalStorage";
import useGun from "./useGun";
import useNotifications from "./useNotifications";

const BASE_URL = "http://localhost:3000";
const { getNotifications } = useNotifications();
const { setKeyPair, removeKeyPair } = useLocalStorage();
const { gun, SEA, app, user } = useGun();
const isAuthenticated = ref(null);
const profile = ref({
	username: null,
	friends: null,
	chatlink: null,
	pub: null,
	epub: null,
	key: null,
});

const channels = ref({});

const setAuth = (bool) => (isAuthenticated.value = bool);
const setChatlink = (cl) => (profile.chatlink = cl);

const setUsername = (u) => (profile.username = u);
const setKey = (k) => (profile.key = k);
const setPub = (pk) => (profile.pub = pk);
const setEpub = (ek) => (profile.epub = ek);

function create(name) {
	return SEA.pair().then(async (k) => {
		//Login with key
		login(k);
		name && user.get("profile").get("name").put(name);
		//Create Chatlink
		createChatlink(k);
	});
}

async function createChatlink(key) {
	const chatlink = await iris.Channel.createChatLink(gun, key, BASE_URL);
	setChatlink(chatlink);
	console.log(chatlink);
}

function login(key) {
	key = typeof key === "string" ? JSON.parse(key) : key;

	// Initialize Iris
	iris.Channel.initUser(gun, key);

	// Setting Chatlinks
	iris.Channel.getMyChatLinks(gun, key, BASE_URL, (chatLink) => {
		gun.get("chatLinks").get(chatLink.id).put(chatLink.url);
		setChatlink(chatLink.url);
	});

	// Get my channels
	iris.Channel.getChannels(gun, key, addChannel);

	// Setting up user info
	user.get("profile")
		.get("name")
		.on((name) => {
			if (name && typeof name === "string") {
				setUsername(name);
				``;
			}
		});
	setPub(key.pub);
	setEpub(key.epub);
	setKey(key);
	setKeyPair(JSON.stringify(key));
	setAuth(true);
}

function logout() {
	removeKeyPair();
	setAuth(false);
}

function getUrlParameters(sParam, sParams) {
	var sPageURL = sParams || window.location.search.substring(1),
		sURLVariables = sPageURL.split("&"),
		sParameterName,
		i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split("=");
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined
				? true
				: decodeURIComponent(sParameterName[1]);
		}
	}
}

function addFriend(url) {
	if (url.length < 30) {
		return;
	}
	var s = url.split("?");
	if (s.length !== 2) {
		return;
	}
	var friendId =
		getUrlParameters("chatWith", s[1]) ||
		getUrlParameters("channelId", s[1]);
	if (friendId) {
		newChannel(friendId, url);
		console.log("Successfully shared");
	}
}

function newChannel(pub, chatLink) {
	if (!pub || Object.prototype.hasOwnProperty.call(channels, pub)) {
		return;
	}
	const chat = new iris.Channel({
		gun: gun,
		key: profile.key,
		chatLink: chatLink,
		participants: pub,
	});
	addChannel(chat);
	return chat;
}
function addChannel(chat) {
	var pub = chat.getId();
	if (channels[pub]) {
		return;
	}
	channels.value[pub] = chat;
	gun.user(pub)
		.get("profile")
		.get("name")
		.on(async (username) => {
			channels.value[pub] = await username;
			console.log(channels.value);
			// channels[pub].username = await username;
			// console.log(channels[pub].username);
		});
	if (chat.uuid) {
		chat.getParticipants((participants) => {
			if (typeof participants === "object") {
				var keys = Object.keys(participants);
				keys.forEach((k, i) => {
					gun.user(k)
						.get("profile")
						.get("name")
						.on((name) => {
							chat.participantProfiles[k].name = name;
						});
				});
			}
			gun.get("channels").get(chat.uuid).get("participants").put(null);
			gun.get("channels")
				.get(chat.uuid)
				.get("participants")
				.put(participants);
		});
	} else {
		gun.user(pub)
			.get("profile")
			.get("name")
			.on((v) => {
				gun.get("channels").get(pub).get("name").put(v);
			});
	}
}

export default () => ({
	create,
	login,
	logout,
	isAuthenticated,
	profile,
	addFriend,
	channels,
});
