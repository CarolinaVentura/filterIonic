import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ModalController} from "ionic-angular";
import {FeedbackPositivePage} from "../../pages/feedback-positive/feedback-positive";
import {FeedbackNegativePage} from "../../pages/feedback-negative/feedback-negative";
import {ProductNotFoundPage} from "../../pages/product-not-found/product-not-found";

/*
  Generated class for the FeedbackProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedbackProvider {

    public ingredients: any;



  constructor(public http: HttpClient, public  modal: ModalController) {

  }

  whyGet(ingredients: any){
      this.ingredients=ingredients;
  }

  openModal(feedback: boolean, ingredients: any){


      if(feedback == true){
          const modal = this.modal.create(FeedbackPositivePage);
          return modal.present();

      } else{
          const modal = this.modal.create(FeedbackNegativePage, {
              data: ingredients
          });
          return modal.present();

      }

  }


    productNotFound(){
      const modal = this.modal.create(ProductNotFoundPage);
      return modal.present();
  }

}
