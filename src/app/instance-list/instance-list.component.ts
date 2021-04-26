import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui';
import { ServiceService } from 'src/common/service.service';
import { ActionItem } from '../shared/components/action-menu/action-menu.component';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.less'],
})
export class InstanceListComponent implements OnInit {
  title = '实例列表';

  basicDataSource = [];
  columns = [
    {
      field: 'hostName',
      header: '实例名称',
      fieldType: 'text',
      order: 1,
    },
    {
      field: 'status',
      header: '状态',
      fieldType: 'text',
      order: 2,
    },
    {
      field: 'environment',
      header: '环境',
      fieldType: 'text',
      order: 3,
    },
    {
      field: 'serviceName',
      header: '所属服务',
      fieldType: 'text',
      order: 4,
    },
    {
      field: 'version',
      header: '所属版本',
      fieldType: 'text',
      order: 5,
    },
    {
      field: 'modTimestamp',
      header: '更新时间',
      fieldType: 'text',
      order: 6,
    },
    // {
    //   field: 'operation',
    //   header: '操作',
    //   fieldType: 'text',
    //   order: 4,
    // },
  ];
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'hostName',
      width: '300px',
    },
  ];

  actions: ActionItem[] = [
    {
      id: '1',
      label: 'aaa',
    },
    {
      id: '2',
      label: 'bbb',
    },
    {
      id: '3',
      label: 'ccc',
    },
    {
      id: '4',
      label: 'dddd',
    },
  ];

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getInstances().subscribe(
      (res) => {
        this.basicDataSource = res;
        console.log(res);
      },
      (err) => {
        // todo 提示
      }
    );
  }

  actionsFn(): ActionItem[] {
    return JSON.parse(JSON.stringify(this.actions));
  }

  actionClick(e: any): void {
    console.log(e);
  }
}
