import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ConfigTypePipe',
})
export class ConfigTypePipe implements PipeTransform {
  transform(value: Lables): string {
    return types[configTypeFn(value)];
  }
}

export const configTypeFn = (value: Lables): type => {
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

const types = {
  app: '应用级配置',
  custom: '自定义配置',
  service: '微服务级配置',
};

interface Lables {
  [lable: string]: string;
}

interface Types {
  app: string;
  custom: string;
  service: string;
}

type type = keyof Types;
