import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'InstanceStatus' })
export class InstanceStatusPipe implements PipeTransform {
  transform(value: State): string {
    return statusMap[value];
  }
}

export const statusMap = {
  // UP|DOWN|STARTING|OUTOFSERVICE
  UP: '上线',
  DOWN: '下线',
  STARTING: '拨测',
  OUTOFSERVICE: '停止',
}

export interface StatusMap {
  UP: string;
  DOWN: string;
  STARTING: string;
  OUTOFSERVICE: string;
}

type State = keyof StatusMap;
