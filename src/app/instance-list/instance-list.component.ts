import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/common/service.service';

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
      field: 'name',
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
      field: 'updateTime',
      header: '更新时间',
      fieldType: 'text',
      order: 4,
    },
    {
      field: 'operation',
      header: '操作',
      fieldType: 'text',
      order: 4,
    },
  ];

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    const params = {
      options: 'instances',
    };
    this.service.getServiceByGovern(params).subscribe(
      (res) => {
        this.basicDataSource = res.allServicesDetail.reduce(
          (list: any[], item: any) => {
            if (item.instances?.length) {
              list.push(item.instances);
            }
            return list;
          },
          []
        );
        console.log(this.basicDataSource);
      },
      (err) => {
        // todo 提示
      }
    );
  }
}
