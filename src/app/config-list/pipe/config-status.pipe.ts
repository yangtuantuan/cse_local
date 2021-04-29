import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'configStatusPipe' })
export class ConfigStatusPipe implements PipeTransform {
  transform(value: 'enabled' | 'disabled'): string {
    return statusMap[value];
  }
}

const statusMap = {
  enabled: '启用',
  disabled: '禁用',
};
