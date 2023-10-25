import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? 'https://churchplus-whatsapp-server.azurewebsites.net' : "http://localhost:3001";
// const URL = process.env.NODE_ENV === "production" ? 'https://app-0816c2a3-8f36-422d-987b-4773c2e36f3b.cleverapps.io' : "http://localhost:3001";
// const URL = process.env.NODE_ENV === "production" ? 'https://churchplus-whatsapp-server.azurewebsites.net' : "http://localhost:3001";
// const URL = process.env.NODE_ENV === "production" ? 'https://whatsapp-server-venom.azurewebsites.net' : "http://localhost:3001";
// const URL = process.env.NODE_ENV === "production" ? 'https://churchplus-venom-server-production.up.railway.app' : "http://localhost:3001";
// const URL = process.env.NODE_ENV === "production" ? 'https://whatsappserver.churchpluswebsite.com' : "http://localhost:3001";
const URL = process.env.NODE_ENV === "production" ? 'https://churchplusserver-churchpluss.koyeb.app' : "http://localhost:3001";
console.log(process.env.NODE_ENV, URL)

export const socket = io(URL, {transports: ['websocket'], upgrade: false});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});