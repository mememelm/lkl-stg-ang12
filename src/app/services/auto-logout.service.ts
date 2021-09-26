import { ControllerService } from './controller.service';
import { Injectable } from '@angular/core';

const minLogout = 10
const checkInterval = 5000
const storeKey = 'action'

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  constructor(private ctrl: ControllerService) { }

  getLastAction() {
    return parseInt(<string>localStorage.getItem(storeKey))
  }

  setLastAction(lastAction: number) {
    localStorage.setItem(storeKey, lastAction.toString())
  }

  reset() {
    this.setLastAction(Date.now())
  }

  initInterval() {
    setInterval(() => {
      this.checkTime()
    }, checkInterval)
  }

  checkTime() {
    const dateNow = Date.now()
    const timeLeft = this.getLastAction() + minLogout * 60 * 1000
    const diff = timeLeft - dateNow
    const isTimeout = diff < 0
    if (isTimeout) {
      this.ctrl.core.logout()
    }
  }

  storageEvent() {
    localStorage.getItem(storeKey)
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset())
    document.body.addEventListener('mouseover', () => this.reset())
    document.body.addEventListener('mouseout', () => this.reset())
    document.body.addEventListener('keydown', () => this.reset())
    document.body.addEventListener('keyup', () => this.reset())
    document.body.addEventListener('keypress', () => this.reset())
    window.addEventListener('storage', () => this.storageEvent())
  }
}
