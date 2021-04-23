import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'configType',
})
export class ConfigTypePipe implements PipeTransform {
  transform(value: Lables): string {
    return configTypeFn(value);
  }
}

interface Lables {
  [lable: string]: string;
}

export const configTypeFn = (value: Lables): 'custom' | 'service' | 'app' => {
  if (!value) {
    return 'custom';
  }
  if (value.appId && value.serviceName && value.version && value.environment) {
    return 'service';
  }
  if (value.appId && value.environment) {
    return 'app';
  }
  return 'custom';
};
