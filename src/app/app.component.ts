import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './pushNotification.service';

const VAPID_PUBLIC = 'BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-push-notifications';

  constructor(swPush: SwPush, pushService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC
        })
        .then(subscription => {
          console.log({subscription})
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);

        swPush.notificationClicks
        .subscribe( (e) =>{
          console.log({e})
          window.open( 'http://localhost:8080/' );
        } );
    }

    swPush.messages.subscribe((message: any) => {
      // const a: any = message;
      console.log({message});
      // window.open(message?.data?.url);
    });

    // swPush.notificationClicks.subscribe(({ action, notification }) => {
    //   const a: any = notification;
    //   console.log( 1 ,{notification, action, a })
    //   // window.open(a.data.url);
    // });
  }
}
