import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'InstanceStatus' })
export class InstanceStatusPipe implements PipeTransform {
  transform(value: State): string {
    return statusMap[value] || value;
  }
}

export const statusMap = {
  // UP在线,OUTOFSERVICE摘机,STARTING正在启动,DOWN下线,TESTING拨测状态。
  UP: '在线',
  DOWN: '下线',
  STARTING: '启动中',
  TESTING: '拨测',
  OUTOFSERVICE: '摘机',
};

export interface StatusMap {
  UP: string;
  DOWN: string;
  STARTING: string;
  OUTOFSERVICE: string;
  TESTING: string;
}

type State = keyof StatusMap;
