import { shoppingService } from './../shopping.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  formGroup: FormGroup;
  editMode = false;
  editItemIndex: number;
  editeItem: Ingredient;
  constructor(private service: shoppingService, private shoppingSrc: shoppingService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    });
    this.shoppingSrc.startEditing.subscribe((res: number) => {
      this.editItemIndex = res;
      this.editMode = true;
      this.editeItem = this.shoppingSrc.getIngredient(res);
      this.formGroup.setValue({
        'name': this.editeItem.name,
        'amount': this.editeItem.amount
      })
    })
  }

  onSubmit() {
    let value = {name: this.formGroup.value.name,amount:this.formGroup.value.amount};
    if(this.editMode){
      this.shoppingSrc.updateIngredient(this.editItemIndex,value)
    }else{
      this.shoppingSrc.addIngredient(value);
    }
    this.onClear()
  }
  onClear(){
    this.formGroup.reset();
    this.editMode = false;
    this.editItemIndex = null
  }
  onDelete(){
      this.shoppingSrc.deleteIngredient(this.editItemIndex);
      this.onClear()
  }

}
