import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from "@ionic/storage";

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {HomePage} from "../pages/home/home";
import {ApiProvider} from "../providers/api/api";
import {ChooseIngredientsPage} from "../pages/choose-ingredients/choose-ingredients";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public api: ApiProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('email').then((result)=>{

        if(result.length > 0){

          this.api.emailId = result;
          console.log(result);

          this.storage.get('password').then((result)=>{
                if(result.length > 0){


                  this.prepareView(result);

                } else{

                    console.log('fodeu');
                  this.rootPage = LoginPage;

                }
          }).catch(()=>{

              console.log('fodeu');
            this.rootPage = LoginPage;

          });

        } else {
            console.log('fodeu');
            this.rootPage = LoginPage;
        }

      }).catch(()=>{

          console.log('fodeu');
          this.rootPage = LoginPage;

      });




    });
  }




  async prepareView(result){


    await this.api.getIdbyEmail().then(
        (result)=>{
          console.log(result);
          console.log(this.api.userId);
            this.rootPage = TabsPage;



        }).catch((error)=>{
      console.log(error);
  })};
}
