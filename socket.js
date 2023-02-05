import openConnect from "socket.io-client";

let io;

export const socket = {
  initSocket: (url) => {
    io = openConnect(url);
    console.log("socket initialised successfully");
  },
  getSocket: () => {
    return io;
  },
};
