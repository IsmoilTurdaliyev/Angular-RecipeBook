import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: boolean = false;
  constructor(private authService: AuthService, private dataStorage: DataStorageService){}
  ngOnInit(){
    this.authService.autoLogin();
    this.dataStorage.loaderScaner.subscribe((res:boolean)=>this.isLoading = res);
  }
  loadedPage:string="recipe"
  title = 'Angular Project';
  menuNavigate(data:string){
    this.loadedPage = data
  }
 
}
