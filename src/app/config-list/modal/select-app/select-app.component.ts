import { Component, Input, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui';
import { ConfigService } from '../../../../common/config.service';

@Component({
  selector: 'app-select-app',
  templateUrl: './select-app.component.html',
  styleUrls: ['./select-app.component.less'],
})
export class SelectAppComponent implements OnInit {
  @Input() data!: {
    onClose: (appId?: any) => void;
  };
  constructor(private service: ConfigService) {}

  basicDataSource: any[] = [];

  selectId!: string;

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'radio',
      width: '50px',
    },
    {
      field: 'appId',
      width: '150px',
    },
    {
      field: 'enviroment',
      width: '150px',
    },
  ];

  columns = [
    {
      field: 'appId',
      header: '应用名称',
      fieldType: 'text',
      order: 1,
    },
    {
      field: 'enviroment',
      header: '环境',
      fieldType: 'text',
      order: 2,
    },
  ];

  ngOnInit(): void {
    console.log('init');

    this.service.getApps().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.basicDataSource = [
          {
            appId: 'sdfasfdsadf-13232',
            enviroment: '',
            instanceCount: 5,
            serviceCount: 4,
            timestamp: 161915867,
          },
          {
            appId: 'asdfhjghdj-13232',
            enviroment: '',
            instanceCount: 0,
            serviceCount: 1,
            timestamp: 161915894,
          },
        ].map((item: any, index: number) => {
          if (index === 0) {
            this.selectId = item.appId;
          }
          return item;
        });
        console.log(err);
      }
    );
  }

  onConfirm(): void {
    const data = this.basicDataSource.filter(
      (item) => item.appId === this.selectId
    );
    this.data.onClose(data[0]);
  }

  onCancel(): void {
    this.data.onClose();
  }
}
