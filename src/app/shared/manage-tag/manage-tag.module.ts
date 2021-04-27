import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableModule, DevUIModule, FormModule } from 'ng-devui';
import { ActionMenuModule } from '../action-menu/action-menu.module';
import { ManageTagComponent } from './manage-tag.component';

@NgModule({
  declarations: [ManageTagComponent],
  imports: [
    CommonModule,
    DataTableModule,
    FormModule,
    FormsModule,
    DevUIModule,
    ActionMenuModule,
  ],
  exports: [ManageTagComponent],
})
export class ManageTagModule {}

export * from './manage-tag.component';
