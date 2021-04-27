import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstanceListComponent } from './instance-list.component';

const routes: Routes = [
  {
    path: '',
    component: InstanceListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstanceListRoutingModule {}
