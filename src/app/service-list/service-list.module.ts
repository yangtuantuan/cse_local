import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ManageTagComponent } from './manage-tag/manage-tag.component';
import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';
import { CreateComponent } from './modal/create/create.component';

@NgModule({
  declarations: [ServiceListComponent, ManageTagComponent, CreateComponent],
  imports: [SharedModule, ServiceListRoutingModule],
  exports: [ServiceListRoutingModule],
})
export class ServiceListModule {}
