import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstanceListComponent } from './instance-list/instance-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'servicelist', pathMatch: 'full' },
  {
    path: 'servicelist',
    loadChildren: () =>
      import('./service-list/service-list.module').then(
        (mod) => mod.ServiceListModule
      ),
  },
  { path: 'instancelist', component: InstanceListComponent },
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
