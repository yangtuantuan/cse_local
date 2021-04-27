import { NgModule } from '@angular/core';

import { InstanceListRoutingModule } from './instance-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, InstanceListRoutingModule],
  exports: [InstanceListRoutingModule],
})
export class InstanceListModule {}
