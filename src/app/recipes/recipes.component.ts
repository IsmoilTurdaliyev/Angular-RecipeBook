import { recipeService } from './recipe.service';
import { Recipe } from './recipe-model';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectedRecipeDetail: Recipe;
  constructor(private dataStorage: DataStorageService) { }
  
  ngOnInit(): void {
    this.dataStorage.loaderScaner.next(true);
    this.dataStorage.fetchRecipes().subscribe();
    setTimeout(() => {
      this.dataStorage.loaderScaner.next(false);
    }, 300);
    
  }

}
