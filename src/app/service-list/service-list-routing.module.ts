import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from './service-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ServiceListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceListRoutingModule {}
