import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShopBridgeUI';

  constructor(private service: NotificationsService) {
    debugger;

  }

  collSucess() {
    this.onSuccess('Colling from constructor');
  }

  onSuccess(message) {
    this.service.success('Item created!', message, {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
}

