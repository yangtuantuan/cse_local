import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceListComponent } from './service-list/service-list.component';
import { InstanceListComponent } from './instance-list/instance-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'servicelist', pathMatch: 'full' },
  { path: 'servicelist', component: ServiceListComponent },
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
