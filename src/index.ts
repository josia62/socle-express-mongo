import "reflect-metadata";

import App from "./app";
import { ws } from "./service/middleware/socket";

const bootstrapAsync = async () => {
  try {
    const server = await App.init();

    // Initialisation socket à supprimer si non utilisé
    ws.init(server);
  } catch (error) {
    console.log(error);
  }
};

bootstrapAsync();
