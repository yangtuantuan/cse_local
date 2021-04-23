import { Component, Input, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui';
import { ConfigListService } from '../../config-list.service';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.less'],
})
export class SelectServiceComponent implements OnInit {
  @Input() data!: {
    onClose: (rowItem?: any, version?: string) => void;
  };
  constructor(private service: ConfigListService) {}

  selectService: any;
  basicDataSource!: any[];
  options!: any[];
  selectVersion!: any;

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'radio',
      width: '50px',
    },
    {
      field: 'serviceName',
      width: '120px',
    },
    {
      field: 'appId',
      width: '120px',
    },
    {
      field: 'enviroment',
      width: '120px',
    },
  ];

  columns = [
    {
      field: 'serviceName',
      header: '应用名称',
      fieldType: 'text',
      order: 1,
    },
    {
      field: 'appId',
      header: '所属应用',
      fieldType: 'text',
      order: 2,
    },
    {
      field: 'enviroment',
      header: '环境',
      fieldType: 'text',
      order: 3,
    },
  ];

  ngOnInit(): void {
    this.service.getServices().subscribe(
      (res) => {
        this.basicDataSource = res.services || [];
        this.selectService = this.basicDataSource.find(
          (item: any, index: number) => index === 0
        );
        this.onChangeService(this.selectService);
      },
      (err) => {
        // todo 提示
      }
    );
  }

  onChangeService(rowItem: any): void {
    this.options = rowItem.serviceIds;
    this.selectVersion = this.options.find(
      (item: any, index: number) => index === 0
    );
  }

  onConfirm(): void {
    this.data.onClose(this.selectService, this.selectVersion);
  }

  onCancel(): void {
    this.data.onClose();
  }
}
