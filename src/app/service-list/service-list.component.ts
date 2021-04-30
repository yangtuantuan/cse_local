import { Component, OnInit, ViewChild } from '@angular/core';
import { cloneDeep, map, uniqBy } from 'lodash';
import { ICategorySearchTagItem } from 'ng-devui';
import {
  DataTableComponent,
  TableCheckOptions,
  TableWidthConfig,
} from 'ng-devui/data-table';
import { ModalService } from 'ng-devui/modal';
import { envOptions } from 'src/config/global.config';
import { ServiceService } from '../../common/service.service';
import { ManageTagComponent } from '../shared/manage-tag/manage-tag.module';
import {
  FilterItem,
  filterTabDataByCategory,
  getTabelData,
} from '../shared/toolFunction/tabel.pagination';
import { CreateComponent } from './modal/create/create.component';
import { DeleteComponent } from './modal/delete/delete.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.less'],
})
export class ServiceListComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private service: ServiceService
  ) {}
  @ViewChild(DataTableComponent, { static: true })
  datatable!: DataTableComponent;

  title = '服务列表';

  private basicDataSource: any;
  dataSource: any; // 展示的数据
  columns = [
    {
      field: 'environment',
      header: 'Environment',
      fieldType: 'text',
      order: 2,
    },
    {
      field: 'version',
      header: 'Version',
      fieldType: 'text',
      order: 3,
    },
    {
      field: 'appId',
      header: 'Instances',
      fieldType: 'text',
      order: 4,
    },
    {
      field: 'timestamp',
      header: 'Create Time',
      fieldType: 'Date',
      order: 5,
    },
  ];

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'name',
      width: '150px',
    },
    {
      field: 'environment',
      width: '100px',
    },
    {
      field: 'version',
      width: '100px',
    },
    {
      field: 'instances',
      width: '150px',
    },
    {
      field: 'operation',
      width: '150px',
    },
  ];
  private totalDataChecked = false;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  };

  // todo ui框架问题设置为any解决
  category: Array<ICategorySearchTagItem> | any = [
    {
      field: 'serviceName',
      label: '名称',
      type: 'textInput',
    },
    {
      field: 'environment',
      label: '环境',
      type: 'label',
      options: cloneDeep(envOptions),
    },
    {
      field: 'version',
      label: '版本',
      type: 'label',
      options: [],
    },
    {
      field: 'instances',
      label: 'Instances',
      type: 'textInput',
    },
  ];

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.dataSource = [];
    this.service.getServiceByGovern().subscribe(
      (data) => {
        this.basicDataSource = (data?.allServicesDetail || []).map(
          (item: any) => {
            if (!item.microService?.environment) {
              item.microService.environment = '<空>';
            }
            return item.microService;
          }
        );
        this.pager.total = this.basicDataSource.length;
        this.dataSource = getTabelData(this.basicDataSource, this.pager);
        this.category[2].options = uniqBy(
          map(this.basicDataSource, (item: any) => ({
            label: item.version,
          })),
          'label'
        );
      },
      (err) => {
        // todo 提示
      }
    );
  }

  public manageTag(rowItem: any): void {
    const results = this.modalService.open({
      id: 'manageTag',
      width: '750px',
      component: ManageTagComponent,
      backdropCloseable: false,
      data: {
        close: (res?: boolean) => {
          if (res) {
            this.initData();
          }
          results.modalInstance.hide();
        },
        serviceId: rowItem.serviceId,
      },
    });
  }

  public deleteItem(rowItems: any): void {
    const result = this.modalService.open({
      id: 'delte-service',
      width: '750px',
      component: DeleteComponent,
      data: {
        services: rowItems,
        onCancel: (data?: any) => {
          if (data) {
            this.initData();
          }
          result.modalInstance.hide();
        },
      },
    });
  }

  public onPaginationChange(pageIndex: number, pageSize: number): void {
    this.dataSource = getTabelData(this.basicDataSource, {
      ...cloneDeep(this.pager),
      pageIndex,
      pageSize,
    });
    setTimeout(() => {
      if (this.totalDataChecked) {
        this.datatable.setTableCheckStatus({
          pageAllChecked: true,
        });
      } else {
        this.datatable.setTableCheckStatus({
          pageAllChecked: false,
        });
      }
    });
  }

  onCreateService(): void {
    const resulse = this.modalService.open({
      id: 'create-service',
      showAnimation: true,
      width: '750px',
      component: CreateComponent,
      data: {
        onClose: (res?: any) => {
          if (res) {
            this.initData();
          }
          resulse.modalInstance.hide();
        },
      },
    });
  }

  onSelectedTagsChange(e: FilterItem[]): void {
    const { data, tableData, pageination } = filterTabDataByCategory(
      this.basicDataSource,
      this.pager,
      e
    );
    this.pager = pageination;
    this.dataSource = tableData;
  }

  onRefresh(): void {
    this.initData();
  }
}
