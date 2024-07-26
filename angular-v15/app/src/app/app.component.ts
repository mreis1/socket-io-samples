import { Component } from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor() {
    console.log(environment.socketPath)

    const socket = io('/', {path: environment.socketPath, transports: ['websocket'] })
    console.log('Socket Created');
    socket.on("connect", () => {
      console.log('Socket Connected: ' + socket.id );
    })
    socket.on('connection', (socket) => {
      console.log('connection received ' + socket.id);
    })
  }
}
