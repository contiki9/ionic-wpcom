import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/index';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobPro } from '@ionic-native/admob-pro';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { WordpressProvider } from '../providers/wordpress/wordpress';

import { HeaderComponentModule } from '../pages/header/header.module';
import { SidebarComponentModule} from '../pages/template-parts/sidebar/sidebar.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StoreModule.provideStore(reducer),
    IonicStorageModule.forRoot(),
    HeaderComponentModule,
    SidebarComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AdMobPro,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WordpressProvider
  ]
})
export class AppModule {}
