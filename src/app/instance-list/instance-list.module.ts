import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstanceListRoutingModule } from './instance-list-routing.module';
import { ManageTagModule } from '../shared/manage-tag/manage-tag.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, InstanceListRoutingModule, ManageTagModule],
})
export class InstanceListModule {}
