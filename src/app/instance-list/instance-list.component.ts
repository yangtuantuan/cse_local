import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.less']
})
export class InstanceListComponent implements OnInit {
  title = '实例列表';

  basicDataSource = [];
  dataTableOptions = {
    columns: [
      {
        field: 'name',
        header: '实例名称',
        fieldType: 'text',
        order: 1
      },
      {
        field: 'status',
        header: '状态',
        fieldType: 'text',
        order: 2
      },
      {
        field: 'environment',
        header: '环境',
        fieldType: 'text',
        order: 3
      },
      {
        field: 'serviceName',
        header: '所属服务',
        fieldType: 'text',
        order: 4
      },
      {
        field: 'version',
        header: '所属版本',
        fieldType: 'text',
        order: 5
      },
      {
        field: 'updateTime',
        header: '更新时间',
        fieldType: 'text',
        order: 4
      },
      {
        field: 'operation',
        header: '操作',
        fieldType: 'text',
        order: 4
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
