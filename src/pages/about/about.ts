import { Component } from '@angular/core';
import {
    AlertController,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {LoginPage} from "../login/login";
import {AngularFireAuth} from "@angular/fire/auth";
import {Storage} from "@ionic/storage";
import {MasterDetailProductPage} from "../master-detail-product/master-detail-product";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  products: any[];
  email: string;
  counter: number = 0;
  count: number =1;


    constructor(public api: ApiProvider, public navParams: NavParams, private afAuth: AngularFireAuth,
                private alert: AlertController, private nav: NavController, public storage: Storage,
                private toast: ToastController, private modal: ModalController) {

  }

        async  ionViewDidEnter(){


        console.log(this.afAuth.auth.currentUser);

        if (this.counter ==0){
            this.counter =1;

            } else{}

        this.products=[];

        this.getProducts();

      }



    more(id: number){
        const modal = this.modal.create(MasterDetailProductPage, {
            data: id,
        });
        return modal.present();
    }


      async getProducts(){
        await this.api.getHistory()
            .then((result: any)=>{

                if(result.data.length <=0){
                    this.count = 0;
                } else{
                    this.count = 1;
                }

                console.log(this.count);

                  for( var i = 0; i < result.data.length; i++){

                        var product = result.data[i];
                        this.products.push(product);


                      if(this.products.length>30){

                          this.api.detachProductHistory(product[31].id).then().catch();
                      }
                  }




            })
            .catch((error:any)=>{
              console.log('Por alguma razão não conseguimos aceder à nossa base de dados. Pedimos desculpa.')
            })
      }




      //favoritar
      toFavor(id: number, i: number){


            var boolean = 1;
            this.api.defineFav(id, boolean ).then().catch();
            this.api.toFavor(id).then().catch();

            this.products[i].pivot.fav = 1;




      }

      //desfavoritar
      takeFavor(id: number, i: number){

            var boolean = 0;
            this.api.defineFav(id, boolean).then().catch();
            this.api.eliminateFavourite(id).then().catch();
            //falta eliminar dos favoritos

            this.products[i].pivot.fav = 0;

        }



        logOut(){


            let alert = this.alert.create({

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


    async cleanCache (){
        await this.storage.remove('email');
        await this.storage.remove('password');

        window.location.reload();
        this.nav.setRoot(LoginPage);


    }

    presentToast(){

        const toastCtrl = this.toast.create({
            message: 'supostamente removeu uma linha.',
            showCloseButton: true,
            position: 'bottom',
            closeButtonText: 'OK'
        });
        toastCtrl.present();

    }
}
