import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import 'rxjs/add/operator/debounceTime';
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {ConfirmIngredientsPage} from "../confirm-ingredients/confirm-ingredients";


/**
 * Generated class for the ChooseIngredientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-choose-ingredients',
  templateUrl: 'choose-ingredients.html',
})
export class ChooseIngredientsPage {

  ingredients: any [];
  searchTerm: string = '';
  ingredientsFiltered: any ;
  states: any [];
  toAdd: any [];
  toAddNames: any [];
  final: any [];
  finalNames: any [];
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {


      this.states=[];
      this.toAdd=[];
      this.toAddNames=[];
      this.final=[];
      this.finalNames=[];
      this.ingredients=[];
      this.data = [];
      this.getIngredients();


  }


  async ionViewDidLoad(){

    this.setFilteredItems();

  }


  setFilteredItems() {


    this.ingredientsFiltered = this.filterItems(this.searchTerm);

    console.log(this.ingredientsFiltered);

  }

  filterItems(searchTerm){

    return this.ingredients.filter((ingredient) => {
      return ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }





  async getIngredients(){

    await this.api.getAllIngredients()

        .then((result: any)=>{

          this.ingredientsFiltered = result;


          for( var i = 0; i < result.length; i++){
            var ingredient = result[i];
            this.ingredients.push(ingredient);


          }

        }).catch((error: any)=>{
          console.log(error);
        });

  }


    checkFunction(id, position, name){

        this.toAdd[position] = id;
        this.toAddNames[position] = name;

        if(this.states[position] != true){
            this.states[position] = true;
        }else{
            this.states[position] = false;
        }



    }

    async goto(){



        await this.asyncTasks();
        await this.navCtrl.push( ConfirmIngredientsPage, {
            data: this.data,
        });


        this.final = [];
        this.finalNames = [];
        this.data = [];

        console.log(this.final);

    }


    asyncTasks(){

        for(var i = 0; i < this.states.length; i++){

            if(this.states[i] == true){


                this.final.push(this.toAdd[i]);
                this.finalNames.push(this.toAddNames[i]);
                this.data.push({'id': this.toAdd[i], 'name': this.toAddNames[i]});
            }
        }

    }


}
