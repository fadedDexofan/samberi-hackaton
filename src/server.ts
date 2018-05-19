import { createConnection } from "typeorm";
import app from "./app";

const PORT: number = 3000;

createConnection()
  .then(async (connection) => {
    try {
      app.listen(PORT);
      console.log(`Server started at http://localhost:${PORT}`);
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => console.log("TypeORM connection error: ", err));
