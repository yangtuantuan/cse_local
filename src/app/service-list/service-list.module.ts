import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';
import { CreateComponent } from './modal/create/create.component';
import { DeleteComponent } from './modal/delete/delete.component';
import { ManageTagModule } from '../shared/manage-tag/manage-tag.module';

@NgModule({
  declarations: [ServiceListComponent, CreateComponent, DeleteComponent],
  imports: [SharedModule, ServiceListRoutingModule, ManageTagModule],
  exports: [ServiceListRoutingModule],
})
export class ServiceListModule {}
