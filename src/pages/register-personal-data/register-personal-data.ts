import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {ApiProvider} from "../../providers/api/api";
import {ChooseAvatarPage} from "../choose-avatar/choose-avatar";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the RegisterPersonalDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register-personal-data',
  templateUrl: 'register-personal-data.html',
})
export class RegisterPersonalDataPage {


  name: string;
  email: any;
  password: any;
  confPassword: any;
  msg: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
              private afAuth: AngularFireAuth, private api: ApiProvider, private load: LoadingController, public storage: Storage) {

    this.name = '';
    this.email = '';
    this.password = '';
    this.confPassword = '';


  }



  chooseAvatar(){



    if(this.name && this.name != ''){

      if(this.email && this.email != '') {

        if (this.password == this.confPassword) {

          if (this.password.length > 5) {


            // criar utilizador no firebase

            this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(()=>{


              //criar utilizador na nossa base de dados
              this.api.registerUser(this.name, this.email).then(()=>{


                this.presentLoading();
                this.getID();

                this.storage.set('password', this.password).then().catch();
                this.storage.set('email', this.email).then().catch();

                this.navCtrl.push(ChooseAvatarPage);

              }).catch((error)=>{
                console.log(error);
                this.msg = 'Não foi possível registar os teus dados. Verifica se tens ligação à internet.';
                this.presentToast(this.msg);
              });


            }).catch((error) =>{
              // Handle Errors here.
              console.log(error);
              this.msg = 'Não foi possível registar os teus dados. Verifica se tens ligação à internet.';
              this.presentToast(this.msg);

              // ...
            });



          } else {
            this.msg = 'A password que colocaste tem de ter pelo menos seis dígitos.';
            this.presentToast(this.msg);
          }
        } else {

          this.msg = 'As passwords que colocaste não correspondem. Verifica se estão as duas iguais.';
          this.presentToast(this.msg);

        }
      } else {
        this.msg = 'Por favor, coloque um email válido.';
        this.presentToast(this.msg);
      }

    } else{
      this.msg = 'Por favor, coloque um nome válido.';
      this.presentToast(this.msg);
    }

  }

  async presentToast(msg: string){
    const toast = await this.toast.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK'
    });
    toast.present();
  }


  presentLoading() {

    const loading = this.load.create({
      spinner: null,
      dismissOnPageChange: true,
      content: 'Por favor aguarde.'


    });

    return loading.present();
  }

  async getID(){


    this.api.emailId = this.email;
    this.api.getIdbyEmail().then().catch();
  }
}



