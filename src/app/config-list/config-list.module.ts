import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ConfigListRoutingModule } from './config-list-routing.module';
import { ConfigListComponent } from './pages/list/config-list.component';
import { CreateModalComponent } from './modal/create/create-modal.component';
import { ConfigCreateComponent } from './pages/config-create/config-create.component';
import { ConfigTypePipe } from './pipe/config-type.pipe';
import { SelectAppComponent } from './modal/select-app/select-app.component';

@NgModule({
  declarations: [
    ConfigListComponent,
    ConfigTypePipe,
    CreateModalComponent,
    ConfigCreateComponent,
    SelectAppComponent,
  ],
  imports: [CommonModule, SharedModule, ConfigListRoutingModule],
  providers: [],
  exports: [ConfigListRoutingModule],
})
export class ConfigListModule {}
