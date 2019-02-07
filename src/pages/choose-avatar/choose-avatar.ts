import {Component, ViewChild} from '@angular/core';
import {LoadingController, NavController, NavParams, Slides, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {ChooseIngredientsPage} from "../choose-ingredients/choose-ingredients";

/**
 * Generated class for the ChooseAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-choose-avatar',
  templateUrl: 'choose-avatar.html',
})




export class ChooseAvatarPage {


    @ViewChild(Slides) slides: Slides;
    currentIndex: number;
    path: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private api: ApiProvider, private toast: ToastController, private load: LoadingController) {

      this.path= '';
      this.currentIndex = 0;
  }


    slideIndex(){
        this.currentIndex = this.slides.getActiveIndex();
        console.log(this.currentIndex);
    }


  async chooseThisOne(){



            switch (this.currentIndex) {

                case 0:
                    this.path = 'assets/imgs/avatar1.png';
                    break;

                case 1:
                    this.path = 'assets/imgs/avatar2.png';
                    break;

                case 2:
                    this.path = 'assets/imgs/avatar3.png';
                    break;

                case 3:
                    this.path = 'assets/imgs/avatar4.png';
                    break;

                case 4:
                    this.path = 'assets/imgs/avatar5.png';
                    break;

                case 5:
                    this.path = 'assets/imgs/avatar6.png';
                    break;

                case 6:
                    this.path = 'assets/imgs/avatar7.png';
                    break;

                case 7:
                    this.path = 'assets/imgs/avatar8.png';
                    break;

                case 8:
                    this.path = 'assets/imgs/avatar9.png';
                    break;

                case 9:
                    this.path = 'assets/imgs/avatar10.png';
                    break;
            }


      this.api.updateImgUser(this.path).then(()=>{

          this.presentLoading();

          this.navCtrl.push(ChooseIngredientsPage);

      }).catch(()=>{

          this.presentToast();
      });


  }


    presentToast(){
        const toast = this.toast.create({
            message: 'Algum erro ocorreu e não foi possível associar o avatar escolhido ao teu perfil. Por verifica se tens ligação à internet.',
            showCloseButton: true,
            position: 'bottom',
            closeButtonText: 'OK'
        });
        toast.present();
    }


    presentLoading() {

        const loading = this.load.create({
            spinner: null,
            dismissOnPageChange: true,
            content: 'Por favor aguarde.'


        });

        return loading.present();
    }

}
