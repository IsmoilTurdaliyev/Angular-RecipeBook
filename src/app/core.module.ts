import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interseptors";
import { recipeService } from "./recipes/recipe.service";
import { DataStorageService } from "./shared/data-storage.service";
import { shoppingService } from "./shopping-list/shopping.service";

@NgModule({
    providers: [shoppingService,recipeService, DataStorageService,{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService, multi: true}],
})
export class CoreModule {}