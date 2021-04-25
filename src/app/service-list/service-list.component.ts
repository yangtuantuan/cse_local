import { Component, OnInit, ViewChild } from '@angular/core';
import { basicDataSource } from 'mock/serviceList.mock';
import {
  DataTableComponent,
  TableCheckOptions,
  TableWidthConfig,
} from 'ng-devui/data-table';
import { DialogService, ModalService } from 'ng-devui/modal';
import { CreateComponent } from './modal/create/create.component';
import { DeleteComponent } from './modal/delete/delete.component';
import { ManageTagComponent } from './modal/manage-tag/manage-tag.component';
import { ServiceService } from '../../common/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.less'],
})
export class ServiceListComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private modalService: ModalService,
    private service: ServiceService
  ) {}
  @ViewChild(DataTableComponent, { static: true })
  datatable!: DataTableComponent;

  title = '服务列表';

  basicDataSource: any;
  dataTableOptions = {
    columns: [
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
    ],
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '50px',
    },
    {
      field: 'name',
      width: '150px',
    },
    {
      field: 'environment',
      width: '150px',
    },
    {
      field: 'version',
      width: '150px',
    },
    {
      field: 'instances',
      width: '200px',
    },
    {
      field: 'operation',
      width: '150px',
    },
  ];
  private totalDataChecked = false;
  checkOptions: TableCheckOptions[] = [
    {
      label: '全选所有数据',
      onChecked: this.checkTotalData.bind(this),
    },
    {
      label: '全选当前页数据',
      onChecked: this.checkPageData.bind(this),
    },
  ];
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 6,
    pageSizeOptions: [5, 10, 15, 20],
  };

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.service.getServiceByGovern().subscribe(
      (data) => {
        this.basicDataSource = (data?.allServicesDetail || []).map(
          (item: any) => {
            if (!item?.microService?.environment) {
              item.microService.environment = '<空>';
            }
            return item.microService;
          }
        );
        this.pager.total = basicDataSource.length;
      },
      (err) => {
        // todo 提示
        this.basicDataSource = [];
        this.pager.total = 0;
      }
    );

    // this.service.getService().subscribe(
    //   (data) => {
    //     this.basicDataSource = (data?.services || []).map((item: any) => {
    //       if (!item?.environment) {
    //         item.microService.environment = '<空>';
    //       }
    //       return item;
    //     });
    //     this.pager.total = basicDataSource.length;
    //   },
    //   (err) => {
    //     // todo 提示
    //     this.basicDataSource = [];
    //     this.pager.total = 0;
    //   }
    // );
  }

  public manageTag(rowIten: any): void {
    const results = this.dialogService.open({
      id: 'manageTag',
      width: '346px',
      maxHeight: '600px',
      title: '标签管理',
      content: ManageTagComponent,
      backdropCloseable: false,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          disabled: false,
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Cancel',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
      data: {
        name: 'Tom',
        age: 10,
        address: 'Chengdu',
      },
    });
    console.log(results.modalContentInstance);
  }

  public deleteItem(rowItem?: { serviceName: string }): void {
    const result = this.modalService.open({
      id: 'delte-service',
      width: '750px',
      component: DeleteComponent,
      data: {
        services: [rowItem],
        onCancel: (data?: any) => {
          if (data) {
            this.initData();
          }
          result.modalInstance.hide();
        },
      },
    });
  }

  onRowCheckChange(
    checked: any,
    rowIndex: number,
    nestedIndex: string,
    rowItem: any
  ): void {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex,
      nestedIndex,
      rowItem,
      checked,
    });
  }

  private checkTotalData(): void {
    this.datatable.setTableCheckStatus({
      pageAllChecked: true,
    });
    this.totalDataChecked = true;
  }

  private checkPageData(): void {
    this.datatable.setTableCheckStatus({
      pageAllChecked: true,
    });
    this.totalDataChecked = false;
  }

  public onPageIndexChange(pageIndex: number): void {
    const data = JSON.parse(JSON.stringify(this.basicDataSource));
    this.basicDataSource = data.slice(pageIndex - 1, pageIndex + 5);
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
}
