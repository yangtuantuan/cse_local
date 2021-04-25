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
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LayoutModule } from 'ng-devui/layout';
import { MonacoEditorModule } from 'ngx-monaco-editor';

const devUIModule = [
  CategorySearchModule,
  CheckBoxModule,
  DevUIModule,
  FormModule,
  LayoutModule,
  ModalModule,
  RadioModule,
  TagsModule,
  ToggleModule,
  SelectModule,
  TextareaModule,
];
const angularModule = [CommonModule, FormsModule, HttpClientXsrfModule, ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [...devUIModule, ...angularModule, MonacoEditorModule.forRoot()],
  exports: [...devUIModule, ...angularModule, MonacoEditorModule],
})
export class SharedModule {}
