import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public user() {
    return JSON.parse(<string>localStorage.getItem('CURRENT_USER'))
  }

  public token() {
    return <string>localStorage.getItem('ACCESS_TOKEN')
  }
}
