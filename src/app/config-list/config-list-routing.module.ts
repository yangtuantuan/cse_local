import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigListComponent } from './pages/list/config-list.component';
import { ConfigCreateComponent } from './pages/config-create/config-create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ConfigListComponent,
  },
  {
    path: 'create',
    component: ConfigCreateComponent,
    data: {
      type: 'create',
      showLeftMenu: true,
    },
  },
  {
    path: 'eidt',
    component: ConfigCreateComponent,
    data: {
      type: 'eidt',
      showLeftMenu: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigListRoutingModule {}
