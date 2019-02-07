import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the ProductNotFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-not-found',
  templateUrl: 'product-not-found.html',
})
export class ProductNotFoundPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  closeModal(){
    this.view.dismiss();


  }


}
