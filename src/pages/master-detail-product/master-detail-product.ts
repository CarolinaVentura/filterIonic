import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {FeedbackProvider} from "../../providers/feedback/feedback";

/**
 * Generated class for the MasterDetailProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-master-detail-product',
  templateUrl: 'master-detail-product.html',
})
export class MasterDetailProductPage {

  productId: number;
  productName: any;
  product: any;
  barcode: number;
  ingredients: any;
  restrictions: any [];
  cagalhoto: any [];
  nada: any;
  feed: boolean;

  constructor(public api: ApiProvider, public navCtrl: NavController,
              public navParams: NavParams, private view: ViewController,
              private feedback: FeedbackProvider) {
  }

  async ionViewDidEnter() {

    this.cagalhoto=[];
    this.product = [];
    this.ingredients = [];
    this.productId = this.navParams.get('data');

    console.log(this.productId);

   await this.api.getProduct(this.productId).then((result: any)=>{

      console.log(result);
      this.product = result;
      this.productName = result.name;
      this.barcode = result.barcode;


      this.api.getIngredientsOfProduct(this.productId).then((result: any)=>{
        this.ingredients = result.data;
        this.getFeedback();
        console.log(result);
      }).catch();



    }).catch((error)=>{
      console.log(error);
    })
  }


  getFeedback(){

    this.api.getRestrictions().then((result: any)=> {

      this.restrictions = result.data;

      for (var i = 0; i < this.ingredients.length; i++) {

        for (var a = 0; a < this.restrictions.length; a++) {


          if (this.ingredients[i].id == this.restrictions[a].id) {
            //adicionar nnum array que n pode consurmir este ingrediente
            //variavel boleana para dizer se pode ou nao cosnumir


            this.cagalhoto.push(this.ingredients[i]);

          }

        }

      }

      if (this.cagalhoto.length > 0) {


        //this.presentLoading();
        this.feed = false;
        this.cagalhoto = [];

      } else {
        this.feed = true;

      }


    });
  }


  closeModal(){
    this.view.dismiss();
  }

}
