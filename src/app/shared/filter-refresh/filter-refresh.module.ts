import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterRefreshComponent } from './filter-refresh.component';
import { CategorySearchModule, DevUIModule } from 'ng-devui';

@NgModule({
  declarations: [FilterRefreshComponent],
  imports: [CommonModule, DevUIModule, CategorySearchModule],
  exports: [FilterRefreshComponent],
})
export class FilterRefreshModule {}
