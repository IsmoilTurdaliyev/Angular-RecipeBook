import { Subject } from 'rxjs';
import { shoppingService } from './shopping.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[]=[]
  constructor( private shoppingListService:shoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getShoppingList()
    this.shoppingListService.ingredientChanged.subscribe(res=>this.ingredients = res)
  }
  onEditItem(number:number){
    this.shoppingListService.startEditing.next(number);
  }


}
