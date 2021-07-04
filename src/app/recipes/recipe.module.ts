import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesItemComponent,
        RecipeDetailComponent,
        RecipesEditComponent,
    ],
    imports: [
        SharedModule,
        RecipesRoutingModule
    ],
    exports: [
    RecipesRoutingModule
    ]
})
export class RecipeModule{}