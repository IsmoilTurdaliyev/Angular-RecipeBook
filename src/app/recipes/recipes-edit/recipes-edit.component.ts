import { recipeService } from './../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit, OnDestroy {
  subsription: Subscription;
  id: number;
  ingredients: any[] = [];
  editMode: boolean;
  recipe: any;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeSrv: recipeService, private router: Router) { }

  ngOnInit(): void {

    this.subsription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (this.id || this.id === 0) this.editMode = true
        if (this.id === NaN) this.editMode = false
        this.recipe = this.recipeSrv.getDetails(this.id);
        this.initForm();
        // console.log(this.recipeForm.get('ingredients')!.controls)
      }
    )
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  deleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeSrv.changeRecipe(this.id, this.recipeForm.value)
    }
    else {
      this.recipeSrv.addRecipes(this.recipeForm.value)
    }
    this.cancel()
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe.ingredients) {
        for (let inredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(inredient.name, Validators.required),
              amount: new FormControl(inredient.amount, [
                Validators.required,
                Validators.pattern(/[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  ngOnDestroy(){
    this.subsription.unsubscribe()
  }

}
