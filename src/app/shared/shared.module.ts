import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { LoadingComponent } from "./loading-page/loading.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingComponent,
        PlaceholderDirective
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        AlertComponent,
        LoadingComponent,
        PlaceholderDirective,

        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ]
})
export class SharedModule {}