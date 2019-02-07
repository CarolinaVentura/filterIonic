import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AngularFireAuth} from "@angular/fire/auth";
import {ContactPage} from "../contact/contact";

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  name: string;
  email: string;
  inputName: string;
  inputEmail: string;
  inputPass: any;
  msg: string;
  msgTrue: string = '';
  check: boolean;



  constructor(private api: ApiProvider, private alert: AlertController, private afAuth: AngularFireAuth,
              public navCtrl: NavController, private toast: ToastController) {


  }

  ionViewDidLoad() {

    this.email=this.api.emailId;
    this.name = this.api.userName;
    this.check = true;


  }


  makeChanges(){

      this.presentAlert();

  }


  async presentAlert() {

    const alert = this.alert.create({
      subTitle: 'Para que possamos efetuar as alterações, precisamos que insira a sua password atual.',
        inputs: [
            {
                name: 'password',
                type: 'password',
                placeholder: '***********'
            }],
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
          {
              text: 'Sim',
              handler: (data) => {

                  this.verification(data.password);


              }
          }
      ]



    });

    await alert.present();

  }


  async getToast(message: string) {

      const toast = await this.toast.create({
          message: message,
          showCloseButton: true,
          position: 'bottom',
          closeButtonText: 'OK'
      });

      toast.present();
  }


 async verification(pass){

     var user = this.afAuth.auth.currentUser;

     this.afAuth.auth.signOut();

      await this.afAuth.auth.signInWithEmailAndPassword(this.email, pass).then( (result)=>{


          if (this.inputEmail && this.inputEmail != this.email && this.inputEmail != '') {

              this.updateEmail(user);

          }

          console.log('bia');


          //DONE
          if (this.inputPass && this.inputPass != '') {

              this.updatePass(user);

          }


          //DONE
          if (this.inputName && this.inputName != '') {

              this.updateUsername(user);

          }


      }).catch((error)=>{

          this.msg = 'Algo correu mal. Verifique se ao confirmar a alteração colocou a credencial corretamente.';
          this.getToast(this.msg);
      });


      console.log('carolina');



  }

 async updateEmail(user){

      await user.updateEmail(this.inputEmail).then(() => {
          // Update successful.

          this.api.changeEmail(this.inputEmail);
          this.api.emailId = this.inputEmail;
          this.msg = 'Email alterado com sucesso.';
          this.getToast(this.msg);


      }).catch( (error) =>{
          // An error happened.

          this.check = false;
          this.msg = 'Não foi possível alterar o email.';
          this.getToast(this.msg);
      });

  }

  async updatePass(user){
     await user.updatePassword(this.inputPass).then( (result)=> {
          // Update successful.
          this.msg = 'Password alterada com sucesso.';
          this.getToast(this.msg);


     }).catch((error)=> {
          // An error happened.
          this.check = false;
          this.msg = 'Não foi possível alterar a password. Verifica se tens no mínimo seis caracteres.';
          this.getToast(this.msg);
      });
  }

  async updateUsername(user){
      //fazer  pedido à api
      await this.api.changeUsername(this.inputName).then((result)=>{

          console.log('ela entrou2');
          this.msg = 'Username alterado com sucesso.';
          this.getToast(this.msg);


      }).catch( (error)=>{

          this.check = false;
          this.msg = 'Não foi possível alterar o username. Tente novamente.';
          this.getToast(this.msg);
      });

  }


}
