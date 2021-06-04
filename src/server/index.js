require("dotenv").config();

import app from "./routes";

const port =
  process.env.MODE === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

app.listen(port, () => console.log(`Listening on ${port}`));
