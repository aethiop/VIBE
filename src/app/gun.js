import Gun from "gun";
import SEA from "gun/sea";
import "gun/lib/rindexed";
import "gun/lib/promise";
import "gun/nts";
import "gun/lib/webrtc";
Gun.log.off = true;
export const gun = Gun({
	peers: ["http://localhost:8765/gun"],
});
export const sea = SEA;
export const app = gun.get("vibe_001");
export const user = gun.user();
