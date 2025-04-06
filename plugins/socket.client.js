import { io } from "socket.io-client"

export default defineNuxtPlugin(() => {
	const socket = io()
	console.log("Connect Socket")

	return {
		provide: {
			socket: socket
		}
	}
})