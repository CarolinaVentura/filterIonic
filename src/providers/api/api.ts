import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {AngularFireAuth} from "@angular/fire/auth";
import {LoginPage} from "../../pages/login/login";


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private apiKey= 'http://filter.hopto.org/api/';
  public userId: number;
  public emailId: string;
  public userName: string;
  public avatar: string;

  constructor(public http: Http) {


  }




  updateImgUser(img: string){

      return new Promise((resolve, reject)=>{

          var data= {

              _method: 'PUT',
              profile_image: img,


          };

          this.http.post(this.apiKey + 'user/' + this.userId, data).subscribe((result: any)=>{

              resolve(result.json());
              this.avatar = img;

          }, (error =>  {
              reject(error.json());
              console.log(error);
          }))

      });
  }


  registerUser(name: string, email: string){

      return new Promise((resolve, reject)=>{

          var data= {

              name: name,
              email: email,


          };

          this.http.post(this.apiKey + 'user' , data).subscribe((result: any)=>{

              resolve(result.json());

              var data = result.data;

          }, (error =>  {
              reject(error.json());
          }))

      });

  }



     getIdbyEmail(){


            return new Promise((resolve, reject)=>{

                this.http.get(this.apiKey + 'users/' + this.emailId + '/userbyemail').subscribe((result)=>{

                    var data = result.json();
                    this.userId = data.data.id;
                    this.userName = data.data.name;
                    this.avatar = data.data.profile_image;

                    console.log(this.userId);

                    resolve(result.json);

                }, (error)=>{
                    reject(error.json());
                })


            });
    }


    changeUsername(newUsername: string){

        return new Promise((resolve, reject)=>{

            var data= {

                name: newUsername,
                _method : 'PUT'

            };

            this.http.post(this.apiKey + 'user/' + this.userId, data).subscribe((result: any)=>{
                console.log('username alterado');
                resolve(result.json());
                this.userName=newUsername;
            }, (error =>  {
                reject(error.json());
            }))

        })

    }

    changeEmail(email: string){

        return new Promise((resolve, reject)=>{

            var data= {

                email: email,
                _method : 'PUT'

            };

            this.http.post(this.apiKey + 'user/' + this.userId, data).subscribe((result: any)=>{
                console.log('username alterado');
                resolve(result.json());

            }, (error =>  {
                reject(error.json());
            }))

        })

    }


          getUserId(){
            return this.userId;
          }


          getHistory(){

          console.log(this.userId);

            return new Promise((resolve, reject)=>{
              this.http.get(this.apiKey +'users/'+ this.userId +'/products').subscribe((result: any)=>{
                  resolve(result.json());
              }, (error)=>{
                  reject(error.json());
              })
            })
          }


          getRestrictions() {

            return new Promise((resolve, reject) => {
              this.http.get(this.apiKey + 'users/' + this.userId + '/ingredients').subscribe((result: any) => {
                resolve(result.json());

              }, (error) => {
                reject(error.json());
              })
            })
          }




    getProducts() {

        return new Promise((resolve, reject) => {
            this.http.get(this.apiKey + 'product').subscribe((result: any) => {
                resolve(result.json());

            }, (error) => {
                reject(error.json());
            })
        })
    }



        searchBarcode(barcode: string) {


          return new Promise((resolve, reject) => {
            this.http.get(this.apiKey + 'products/'+ barcode +'/barcode').subscribe((result: any) => {
              resolve(result.json());
            }, (error) => {
              reject(error.json());

            })
          })
        }

        getIngredientsOfProduct(idProduct: number) {

          return new Promise((resolve, reject) => {
            this.http.get(this.apiKey + 'products/'+ idProduct+ '/ingredients').subscribe((result: any) => {

              resolve(result.json());
            }, (error) => {
              reject(error.json());
            })
          })
        }



         postHistory(productId: number, feedback: boolean) {

          return new Promise((resolve, reject)=>{

            var data= {
                product_id : productId,
                feedback: feedback,
                _method : 'PUT'

            };

            this.http.post(this.apiKey + 'user/' + this.userId, data).subscribe((result: any)=>{
              resolve(result.json());
            }, (error =>  {
              reject(error.json());
            }))

          })

        }


    defineFav(productId: number, boolean: number) {

        return new Promise((resolve, reject) => {
            this.http.get(this.apiKey + 'user/'+ this.userId + '/favourite/'+ productId + '/' + boolean).subscribe((result: any) => {

                resolve(result.json());
            }, (error) => {
                reject(error.json());
            })
        });


    }



      getFavourites(){

          return new Promise((resolve, reject)=>{
              this.http.get(this.apiKey + 'users/'+ this.userId + '/favourites').subscribe((result:any)=>{
                  resolve(result.json())}, (error)=>{
                  reject(error.json());

              })


          })
        };



    eliminateRestriction(ingredientId: number){

        return new Promise( (resolve, reject)=>{

            var data= {
                detach_ing_id: ingredientId,
                _method : 'PUT'

            };


            this.http.post(this.apiKey + 'user/'+ this.userId, data).subscribe((result: any)=>{
                resolve(result.json());
            }, (error => {
                reject(error.json());
            }))
        })
    }



    toFavor(productId:number){

        return new Promise( (resolve, reject)=>{

            var data= {

                _method : 'PUT',
                 fav_id: productId,

            };


            this.http.post(this.apiKey + 'user/'+ this.userId, data).subscribe((result: any)=>{
                resolve(result.json());
            }, (error => {
                reject(error.json());
            }))
        })

    }

    eliminateFavourite(ingredientId: number){

        return new Promise( (resolve, reject)=>{

            var data= {
                detach_fav_id: ingredientId,
                _method : 'PUT'

            };


            this.http.post(this.apiKey + 'user/'+ this.userId, data).subscribe((result: any)=>{
                resolve(result.json());
            }, (error => {
                reject(error.json());
            }))
        })
    }


    detachProductHistory(productId: number){

        return new Promise( (resolve, reject)=>{

            var data= {
                detach_product_id: productId,
                _method : 'PUT'

            };


            this.http.post(this.apiKey + 'user/'+ this.userId, data).subscribe((result: any)=>{
                resolve(result.json());
            }, (error => {
                reject(error.json());
            }))
        })
    }


    getAllIngredients(){

        return new Promise((resolve, reject)=>{
            this.http.get(this.apiKey + 'ingredient').subscribe((result: any)=>{
                resolve(result.json());

                console.log(resolve(result.json()));

            }, (error)=>{


                console.log(error);

                reject(error.json());

            })


        })
    };


    addRestrictions(id: number){



        return new Promise( (resolve, reject)=>{

            var data= {

                _method : 'PUT',
               ingredient_id: id,

            };


            this.http.post(this.apiKey + 'user/'+ this.userId, data).subscribe((result: any)=>{
                resolve(result.json());
            }, (error => {
                reject(error.json());
                console.log(error);
            }))
        })

    }

    addRestrictions2(id: number []){



        return new Promise( (resolve, reject)=>{

            var data= {

                _method : 'PUT',
                ingredient_id: id,

            };


            this.http.post(this.apiKey + 'user/'+ this.userId, data).subscribe((result: any)=>{
                resolve(result.json());
            }, (error => {
                reject(error.json());
                console.log(error);
            }))
        })

    }

    eliminateRestriction2(ingredientId: number []){

        return new Promise( (resolve, reject)=>{

            var data= {
                detach_ing_id: ingredientId,
                _method : 'PUT'

            };


            this.http.post(this.apiKey + 'user/'+ this.userId, data).subscribe((result: any)=>{
                resolve(result.json());
            }, (error => {
                reject(error.json());
            }))
        })
    }

    getProduct(id: any){

        return new Promise((resolve, reject)=>{
            this.http.get(this.apiKey + 'product/'+ id).subscribe((result:any)=>{
                resolve(result.json())}, (error)=>{
                reject(error.json());

            })


        })

    }


  }
