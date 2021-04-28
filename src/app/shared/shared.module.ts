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
} from 'ng-devui';
import { DataTableModule } from 'ng-devui/data-table';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LayoutModule } from 'ng-devui/layout';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ActionMenuModule } from './action-menu/action-menu.module';
import { ManageTagModule } from './manage-tag/manage-tag.module';
import { InstanceStatusPipe } from './pipe/instance-status.pipe';
import { EnvironmentPipe } from './pipe/environment.pipe';
import { AutoHidePaginationDirective } from './derective/auto-hide-pagination.derective';

const devUIModule = [
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
];
const angularModule = [
  CommonModule,
  FormsModule,
  HttpClientXsrfModule,
  ReactiveFormsModule,
];

const cusModule = [ActionMenuModule, ManageTagModule];

const pipes = [InstanceStatusPipe, EnvironmentPipe];

const derective = [AutoHidePaginationDirective];

@NgModule({
  declarations: [...pipes, ...derective],
  imports: [
    ...devUIModule,
    ...angularModule,
    ...cusModule,
    MonacoEditorModule.forRoot(),
  ],
  exports: [
    ...devUIModule,
    ...angularModule,
    ...cusModule,
    ...pipes,
    ...derective,
    MonacoEditorModule,
  ],
})
export class SharedModule {}
