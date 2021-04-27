import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstanceStatusPipe } from './shared/pipe/instance-status.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, InstanceListComponent, InstanceStatusPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [InstanceStatusPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
