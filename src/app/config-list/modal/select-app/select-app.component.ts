import { Component, Input, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui';
import { getTabelData } from 'src/app/shared/toolFunction/tabel.pagination';
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
  dataSource: any[] = [];

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 15],
  };

  selectId!: string;

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'radio',
      width: '50px',
    },
    {
      field: 'appId',
      width: '200px',
    },
    {
      field: 'enviroment',
      width: '200px',
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
    this.service.getApps().subscribe(
      (res) => {
        this.basicDataSource = res;
        this.pager.total = res.length;
        this.dataSource = getTabelData(res, this.pager);
        console.log(res);
      },
      (err) => {
        this.basicDataSource = [];
        this.pager.total = 0;
        this.dataSource = [];
        // todo  提示
      }
    );
  }

  onPaginationChange(pageIndex: number, pageSise: number): void {
    this.dataSource = getTabelData(this.basicDataSource, {
      ...this.pager,
      pageIndex,
      pageSise,
    });
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
