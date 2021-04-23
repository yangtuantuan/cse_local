import { Component, OnInit } from '@angular/core';
import { DialogService, ICategorySearchTagItem, ModalService } from 'ng-devui';
import { ConfigListService } from '../../config-list.service';
import { CreateModalComponent } from '../../modal/create/create-modal.component';
import { configTypeFn } from '../../pipe/config-type.pipe';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.less'],
})
export class ConfigListComponent implements OnInit {
  constructor(
    private service: ConfigListService,
    private modalService: ModalService,
    private dialogService: DialogService
  ) {}
  basicDataSource: any;
  category: Array<ICategorySearchTagItem> | any = [
    {
      field: 'key',
      label: '配置项',
      options: [
        {
          label: 'aaaa',
        },
      ],
      type: 'radio',
    },
    {
      field: 'configItem',
      label: '配置项',
      options: [
        {
          label: 'aaaa',
        },
      ],
      type: 'radio',
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

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(): void {
    this.service.getAllKies().subscribe(
      (data) => {
        this.basicDataSource = data.data.map((item) => {
          item.labels_format = Object.keys(item.labels).map((key) => {
            return `${key}=${item.labels[key] || ''}`;
          });
          return item;
        });
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
      content: '确认禁用xxx',
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
      content: '确认启用xxx',
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

  onDeleteItem(rowItem: { id: string }): void {
    const results = this.dialogService.open({
      id: 'deleteKie',
      width: '400px',
      showAnimate: true,
      title: '提示',
      content: '你确定要删除xxx么？',
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
}
