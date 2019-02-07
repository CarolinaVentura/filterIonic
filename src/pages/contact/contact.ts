import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {ShowRestrictionsPage} from "../show-restrictions/show-restrictions";
import {ShowFavouritesPage} from "../show-favourites/show-favourites";
import {EditProfilePage} from "../edit-profile/edit-profile";
import {LoginPage} from "../login/login";
import {AngularFireAuth} from "@angular/fire/auth";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


    email: string;
    name: string;
    avatar: string;

  constructor(public navCtrl: NavController, private api: ApiProvider,
              private afAuth: AngularFireAuth, private alert: AlertController,
              public storage: Storage) {

  }

  ionViewWillEnter(){


          this.name = this.api.userName;
          this.email = this.api.emailId;
          this.avatar = this.api.avatar;
          console.log(this.avatar); 


  }



  gotoRestrictions() {
      this.navCtrl.push(ShowRestrictionsPage);
  }

  gotoFavourites() {
      this.navCtrl.push(ShowFavouritesPage);
  }

  editProfile(){

     this.navCtrl.push(EditProfilePage);

  }



   async logOut(){
      console.log('merda');


        let alert =  this.alert.create({

            message: 'Tem a certeza que pretende sair?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Sim',
                    handler: () => {

                        this.afAuth.auth.signOut();

                        //retirar as credenciais do storage
                        this.cleanCache();



                    }
                }
            ]
        });
        alert.present();

    }

  /*

    gotoLogin(){
        this.afAuth.auth.signOut();
        this.navCtrl.setRoot(LoginPage);
    }
    */


  async cleanCache (){

      await this.storage.remove('email');
      await this.storage.remove('password');

      window.location.reload();
      this.navCtrl.setRoot(LoginPage);


  }
}
