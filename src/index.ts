import { Server } from "./server";
import './config/mongoose'

const server = new Server();
server.start();
