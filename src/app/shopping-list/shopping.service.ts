import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';

export class shoppingService {
    ingredientChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
    private ingredients: Ingredient[] = [];

    getShoppingList() {
        return this.ingredients.slice()
    }
    getIngredient(index: number){
        return this.ingredients[index]
    }
    addIngredient(data: Ingredient) {
        this.ingredients.push(data);
        this.ingredientChanged.next(this.ingredients)
    }
    updateIngredient(index:number,newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients)
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients)
    }

    addIngredientsToShoppingList(data: Ingredient[]) {
        this.ingredients.push(...data);
    }



}