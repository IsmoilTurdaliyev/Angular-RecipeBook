import { recipeService } from './../recipe.service';
import { Recipe } from '../recipe-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id:number;
  constructor(private service: recipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (data: Params) => {
        this.id = +data['id'];
        this.recipeDetail = this.service.getDetails(this.id);
      }
    )
  }
  saveToShoppingList() {
    this.service.addIngredient(this.recipeDetail.ingredients)
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  deleteRecipe(){
    this.service.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
