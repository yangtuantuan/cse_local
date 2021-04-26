import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ManageTagComponent } from './modal/manage-tag/manage-tag.component';
import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';
import { CreateComponent } from './modal/create/create.component';
import { DeleteComponent } from './modal/delete/delete.component';

@NgModule({
  declarations: [
    ServiceListComponent,
    ManageTagComponent,
    CreateComponent,
    DeleteComponent,
  ],
  imports: [SharedModule, ServiceListRoutingModule],
  exports: [ServiceListRoutingModule],
})
export class ServiceListModule {}
