import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {WhyPage} from "../why/why";


/**
 * Generated class for the FeedbackNegativePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-feedback-negative',
  templateUrl: 'feedback-negative.html',
})
export class FeedbackNegativePage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {


  }




  closeModal(){
     this.view.dismiss();
  }


  goToPage(){
    this.navCtrl.push(WhyPage, {

      data: this.navParams.get('data'),

    });

  }

}
