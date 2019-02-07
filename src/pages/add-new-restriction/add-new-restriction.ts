import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {ContactPage} from "../contact/contact";

/**
 * Generated class for the AddNewRestrictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-new-restriction',
  templateUrl: 'add-new-restriction.html',
})
export class AddNewRestrictionPage {

  ingredients: any[];
  states: any;
  restrictions: any [];
  attach: any [];
  detach: any [];
  searchTerm: string = '';
  ingredientsFiltered: any ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
  }

  async ionViewDidEnter() {
    this.states=[];
    this.attach=[];
    this.detach=[];


    this.restrictions = [];
    this.restrictions= this.navParams.get('data');

    this.ingredients=[];


    await this.getIngredients();
    this.setFilteredItems();
  }



  setFilteredItems() {


    this.ingredientsFiltered = this.filterItems(this.searchTerm);

    console.log(this.ingredientsFiltered);

  }

  filterItems(searchTerm){

    return this.states.filter((state) => {
      return state.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }

  async getIngredients(){

    await this.api.getAllIngredients()

        .then((result: any)=>{

          for( var i = 0; i < result.length; i++){
            var ingredient = result[i];


            this.ingredients.push(ingredient);
            this.states.push({ 'value': false, 'id': ingredient.id, 'name': ingredient.name});


          }




          for(var x = 0; x < this.restrictions.length; x++){

            for(var a = 0; a < this.states.length; a++){


              if (this.states[a].id == this.restrictions[x].id){
                this.states[a].value = true;
              }

            }

          }

          this.ingredientsFiltered = this.states;


        }).catch((error: any)=>{
          console.log(error);
        });

  }


  checkFunction(index){

    if(this.ingredientsFiltered[index].value != true){
      this.ingredientsFiltered[index].value = true;
    }else{
      this.ingredientsFiltered[index].value = false;
    }

    console.log(this.ingredientsFiltered);

  }

  checkedOrUnchecked(){

    this.attach = [];
    this.detach = [];

    for(var i = 0; i < this.ingredientsFiltered.length; i++){

      if(this.ingredientsFiltered[i].value == false){

        this.detach.push(this.ingredientsFiltered[i].id)
      }else{
        this.attach.push(this.ingredientsFiltered[i].id)
      }

    }

    console.log(this.attach);
    console.log(this.detach);

    this.makeRequest();

  }

  async makeRequest(){

    //adicionar

    await this.api.eliminateRestriction2(this.detach).then(()=>{}).catch(()=>{});

    this.api.addRestrictions2(this.attach).then(()=>{}).catch(()=>{});


    this.navCtrl.pop();


  }

}
