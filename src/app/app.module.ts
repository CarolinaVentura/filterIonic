import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FeedbackPositivePage } from '../pages/feedback-positive/feedback-positive';
import { FeedbackNegativePage } from '../pages/feedback-negative/feedback-negative';
import {ProductNotFoundPage} from "../pages/product-not-found/product-not-found";
import {WhyPage} from "../pages/why/why";
import {ShowFavouritesPage} from "../pages/show-favourites/show-favourites";
import {ShowRestrictionsPage} from "../pages/show-restrictions/show-restrictions";
import {LoginPage} from "../pages/login/login";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'



import {IonicStorageModule} from "@ionic/storage";
import {AngularFireModule} from '@angular/fire'
import {AngularFireAuth}from '@angular/fire/auth';


import { ApiProvider } from '../providers/api/api';
import { FeedbackProvider } from '../providers/feedback/feedback';
import {config} from "./app.firebase.config";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {RegisterPersonalDataPage} from "../pages/register-personal-data/register-personal-data";
import {ChooseAvatarPage} from "../pages/choose-avatar/choose-avatar";
import {ChooseIngredientsPage} from "../pages/choose-ingredients/choose-ingredients";
import {ConfirmIngredientsPage} from "../pages/confirm-ingredients/confirm-ingredients";
import {AddNewRestrictionPage} from "../pages/add-new-restriction/add-new-restriction";
import {SearchProductPage} from "../pages/search-product/search-product";
import {MasterDetailProductPage} from "../pages/master-detail-product/master-detail-product";





@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FeedbackNegativePage,
    FeedbackPositivePage,
    ProductNotFoundPage,
    WhyPage,
    ShowFavouritesPage,
    ShowRestrictionsPage,
    LoginPage,
    EditProfilePage,
    RegisterPersonalDataPage,
    ChooseAvatarPage,
    ChooseIngredientsPage,
    ConfirmIngredientsPage,
    AddNewRestrictionPage,
    SearchProductPage,
      MasterDetailProductPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), IonicStorageModule,AngularFireModule.initializeApp(config.firebase),
      HttpModule, HttpClientModule, IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FeedbackNegativePage,
    FeedbackPositivePage,
    ProductNotFoundPage,
    WhyPage,
    ShowFavouritesPage,
    ShowRestrictionsPage,
    LoginPage,
    EditProfilePage,
    RegisterPersonalDataPage,
    ChooseAvatarPage,
    ChooseIngredientsPage,
    ConfirmIngredientsPage,
    AddNewRestrictionPage,
    SearchProductPage,
      MasterDetailProductPage,




  ],
  providers: [
    StatusBar, BarcodeScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    FeedbackProvider,
    AngularFireAuth

  ]
})
export class AppModule {}
