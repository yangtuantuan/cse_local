import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.less'],
})
export class InstanceListComponent implements OnInit {
  constructor(private service: ServiceService, private route: ActivatedRoute) {
    this.serviceId = this.route.snapshot.paramMap.get('id');
  }

  serviceId: string | null;
  basicDataSource: any[] = [];

  columns = [
    {
      field: 'hostName',
      header: '实例名称',
      fieldType: 'text',
      width: '300px',
    },
    {
      field: 'status',
      header: '实例名称',
      fieldType: 'text',
      width: '150px',
    },
    {
      field: 'az',
      header: '可用区',
      fieldType: 'text',
      width: '150px',
    },
    {
      field: 'endpoints',
      header: 'Endpoints',
      fieldType: 'text',
      width: '300px',
    },
    {
      field: 'modTimestamp',
      header: '更新时间',
      fieldType: 'text',
      width: '150px',
    },
  ];

  ngOnInit(): void {
    if (this.serviceId) {
      this.service.getInstancesbyServiceId(this.serviceId).subscribe(
        (res) => {
          this.basicDataSource = res.instances;
          console.log(res);
        },
        (err) => {
          // todo 提示
        }
      );
    }
  }

  onToggle(e?: any): void {}
}
