import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InstanceListComponent } from './components/instance-list/instance-list.component';
import { InvokedServiceComponent } from './components/invoked-service/invoked-service.component';
import { ServiceContractComponent } from './components/service-contract/service-contract.component';
import { ServiceDetailRoutingModule } from './service-detail-routing.module';
import { ServiceDetailComponent } from './service-detail.component';
import { SwaggerComponent } from './components/service-contract/swagger/swagger.component';

@NgModule({
  declarations: [
    ServiceDetailComponent,
    InstanceListComponent,
    InvokedServiceComponent,
    ServiceContractComponent,
    SwaggerComponent,
  ],
  imports: [SharedModule, ServiceDetailRoutingModule],
  exports: [ServiceDetailRoutingModule],
})
export class ServiceDetailModule {}
