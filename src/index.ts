import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";

export default class Serv {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000","http://localhost:63342"]
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
