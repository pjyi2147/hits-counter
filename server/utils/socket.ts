import type { Server as IOServer } from "socket.io";

let io: IOServer | null = null;

export const setIO = (instance: IOServer) => {
  io = instance;
};

export const getIO = (): IOServer | null => io;
