require("dotenv").config();

import app from "./routes";

const envSetup =
  process.env.MODE === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

const port = !envSetup ? 3000 : envSetup;

app.listen(port, () => console.log(`Listening on ${port}`));
