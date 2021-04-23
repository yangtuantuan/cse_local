import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { ManageTagComponent } from './service-list/manage-tag/manage-tag.component';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ServiceListComponent,
    InstanceListComponent,
    ManageTagComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
