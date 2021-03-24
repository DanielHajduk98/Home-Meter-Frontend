import Pusher from "pusher-js";

// Pusher.logToConsole = true;

export const pusher = new Pusher("87aa056b90e4f0eb0f0f", {
  cluster: "eu"
});
