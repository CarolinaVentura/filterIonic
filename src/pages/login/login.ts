import { Component } from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth}from '@angular/fire/auth';
import {auth} from 'firebase';
import {ApiProvider} from "../../providers/api/api";
import {TabsPage} from "../tabs/tabs";
import {Storage} from "@ionic/storage";
import {m} from "@angular/core/src/render3";
import {RegisterPersonalDataPage} from "../register-personal-data/register-personal-data";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;
  emailStorage: string;
  passStorage: string ;

  constructor(private api: ApiProvider, public navCtrl: NavController,
              public navParams: NavParams, public afAuth: AngularFireAuth,
              private toast: ToastController, private alertCtrl: AlertController,
              public loadLogin: LoadingController, public storage: Storage) {


    this.passStorage = 'nada';

  }



  clickBtn(){

    this.onLogin(this.email, this.password);
  }



  onLogin(email: string, password: string){


    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(()=>{


      console.log(password);

      var merda = password;

      this.storage.set('email', email).then(
          ()=>{


            this.storage.set('password', merda).then().catch();

          }
      ).catch(()=>{

      });




      this.presentLoading();
      var user = this.afAuth.auth.currentUser;
      this.api.emailId = user.email;

      //definir variavel local com as credenciais




      this.prepareView();






    }).catch(()=>{

      const toastCtrl = this.toast.create({
        message: 'Algo correu mal. Verifica se inseriste corretamente o email ou a password.',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'OK'
      });
      toastCtrl.present();
    });
  }

  async prepareView(){




    await this.api.getIdbyEmail().then(
        (result)=>{
          console.log(result);
          console.log(this.api.userId);
          this.navCtrl.setRoot(TabsPage);


        }).catch((error)=>{
      console.log(error);


      this.loading.dismiss();


    });


  }


  redefinePassByEmail(){


    this.showAlert();



  }


  async showAlert(){

      const alert = await this.alertCtrl.create({


        subTitle: 'Recuperação da password',
        message: 'Coloca abaixo o email com o qual te registaste, para que possamos ajudar-te a recuperar a tua password.',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'Email',
            value: ''
          },],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok');
              var auth = this.afAuth.auth;
              var emailAddress = data.email;
              auth.sendPasswordResetEmail(emailAddress).then(function() {

              }).catch(function(error) {

              });





            }
          }
        ]
      });

      await alert.present();

  }

  presentLoading() {

    this.loading = this.loadLogin.create({
      spinner: null,
      duration: 1000,
      content: 'Por favor aguarde.'


    });
    return this.loading.present();
  }


  goToRegistration(){
    this.navCtrl.push(RegisterPersonalDataPage);
  }

}
