import { recipeService } from './../recipe.service';
import { Recipe } from '../recipe-model';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[]= [];
  constructor(private recipeSrv: recipeService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.recipes = this.recipeSrv.getRecipes();
    this.recipeSrv.changedRecipe.subscribe(res=>{
      this.recipes = res;
    })
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }
}
