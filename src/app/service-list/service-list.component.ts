import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { DataTableComponent, TableCheckOptions, TableWidthConfig, RowCheckChangeEventArg } from 'ng-devui/data-table';
import { ManageTagComponent } from './manage-tag/manage-tag.component';
import { basicDataSource } from 'mock/serviceList.mock';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.less']
})
export class ServiceListComponent implements OnInit {
  constructor(private dialogService: DialogService) {

  }
  @ViewChild(DataTableComponent, { static: true }) datatable!: DataTableComponent;

  title = '服务列表';

  basicDataSource: any;
  dataTableOptions = {
    columns: [
      {
        field: 'name',
        header: 'Name',
        fieldType: 'text',
        order: 1
      },
      {
        field: 'environment',
        header: 'Environment',
        fieldType: 'text',
        order: 2
      },
      {
        field: 'version',
        header: 'Version',
        fieldType: 'text',
        order: 3
      },
      {
        field: 'instances',
        header: 'Instances',
        fieldType: 'text',
        order: 4
      },
      {
        field: 'createTime',
        header: 'Create Time',
        fieldType: 'Date',
        order: 5
      },
    ]
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '50px'
    },
    {
      field: 'name',
      width: '150px'
    },
    {
      field: 'environment',
      width: '150px'
    },
    {
      field: 'version',
      width: '150px'
    },
    {
      field: 'instances',
      width: '200px'
    },
    {
      field: 'operation',
      width: '150px'
    }
  ];
  private totalDataChecked = false;
  checkOptions: TableCheckOptions[] = [
    {
      label: '全选所有数据',
      onChecked: this.checkTotalData.bind(this)
    },
    {
      label: '全选当前页数据',
      onChecked: this.checkPageData.bind(this)
    }
  ];
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 6,
    pageSizeOptions: [5, 10, 15, 20]
  };

  ngOnInit(): void {
    this.basicDataSource = basicDataSource;

    this.pager.total = basicDataSource.length;
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

  public deleteItem(id?: string): void {
    console.log(id);
  }

  onRowCheckChange(checked: any, rowIndex: number, nestedIndex: string, rowItem: any): void {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus(
      {
        rowIndex,
        nestedIndex,
        rowItem,
        checked
      }
    );
  }

  private checkTotalData(): void {
    this.datatable.setTableCheckStatus(
      {
        pageAllChecked: true
      }
    );
    this.totalDataChecked = true;
  }

  private checkPageData(): void {
    this.datatable.setTableCheckStatus(
      {
        pageAllChecked: true
      }
    );
    this.totalDataChecked = false;
  }

  public onPageIndexChange(pageIndex: number): void {
    const data = JSON.parse(JSON.stringify(this.basicDataSource));
    this.basicDataSource = data.slice(pageIndex - 1, pageIndex + 5);
    setTimeout(() => {
      if (this.totalDataChecked) {
        this.datatable.setTableCheckStatus(
          {
            pageAllChecked: true
          }
        );
      } else {
        this.datatable.setTableCheckStatus(
          {
            pageAllChecked: false
          }
        );
      }
    });
  }
}
