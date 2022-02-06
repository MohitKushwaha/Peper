import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {

  opened: boolean = false;
  constructor() {
    super("Peper");
    this.version(1).stores({
      pepers: "milli, archive",
      profile: "email"
    });
  }

  openMyDB() {
    if(!this.opened)
      this.open()
      .then(data => this.opened = true)
      .catch(err => console.log(err.message));
  }
}

export interface IPeper {
  email: string,
  milli: number,
  heading: string,
  content: string,
  archive: boolean,
  latest: number
}

export interface IProfile {
  email: string,
  name: string
}