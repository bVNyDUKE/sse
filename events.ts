import { Request, Response } from "express";

const eventHeaders = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

type Message = {
  message: string;
};

function writeData(data: Message): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

const clients = new Map<string, Response>();

export async function sendEvent(clientId: string, message: string) {
  const conn = clients.get(clientId);
  if (!conn) {
    console.error(`NO CLIENT FOUND FOR ID ${clientId}`);
    return;
  }

  console.log("SENDING MESSAGE TO", conn, message);

  conn.write(writeData({ message }));
}

export async function eventsHandler(req: Request, res: Response) {
  res.writeHead(200, eventHeaders);
  res.write(writeData({ message: "Hello from events" }));

  const clientId = "TESTCLIENT1";

  clients.set(clientId, res);
  console.log(`CLIENT CONNECTED: ${clientId}`);

  req.on("close", () => {
    console.log(`Client id:${clientId} has disconnected`);
    clients.delete(clientId);
  });
}
