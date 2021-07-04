import { DataStorageService } from './../shared/data-storage.service';
import { Subject } from 'rxjs';
import { shoppingService } from './../shopping-list/shopping.service';
import { Ingredient } from './../shared/ingredients.model';
import { Injectable } from '@angular/core';
import { Recipe } from "./recipe-model";

@Injectable()
export class recipeService {
    changedRecipe = new Subject<Recipe[]>();
    constructor(private ShoppingListService: shoppingService){}
    private recipes: Recipe[] = [];
    setRecipes(recipes: Recipe[]){
        if(recipes)this.recipes = recipes;
        this.changedRecipe.next(this.recipes.slice())
    }
    getRecipes(){
       return this.recipes.slice()
    }

    addIngredient(data: Ingredient[]){
        this.ShoppingListService.addIngredientsToShoppingList(data);
    }

    getDetails(id:number){
        if(this.recipes[id]) return this.recipes[id];
        else return undefined
    }
    addRecipes(recipe:Recipe){
        console.log('salom')
        this.recipes.push(recipe);
        this.changedRecipe.next(this.recipes.slice())
    }
    changeRecipe(index:number,recipe:Recipe){
        this.recipes[index] = recipe;
        this.changedRecipe.next(this.recipes.slice())
    }
    clearRecipes(){
        this.recipes = [];
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.changedRecipe.next(this.recipes.slice());
    }
}
