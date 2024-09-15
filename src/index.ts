import "reflect-metadata";

import App from "./app";

const bootstrapAsync = async () => {
  try {
    await App.init();
  } catch (error) {
    console.log(error);
  }
};

bootstrapAsync();
