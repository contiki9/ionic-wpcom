import { Component } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { IPage } from './_shared/sidebar/sidebar.component';

// import {DELETE as DELETE1, REGISTER as REGISTER1} from "../../_old/src/reducers/search";
// import {REGISTER as REGISTER2} from "../../_old/src/reducers/current";

import { IAppState } from '../interfaces/store';
import { ISite } from '../interfaces/wordpress';
import { WordpressProvider } from '../providers/wordpress/wordpress';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // rootPage = 'Archive';
  public intervalCurrentPage: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public store: Store<IAppState>,
  ) {
    this.initializeApp();
  }

  public ionViewDidLeave() {
    clearInterval(this.intervalCurrentPage);
  }

  public handleSetRootPage(clickPage: IPage) {
    let createdUrl: string;
    if (clickPage.component === 'page') {
      createdUrl = `/${clickPage.component}/${clickPage.params.postID}`;
    } else if (clickPage.component === 'category') {
      createdUrl = `/${clickPage.component}/${clickPage.ID}`;
    } else {
      createdUrl = clickPage.component;
    }
    console.log(clickPage);

    this.navCtrl.navigateRoot(createdUrl);
  }
  //
  // handlesetSearchKeyword(keyword) {
  //   this.store.dispatch({ type: REGISTER1, payload: { keyword: keyword } });
  // }
  //
  // handlestartSearch() {
  //   if (this.nav.getActive().id != 'Search') {
  //     this.nav.setRoot('Search');
  //   }
  // }
  //
  // handlecancelSearchKeyword() {
  //   this.store.dispatch({ type: DELETE1 });
  // }
  //
  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // this.intervalCurrentPage = window.setInterval(() => {
    //   // if (this.nav.getActive()) {
    //   //   this.store.dispatch({
    //   //     type: REGISTER2,
    //   //     payload: { page: this.nav.getActive().id, opt: this.nav.getActive().data },
    //   //   });
    //   // }
    // }, 1000);
  }
}
