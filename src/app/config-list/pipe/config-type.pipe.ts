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
  if (
    value.app &&
    value.service &&
    value.version &&
    value.enviroment !== undefined
  ) {
    return 'service';
  }
  if (value.app && value.enviroment !== undefined) {
    return 'app';
  }
  return 'custom';
};
