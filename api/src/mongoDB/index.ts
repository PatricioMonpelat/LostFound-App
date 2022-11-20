import LogWithColors from "../miscellanea/LogWithColor";

//* - - - - - - - CONNECT TO MongoDB - - - - - - - -
import mongoose from "mongoose";
import { config } from "../config/config";

LogWithColors.info(
  " **************** MongoDB INDEX running! **************** "
);
mongoose
  .connect(config.mongo.uri)
  .then(() => {
    LogWithColors.infoBGC(
      " *** Connected to MongoDB: DocsSaviourAppDATABASE ! *** "
    );
  })
  .catch((error: any) => {
    LogWithColors.error("*** Unable to connecto to MongoDB");
    LogWithColors.error(error);
  });

//* - - - - - - - - MODELS : - - - - - - - -

import { userSchema } from "./models/User";

export const User = mongoose.model("User", userSchema);
