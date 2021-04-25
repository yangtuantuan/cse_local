import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { InstanceListComponent } from './components/instance-list/instance-list.component';
import { InvokedServiceComponent } from './components/invoked-service/invoked-service.component';
import { InvokingServiceComponent } from './components/invoking-service/invoking-service.component';
import { ServiceContractComponent } from './components/service-contract/service-contract.component';
import { ServiceDetailComponent } from './service-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: 'invoked',
    component: ServiceDetailComponent,
  },
  // {
  //   path: 'invoked',
  //   component: InvokedServiceComponent,
  // },
  // {
  //   path: 'invokeing',
  //   component: InvokingServiceComponent,
  // },
  // {
  //   path: 'instance',
  //   component: InstanceListComponent,
  // },
  // {
  //   path: 'configuration',
  //   component: ConfigurationComponent,
  // },
  // {
  //   path: 'contract',
  //   component: ServiceContractComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceDetailRoutingModule {}
