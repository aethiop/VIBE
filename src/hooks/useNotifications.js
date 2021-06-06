import useGun from "./useGun.js";
import useAuthentication from "./useAuthentication.js";
const { SEA, user } = useGun();

async function getNotifications() {
	const myKey = user._.sea;
	console.log(SEA);
	const mySecret = await SEA.secret(myKey.epub, myKey.key);
	user.get("notifications")
		.map()
		.on(async (enc) => {
			if (!enc) {
				return;
			}
			const s = await SEA.decrypt(enc, mySecret);
			console.log(s);
		});
}

export default () => ({
	getNotifications,
});
