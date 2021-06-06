Gun.log.off = true;
const gun = Gun({
	peers: ["http://localhost:8765/gun"],
});
window.gun = gun;
const user = gun.user();

const app = gun.get("vibe_001");

export default () => ({
	gun,
	SEA,
	app,
	user,
});
