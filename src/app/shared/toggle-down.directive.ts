import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleDown]'
})
export class ToggleDownDirective {
  @HostBinding('class.openToggle') isOpen:boolean=false;
  @HostListener('click') onClick(){
    this.isOpen = !this.isOpen
  }
  constructor() { }

}
