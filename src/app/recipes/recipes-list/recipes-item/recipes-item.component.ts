import { recipeService } from './../../recipe.service';
import { Recipe } from '../../recipe-model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {
  @Input('item') recipe: Recipe;
  @Input('id') id: number;
  constructor(private service: recipeService) {}

  ngOnInit(): void {
  }
}
