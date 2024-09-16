import { Server } from "socket.io";
import type { Server as HttpServer } from "node:http";
import { logger } from "../../common/logger";
import { configs } from "../../data/constants/configs";

class WebSocket {
  private static io = new Server();

  init(server: HttpServer) {
    WebSocket.io.listen(server, { cors: { origin: "*" } });
    this.setOnConnectionHandler();
  }

  get socket() {
    return WebSocket.io;
  }

  private setOnConnectionHandler = () => {
    logger.info("WS initialized");
    WebSocket.io.on("connection", async (socket) => {
      const { token } = socket.handshake.query;
      try {
        const { verifyToken } = await import("./passport/passport-local");
        const { userSA } = await import("../applicatif/user.sa");
        const { id: utilisateurId } = await verifyToken(`${token}`, configs.JWT_SECRET);
        await userSA.updateSocketId(utilisateurId, socket.id);
      } catch (error) {
        socket.disconnect();
      }
      logger.info(`New user: ${socket.id}`);
    });
  };
}

export const ws = new WebSocket();
