import Pusher from "pusher-js";

// Pusher.logToConsole = true;

export const pusher = new Pusher("2bb659a516cba2173f43", {
  cluster: "eu"
});
