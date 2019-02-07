import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the ShowFavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-show-favourites',
    templateUrl: 'show-favourites.html',
})
export class ShowFavouritesPage {

    favourites: any[];
    count: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams,  private api: ApiProvider, private alertController: AlertController) {
    }

    ionViewDidEnter() {
        this.favourites=[];
        this.getFav();
    }


    async getFav(){

        await this.api.getFavourites()

            .then((result: any)=>{

                for( var i = 0; i < result.data.length; i++){
                    var favourite = result.data[i];
                    this.favourites.push(favourite);
                }


            }).catch((error)=>{
                console.log('deu merda');
            });

        if(this.favourites.length <= 0){
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

                        this.api.eliminateFavourite(id).then(

                            (result)=>{

                                var bool = 0;
                                this.api.defineFav(id, bool).then().catch();
                            }

                        )
                            .catch(
                                (error: any)=>{
                                    console.log(error);
                                }
                            );



                        this.favourites.splice(position, 1);
                        if(this.favourites.length <= 0){
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

}
