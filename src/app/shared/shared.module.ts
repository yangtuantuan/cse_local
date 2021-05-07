import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CategorySearchModule,
  DevUIModule,
  FormModule,
  ModalModule,
  RadioModule,
  SelectModule,
  TagsModule,
  TextareaModule,
  ToggleModule,
  TooltipModule,
} from 'ng-devui';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DataTableModule } from 'ng-devui/data-table';
import { LayoutModule } from 'ng-devui/layout';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ActionMenuModule } from './action-menu/action-menu.module';
import { AutoHidePaginationDirective } from './derective/auto-hide-pagination.derective';
import { FilterRefreshModule } from './filter-refresh/filter-refresh.module';
import { EnvironmentPipe } from './pipe/environment.pipe';
import { InstanceStatusPipe } from './pipe/instance-status.pipe';

const devUIModules = [
  CategorySearchModule,
  CheckBoxModule,
  DevUIModule,
  DataTableModule,
  FormModule,
  LayoutModule,
  ModalModule,
  RadioModule,
  TagsModule,
  ToggleModule,
  SelectModule,
  TextareaModule,
  TooltipModule,
];
const angularModule = [
  CommonModule,
  FormsModule,
  HttpClientXsrfModule,
  ReactiveFormsModule,
];

const cusModule = [ActionMenuModule, FilterRefreshModule];

const pipes = [InstanceStatusPipe, EnvironmentPipe];

const derective = [AutoHidePaginationDirective];

@NgModule({
  declarations: [...pipes, ...derective],
  imports: [
    ...devUIModules,
    ...angularModule,
    ...cusModule,
    MonacoEditorModule.forRoot(),
  ],
  exports: [
    ...devUIModules,
    ...angularModule,
    ...cusModule,
    ...pipes,
    ...derective,
    MonacoEditorModule,
  ],
})
export class SharedModule {}
