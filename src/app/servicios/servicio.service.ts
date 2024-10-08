import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private userName: string = 'Username';

  constructor() { }

  setUserName(name: string){
    this.userName = name;
  }

  getUserName(): string{
    return this.userName;
  }
}
