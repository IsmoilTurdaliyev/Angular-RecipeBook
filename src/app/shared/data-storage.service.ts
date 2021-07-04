import { Ingredient } from './ingredients.model';
import { Recipe } from './../recipes/recipe-model';
import { recipeService } from './../recipes/recipe.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { shoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class DataStorageService {
  loaderScaner = new Subject<boolean>();
  constructor(private http: HttpClient, private recipeSrv: recipeService, private authSrv: AuthService) { }
  storeRecipes() {
    let userEmail= this.getUser();
    let data = this.recipeSrv.getRecipes();
    return this.http.put(`https://recipe-book-ebb18-default-rtdb.firebaseio.com/${userEmail}/recipes.json`, data).subscribe(res => {});
  }
  fetchRecipes() {
    let userEmail= this.getUser();
    return this.http.get<Recipe[]>(`https://recipe-book-ebb18-default-rtdb.firebaseio.com/${userEmail}/recipes.json`,
    ).pipe(
      map(recipes => {
        if (!recipes) return;
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
      tap(recipes => {
        this.recipeSrv.setRecipes(recipes)
      })
    )
  }
  private getUser(){
    const user: {
      email: string,
      id: string,
      token: string,
      expirationData: Date
    } = JSON.parse(localStorage.getItem('userData'));
    return  this.hash(user.email);
  }

  private hash(letter:string){
    let hash = 0;
    for(let i = 0; i< letter.length; i++){
      let char = letter.charCodeAt(i);
      hash = (hash << 5) - (hash << 2) + char + char*3;
    }
    return hash
  }
}
