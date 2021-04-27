import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionMenuComponent } from './action-menu.component';
import { DevUIModule, DropDownModule } from 'ng-devui';

@NgModule({
  declarations: [ActionMenuComponent],
  imports: [CommonModule, DropDownModule, DevUIModule],
  exports: [ActionMenuComponent],
})
export class ActionMenuModule {}

export * from './action-menu.component';
