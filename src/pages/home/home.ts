import { Component } from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {ApiProvider} from "../../providers/api/api";
import { AlertController } from 'ionic-angular';
import {FeedbackProvider} from "../../providers/feedback/feedback";
import {LoginPage} from "../login/login";
import {AngularFireAuth} from "@angular/fire/auth";
import {Storage} from "@ionic/storage";
import {SearchProductPage} from "../search-product/search-product";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options:BarcodeScannerOptions;
  scannedData: any = {};
  resultScan: any;
  nada: any;
  idProduct: number;
  message: any[];
  TextMessage: string = '';
  ingredients: any[];
  restrictions: any [];
  cagalhoto: any [];
  feedback: boolean; // true= pode consumir | false = não pode consumir


  constructor(public scanner: BarcodeScanner, private alert:AlertController,
              private  api: ApiProvider, public feed: FeedbackProvider,
              private load: LoadingController, private afAuth: AngularFireAuth,
              public storage: Storage, private nav: NavController) {

  }


    ionViewDidEnter(){
        this.cagalhoto=[];

    }

  scan(){

    this.options= {
      prompt: 'Scan your barcode'
    };

    this.scanner.scan().then((data)=>{

        this.scannedData = data;


            if(this.scannedData){

                this.presentLoading();
                this.makeRequest(this.scannedData.text);

            }


    }, (err)=>{
            console.log(err);

    });

  };


    presentLoading() {

        const loading = this.load.create({
            spinner: null,
            duration: 1500,
            content: 'Por favor aguarde.'


        });
        return loading.present();
    }


    makeRequest(barcode){

        this.api.searchBarcode(barcode).then((result: any) => {

            this.resultScan = result.data[0];



            if (this.resultScan) {


                this.idProduct = this.resultScan.id;

                this.api.getIngredientsOfProduct(this.idProduct).then((result: any) => {

                    this.ingredients = result.data;



                    this.api.getRestrictions().then((result: any)=>{



                            this.restrictions = result.data;

                            for (var i = 0; i < this.ingredients.length; i++){

                                for(var a = 0; a < this.restrictions.length; a++){



                                    if (this.ingredients[i].id == this.restrictions[a].id){
                                        //adicionar nnum array que n pode consurmir este ingrediente
                                        //variavel boleana para dizer se pode ou nao cosnumir
                                        this.TextMessage= 'é igual';

                                        this.cagalhoto.push(this.ingredients[i]);






                                    } else{
                                        this.TextMessage= 'é diferente'; }
                                }
                            }

                            if(this.cagalhoto.length>0){


                                //this.presentLoading();
                                this.feedback = false;
                                this.feed.openModal(false, this.cagalhoto);
                                this.cagalhoto= [];

                            } else{
                                this.feedback=true;
                                this.feed.openModal(true, this.nada);
                            }

                            this.api.postHistory(this.idProduct,this.feedback).then((result: any)=>{

                                this.message=result.data;

                            }).catch((error: any)=>{
                                this.message = error.msg;
                            });


                        }

                    ).catch((error: any)=>{

                        }
                    );



                }).catch((error: any) => {


                });


            } else {

                console.log(result);
                this.feed.productNotFound();
            }


        }).catch((error: any) => {
            console.log(error);
            this.feed.productNotFound();


        });
    }




    async pop() {


        const alert = this.alert.create({
            subTitle: 'Digite aqui o código de barras do produto.',
            inputs: [
                {
                    name: 'barcode',
                    type: 'number',
                    placeholder: 'código de barras',
                }
            ],
            buttons: [{
                text: 'cancelar',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            },
                {
                    text: 'scan',
                    handler: data => {

                        console.log('Scan');
                        this.makeRequest(data.barcode);

                    }

                }]
        });

        await alert.present();
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


    searchProduct(){

        this.nav.push(SearchProductPage);

    }
}
