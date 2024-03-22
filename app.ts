import express from "express";
import { eventsHandler, sendEvent } from "./events";

export const app = express();

app.use(express.static("public"));

app.get("/health", (_req, res) => {
  console.log("Got a live one over here!!!");
  res.send("Hello orld!!!");
});

app.get("/events", eventsHandler);

app.post("/send/:clientId", async (req) => {
  const clientId = req.params.clientId;

  await sendEvent(clientId, "SSSSSEEEEEEENNTTT");
  return;
});

app.listen(8000, () => console.log("Server is running on port 8000"));
