import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'EnvironmentPipe' })
export class EnvironmentPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '<空>';
    }
    return value;
  }
}
