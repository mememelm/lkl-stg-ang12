import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setLocalString(local: string, value: string): void {
    localStorage.setItem(local, value)
  }

  public setLocalObject(local: string, value: Object): void {
    localStorage.setItem(local, JSON.stringify(value))
  }

  public getLocalString(local: string): string {
    return <string>localStorage.getItem(local)
  }

  public getLocalObject(local: string): void {
    return JSON.parse(<string>localStorage.getItem(local))
  }
}
