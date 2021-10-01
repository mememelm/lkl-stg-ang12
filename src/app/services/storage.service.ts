import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public token() {
    return <string>localStorage.getItem('ACCESS_TOKEN')
  }

  public user() {
    return JSON.parse(<string>localStorage.getItem('CURRENT_USER'))
  }

  public agency() {
    return JSON.parse(<string>localStorage.getItem('AGENCY'))
  }

  public company() {
    return JSON.parse(<string>localStorage.getItem('COMPANY'))
  }

  public action() {
    return <string>localStorage.getItem('AC')
  }

  public category() {
    return JSON.parse(<string>localStorage.getItem('CATEGORY'))
  }

  public place() {
    return JSON.parse(<string>localStorage.getItem('PLACE'))
  }

  public setAction() {
    return localStorage.setItem('AC', '_')
  }

  public removeAction() {
    return localStorage.removeItem('AC')
  }
}
