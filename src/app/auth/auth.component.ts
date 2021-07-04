import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { DataStorageService } from '../shared/data-storage.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean = true;
  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective) host: PlaceholderDirective;
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private dataStorage: DataStorageService) { }

  ngOnInit(): void {
    
  }

 

  onChangeStatus() {
    this.isLoginMode = !this.isLoginMode
  }
  onSubmitForm(data: NgForm) {
    this.dataStorage.loaderScaner.next(true);
    let authObs = new Observable<AuthResponse>()
    if (!data.valid) return;

    const email = data.value.email;
    const password = data.value.password;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(res => {
      console.log(res);
      this.dataStorage.loaderScaner.next(false);
      this.router.navigate(['/', 'recipes'])
    }, error => {
      this.dataStorage.loaderScaner.next(false);
      this.showAlert(error)
    })
    data.reset()
  } 
  
  // onHandleError() {
  //   this.error = null
  // }

  private showAlert(message: string){
    const component = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostContainerRef = this.host.viewContainerRef;
    hostContainerRef.clear();
    const createdComponent = hostContainerRef.createComponent(component);
    createdComponent.instance.message = message;
    this.closeSub =  createdComponent.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostContainerRef.clear()
    });
  }
  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }
}
