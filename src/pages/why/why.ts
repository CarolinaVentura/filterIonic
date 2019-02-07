import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FeedbackProvider} from "../../providers/feedback/feedback";


/**
 * Generated class for the WhyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-why',
  templateUrl: 'why.html',
})
export class WhyPage {


    ingredients: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewDidLoad(){

    this.ingredients = this.navParams.get('data');

  }


}
