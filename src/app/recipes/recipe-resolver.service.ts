import { recipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe-model';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorage: DataStorageService, private recipesService: recipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipe = this.recipesService.getRecipes();
        if(recipe.length === 0) return this.dataStorage.fetchRecipes();
        else return recipe;
    }
}