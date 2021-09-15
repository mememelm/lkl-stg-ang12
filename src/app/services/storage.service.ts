import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public init(): string {
    return <string>localStorage.getItem('INIT_TOKEN')
  }

  public token(): string {
    return <string>localStorage.getItem('ACCESS_TOKEN')
  }
}
