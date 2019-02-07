import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the ConfirmIngredientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-confirm-ingredients',
  templateUrl: 'confirm-ingredients.html',
})
export class ConfirmIngredientsPage {

   ingredients: any;
   check: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api:ApiProvider,
              private toast: ToastController, private alert: AlertController) {

      this.ingredients = this.navParams.get('data');

      console.log(this.ingredients);

  }


  ionViewDidEnter() {


  }

  async confirmIngredients(){

      await this.adding();


      if(this.check == true){
          this.presentAlert();

      } else{
          this.presentToast();
      }




  }

  async adding(){

      for(var x=0; x <this.ingredients.length; x++){

          console.log(this.ingredients[x].id);

          await this.api.addRestrictions(this.ingredients[x].id).then(()=>{

              this.check = true;
              console.log(this.check);
              console.log('supostamente deu');



          }).catch(()=>{

              this.check = false;

          });
      }
  }



    async presentAlert() {
        const alert = await this.alert.create({

            subTitle: 'Tens agora tudo preparado para que possas pôr mãos à obra!',
            message: 'Se precisares de alterar alguma coisa, basta ires à tua área de perfil.' +
                'A equipa Filter deseja-te boa sorte! ',
            buttons: [
                {
                    text: 'ENTENDI',
                    handler: () => {
                        this.navCtrl.setRoot(TabsPage);
                    }
                }]
        });

        await alert.present();
    }


    async presentToast(){
        const toast = await this.toast.create({
            message: 'Algo correu mal e por isso não conseguimos guardar esta informação. Tenta de novo.',
            showCloseButton: true,
            position: 'bottom',
            closeButtonText: 'OK'
        });
        toast.present();
    }

}
