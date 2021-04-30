import { Component, OnInit } from '@angular/core';
import { cloneDeep, flatten, map, uniq, uniqBy } from 'lodash';
import { DialogService, ICategorySearchTagItem, ModalService } from 'ng-devui';
import {
  FilterItem,
  filterTabDataByCategory,
  getTabelData,
} from 'src/app/shared/toolFunction/tabel.pagination';
import { ConfigService, getTagsByObj } from '../../../../common/config.service';
import { CreateModalComponent } from '../../modal/create/create-modal.component';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.less'],
})
export class ConfigListComponent implements OnInit {
  constructor(
    private service: ConfigService,
    private modalService: ModalService,
    private dialogService: DialogService
  ) {}
  private basicDataSource: any;
  dataSource: any;
  category: Array<ICategorySearchTagItem> | any = [
    {
      field: 'key',
      label: '配置项',
      type: 'textInput',
    },
    {
      field: 'status',
      label: '状态',
      options: [],
      type: 'label',
    },
    {
      field: 'labels_format',
      label: '标签',
      options: [],
      type: 'label',
    },
  ];

  dataTableOptions = {
    columns: [
      {
        field: 'key',
        header: '配置项',
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
        field: 'lables',
        header: '标签',
        fieldType: 'text',
        order: 3,
      },
      {
        field: 'type',
        header: '配置项类型',
        fieldType: 'text',
        order: 4,
      },
      {
        field: 'value_type',
        header: '配置格式',
        fieldType: 'text',
        order: 5,
      },
      {
        field: 'update_revision',
        header: '修订版本',
        fieldType: 'number',
        order: 6,
      },
      {
        field: 'update_time',
        header: '更新时间',
        fieldType: 'date',
        order: 7,
      },
      {
        field: '',
        header: '操作项',
        fieldType: 'date',
        order: 7,
      },
    ],
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  };

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(): void {
    this.service.getAllKies().subscribe(
      (data) => {
        this.basicDataSource = data.data.map((item) => {
          item.labels_format = getTagsByObj(item.labels);
          return item;
        });
        this.pager.total = this.basicDataSource.length;
        this.dataSource = getTabelData(this.basicDataSource, this.pager);
        this.category[1].options = uniqBy(
          map(this.basicDataSource, (item: any) => ({
            label: item.status,
          })),
          'label'
        );

        this.category[2].options = map(
          uniq(
            flatten(
              map(this.basicDataSource, (item: any) => item.labels_format)
            )
          ),
          (item) => ({
            label: item,
          })
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCreate(): void {
    const results = this.modalService.open({
      id: 'modal-modal',
      width: '550px',
      backdropCloseable: false,
      component: CreateModalComponent,
      data: {
        onClose: () => {
          results.modalInstance.hide();
        },
      },
    });
  }

  onForbidden(rowItem: { id: string; key: string }): void {
    const results = this.dialogService.open({
      id: 'forbidden',
      title: '提示',
      content: `确认禁用配置项 ${rowItem.key}`,
      width: '400px',
      buttons: [
        {
          text: '确定',
          cssClass: 'danger',
          handler: async () => {
            await forbiddenFn(rowItem.id, rowItem.key);
            results.modalInstance.hide();
            this.onRefresh();
          },
        },
        {
          text: '取消',
          cssClass: 'common',
          handler: () => {
            results.modalInstance.hide();
          },
        },
      ],
    });

    const forbiddenFn = (id: string, value: string) => {
      const pamars = {
        value,
        status: 'disabled',
      };
      return this.service.putKie(id, pamars).toPromise();
    };
  }

  onEnable(rowItem: { id: string; key: string }): void {
    const results = this.dialogService.open({
      id: 'forbidden',
      title: '提示',
      content: `确认启用配置项 ${rowItem.key} `,
      width: '400px',
      buttons: [
        {
          text: '确定',
          cssClass: 'danger',
          handler: async () => {
            await enableFn(rowItem.id, rowItem.key);
            results.modalInstance.hide();
            this.onRefresh();
          },
        },
        {
          text: '取消',
          cssClass: 'common',
          handler: () => {
            results.modalInstance.hide();
          },
        },
      ],
    });

    const enableFn = (id: string, value: string) => {
      const pamars = {
        value,
        status: 'enabled',
      };
      return this.service.putKie(id, pamars).toPromise();
    };
  }

  onDeleteItem(rowItem: { id: string; key: string }): void {
    const results = this.dialogService.open({
      id: 'deleteKie',
      width: '400px',
      showAnimate: true,
      title: '提示',
      content: `你确定要删除配置项 ${rowItem.key}`,
      buttons: [
        {
          text: '确认',
          cssClass: 'danger',
          handler: async () => {
            // todo
            await this.service.deleteKie(rowItem.id).toPromise();
            this.onRefresh();
            results.modalInstance.hide();
          },
        },
        {
          text: '取消',
          cssClass: 'common',
          handler: () => {
            // todo
            results.modalInstance.hide();
          },
        },
      ],
    });
  }

  onPaginationChange(pageIndex: number, pageSize: number): void {
    this.dataSource = getTabelData(this.basicDataSource, {
      ...cloneDeep(this.pager),
      pageIndex,
      pageSize,
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
}
