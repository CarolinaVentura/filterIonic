import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AddNewRestrictionPage} from "../add-new-restriction/add-new-restriction";

/**
 * Generated class for the ShowRestrictionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-show-restrictions',
  templateUrl: 'show-restrictions.html',
})
export class ShowRestrictionsPage {


    ingredients: any[];
    count: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, private alertController: AlertController) {
  }

  ionViewDidEnter(){
    this.ingredients=[];
    this.getIngredients();
  }



  async getIngredients(){

      console.log('cucu');

    await this.api.getRestrictions()

        .then((result: any)=>{

          console.log(result);
          for( var i = 0; i < result.data.length; i++){
            var ingredient = result.data[i];
            this.ingredients.push(ingredient);

          }



        })
        .catch((error:any)=>{
          console.log('deu merda');
        });

      if(this.ingredients.length <= 0){
          this.count = 1;
      }
      else{
          this.count = 0;
      }
  }

    async eliminate(id, position){



        const alert = await this.alertController.create({

            subTitle: 'Tem a certeza que pretende eliminar?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {


                    }
                }, {
                    text: 'Ok',
                    handler: () => {

                        this.api.eliminateRestriction(id).then()
                            .catch(
                                (error: any)=>{
                                    console.log(error);
                                }
                            );

                        this.ingredients.splice(position, 1);
                        if(this.ingredients.length <= 0){
                            this.count = 1;
                        }
                        else{
                            this.count = 0;
                        }


                    }
                }
            ]
        });

        await alert.present();

        console.log('entrou em eliminar');
        console.log(id);

    }

    addRestriction(){

      this.navCtrl.push(AddNewRestrictionPage, {
          data: this.ingredients
      });
    }

}
