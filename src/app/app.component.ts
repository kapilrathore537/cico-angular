import { Component, OnDestroy, OnInit } from '@angular/core';
import { DisableRightClickService } from './service/disable-right-click.service';
import { JavaScriptLoaderService } from './service/java-script-loader.service';
import { LoginService } from './service/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { QRServiceService } from './service/qrservice.service';
import { SocketServiceService } from './service/socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {


  title = 'CiCO';

  constructor(private jsLoader: JavaScriptLoaderService, private rightClickDisable: DisableRightClickService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    //this.rightClickDisable.disableRightClick();
    this.jsLoader.ScriptLoader('rightSideBar.js');

    if (this.loginService.isLoggedIn() && this.loginService.getRole() == 'ADMIN') {
      console.log('admin');

      if (!this.loginService.isTokenExpired())
        this.router.navigate(['admin']);
      else {
        this.loginService.logout();
        this.router.navigate(['login']);
      }
    }

    if (this.loginService.isLoggedIn() && this.loginService.getRole() == 'STUDENT') {
      console.log('student');

      if (!this.loginService.isTokenExpired())
      {
        this.router.navigate(['student']);
      }
      else {
        this.loginService.logout();
        this.router.navigate(['']);
      }
    }


    // for managing the routes ///////


//     // Listen for router events
//     this.router.events.subscribe((event: any) => {
//       if (event instanceof NavigationEnd) {
//         // Store the state of the named outlets in local storage
//         const state = {
//           url: event.url // Store just the URL
//         };
//         sessionStorage.setItem('namedOutletState', JSON.stringify(state));
//       }
//     });

//     // Check if there is any stored state for named outlets
//     const storedState = sessionStorage.getItem('namedOutletState');
//     if (storedState) {
//       const state = JSON.parse(storedState);
//       // Navigate to the named outlets using the stored URL
//       const decodedUrl = decodeURIComponent(state.url);
//       this.router.navigateByUrl(decodedUrl); // Use navigateByUrl instead of navigate
//     }
 }
}
