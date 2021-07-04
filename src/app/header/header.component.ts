import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth:boolean = false;
  private authSub : Subscription;
  constructor(private dataStorage:DataStorageService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authSrv.user.subscribe(resData=>{
      this.isAuth = !!resData;
    }) 
  }
  ngOnDestroy(){
    this.authSub.unsubscribe()
  }
  onSaveData(){
    this.dataStorage.loaderScaner.next(true);
    this.dataStorage.storeRecipes();
    setTimeout(() => {
      this.dataStorage.loaderScaner.next(false);
    }, 300);
  }
  onFetchData(){
    this.dataStorage.loaderScaner.next(true);
    this.dataStorage.fetchRecipes().subscribe();
    setTimeout(() => {
      this.dataStorage.loaderScaner.next(false);
    }, 300);
    

  }
  onLogout(){
    this.authSrv.logout();
  }

}
