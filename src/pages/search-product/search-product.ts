import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {MasterDetailProductPage} from "../master-detail-product/master-detail-product";
import {FeedbackPositivePage} from "../feedback-positive/feedback-positive";

/**
 * Generated class for the SearchProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-search-product',
  templateUrl: 'search-product.html',
})
export class SearchProductPage {

  products: any;
  productsFiltered: any;
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, private modal: ModalController) {
  }

  ionViewDidEnter() {
    this.products = [];
    this.api.getProducts().then((result: any)=>{

      this.products = result;
      this.productsFiltered = result;
      console.log(this.products);

    }).catch();

    this.setFilteredItems();
  }

  more(id: number){
    const modal = this.modal.create(MasterDetailProductPage, {
      data: id,
    });
    return modal.present();
  }

  setFilteredItems() {


    this.productsFiltered = this.filterItems(this.searchTerm);

    console.log(this.productsFiltered);

  }

  filterItems(searchTerm){

    return this.products.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }
}
