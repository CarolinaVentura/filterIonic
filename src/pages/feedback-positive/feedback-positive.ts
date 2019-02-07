import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the FeedbackPositivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-feedback-positive',
  templateUrl: 'feedback-positive.html',
})
export class FeedbackPositivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

   closeModal(){
      this.view.dismiss();
   }

}
