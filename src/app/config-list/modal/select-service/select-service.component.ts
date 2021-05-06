import { Component, Input, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { TableWidthConfig } from 'ng-devui';
import { getTabelData } from 'src/app/shared/toolFunction/tabel.pagination';
import { ServiceService } from 'src/common/service.service';
import { ConfigService } from '../../../../common/config.service';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.less'],
})
export class SelectServiceComponent implements OnInit {
  @Input() data!: {
    onClose: (rowItem?: any, version?: string) => void;
  };
  constructor(
    private service: ConfigService,
    private serviceService: ServiceService
  ) {}

  selectService: any;
  private basicDataSource!: any[];
  dataSource!: any[];
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [5, 10],
  };
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
        this.basicDataSource = simplify(res);
        this.pager.total = this.basicDataSource.length;
        this.dataSource = getTabelData(this.basicDataSource, this.pager);
        this.selectService = this.dataSource.find(
          (item: any, index: number) => index === 0
        );
        this.onChangeService(this.selectService);
      },
      (err) => {
        // todo 提示
      }
    );

    function simplify(data: any): any[] {
      const result = data.services.reduce((obj: any, item: any) => {
        if (!obj[item.serviceName + item.appId]) {
          obj[item.serviceName + item.appId] = {
            serviceName: item.serviceName,
            appId: item.appId,
            environment: item.environment || '',
            versions: [item],
          };
        } else {
          obj[item.serviceName + item.appId].versions.push(item);
        }
        return obj;
      }, {});

      const arr: any[] = [];
      Object.keys(result).map((key) => {
        arr.push(result[key]);
      });

      return arr;
    }
  }

  onChangeService(rowItem: any): void {
    this.options = rowItem.versions || [];
    this.selectVersion = this.options.find(
      (item: any, index: number) => index === 0
    );
  }

  onConfirm(): void {
    this.data.onClose(this.selectService, this.selectVersion.version);
  }

  onCancel(): void {
    this.data.onClose();
  }

  public onPaginationChange(pageIndex: number, pageSize: number): void {
    this.dataSource = getTabelData(this.basicDataSource, {
      ...cloneDeep(this.pager),
      pageIndex,
      pageSize,
    });
  }
}
