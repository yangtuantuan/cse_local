import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'servicelist', pathMatch: 'full' },
  {
    path: 'servicelist',
    loadChildren: () =>
      import('./service-list/service-list.module').then(
        (mod) => mod.ServiceListModule
      ),
  },
  {
    path: 'servicedetail/:id',
    loadChildren: () =>
      import('./service-detail/service-detail.module').then(
        (mod) => mod.ServiceDetailModule
      ),
  },
  {
    path: 'instancelist',
    loadChildren: () =>
      import('./instance-list/instance-list-routing.module').then(
        (mod) => mod.InstanceListRoutingModule
      ),
  },
  {
    path: 'kie',
    loadChildren: () =>
      import('./config-list/config-list.module').then(
        (mod) => mod.ConfigListModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
