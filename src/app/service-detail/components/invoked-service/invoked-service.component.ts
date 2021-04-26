import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-invoked-service',
  templateUrl: './invoked-service.component.html',
  styleUrls: ['./invoked-service.component.less'],
})
export class InvokedServiceComponent implements OnInit {
  @Input() serviceName = '';
  @Input() appId = '';
  @Input() type: 'consumers' | 'providers' = 'consumers';

  constructor(private service: ServiceService, private route: ActivatedRoute) {
    this.serviceId = this.route.snapshot.paramMap.get('id');
  }

  serviceId: string | null;
  basicDataSource: any[] = [];

  columns = [
    {
      field: 'serviceName',
      header: '服务名称',
      fieldType: 'text',
      width: '300px',
    },
    {
      field: 'appId',
      header: '所属应用',
      fieldType: 'text',
      width: '150px',
    },
    {
      field: 'version',
      header: '版本',
      fieldType: 'text',
      width: '150px',
    },
    {
      field: 'timestamp',
      header: '创建时间',
      fieldType: 'date',
      width: '300px',
    },
  ];

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    if (this.serviceId) {
      const params = {
        serviceName: this.serviceName,
        appId: this.appId,
      };
      this.service.getDependencies(params).subscribe(
        (res) => {
          this.basicDataSource = res[this.type];
          console.log(res);
        },
        (err) => {
          // todo 提示
        }
      );
    }
  }
}
