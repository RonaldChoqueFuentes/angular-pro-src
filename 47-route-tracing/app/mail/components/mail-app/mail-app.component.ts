import { Component } from '@angular/core';

@Component({
  selector: 'mail-app',
  styleUrls: ['mail-app.component.scss'],
  template: `
    <div class="mail">
      <router-outlet></router-outlet>
    </div>
    <div class="mail">
      <router-outlet name="pane"></router-outlet>
    </div>
  `
})
export class MailAppComponent {

  onActivate(event){
   console.log('activate', event);
  }

  onDeactivate(event){
    console.log('deactivate', event);
  }
}
