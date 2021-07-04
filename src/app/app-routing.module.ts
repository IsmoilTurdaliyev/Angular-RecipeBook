import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: ()=>import('./recipes/recipe.module').then(res=>res.RecipeModule)},
  { path: 'shopping-lists', loadChildren: ()=>import('./shopping-list/shopping-list.module').then(res=>res.ShoppingListModule)},
  { path: 'auth', loadChildren: ()=>import('./auth/auth.module').then(res=>res.AuthModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
