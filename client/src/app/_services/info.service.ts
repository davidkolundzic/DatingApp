import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }
  public get theme(){
    return localStorage.getItem('my-theme');
  }
  public set theme(name:string){
    localStorage.setItem('my-theme', name)
  }

  public get user(): User{
    return JSON.parse(localStorage.getItem('user'));
  }
  public set user(value: User){
    localStorage.setItem('user', JSON.stringify(value));
  }
}
