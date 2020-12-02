import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConstant } from '../assets/app-constant';

@Injectable({
  providedIn: 'root'
})
export class MytoasterService {

  messageTextListner = new Subject<string>();
  messageTypeListner = new Subject<string>();
  messageDuration = new Subject<number>();
  isShowMsgListner = new Subject<boolean>();
  messageSuffix = '  ';
  delayTimerToast: NodeJS.Timer;
  interval: NodeJS.Timer;

  constructor() {
    this.hideNotification();
  }

  showNotification() {
    this.isShowMsgListner.next(true);
  }
  hideNotification() {
    this.isShowMsgListner.next(false);
  }

  notifySuccessMsg(msgText: string) {
    this.notifyMessage(msgText, AppConstant.notification.type.success);
  }

  notifyInfoMsg(msgText: string) {
    this.notifyMessage(msgText, AppConstant.notification.type.info);
  }

  notifyWarningMsg(msgText: string) {
    this.notifyMessage(msgText, AppConstant.notification.type.warning);
  }

  notifyErrorMsg(msgText: string) {
    this.notifyMessage(msgText, AppConstant.notification.type.error);
  }

  notifyMessage(msgText: string, type: string) {
    // validation
    if (type === '' || type === undefined || type === null) {
      return;
    }
    if (msgText === '' || msgText === undefined || msgText === null) {
      return;
    }

    this.messageTypeListner.next(type);
    this.messageTextListner.next(msgText + this.messageSuffix);
    this.showNotification();
    this.clearTimer();

    switch (type) {
      case AppConstant.notification.type.success: {
        this.hideToastAfter(AppConstant.notification.duration.success);
        this.messageDuration.next(AppConstant.notification.duration.success);
        break;
      }
      case AppConstant.notification.type.info: {
        this.hideToastAfter(AppConstant.notification.duration.info);
        this.messageDuration.next(AppConstant.notification.duration.info);
        break;
      }
      case AppConstant.notification.type.warning: {
        this.hideToastAfter(AppConstant.notification.duration.warning);
        this.messageDuration.next(AppConstant.notification.duration.warning);
        break;
      }
      case AppConstant.notification.type.error: {
        this.hideToastAfter(AppConstant.notification.duration.error);
        this.messageDuration.next(AppConstant.notification.duration.error);
        break;
      }
      default:
        break;

    }
  }
  hideToastAfter(delay: number) {
    this.delayTimerToast = setTimeout(() => this.hideNotification(), delay);

  }

  ngOnDestroy() {
    this.clearTimer();
  }

  clearTimer() {
    clearTimeout(this.delayTimerToast);
  }
}

