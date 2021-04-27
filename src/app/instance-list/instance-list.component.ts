import { Component, OnInit } from '@angular/core';
import { DialogService, ModalService, TableWidthConfig } from 'ng-devui';
import { ServiceService } from 'src/common/service.service';
import { ManageTagComponent } from '../shared/manage-tag/manage-tag.module';
import { ActionItem } from '../shared/action-menu/action-menu.module';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.less'],
})
export class InstanceListComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private dialog: DialogService,
    private module: ModalService
  ) {}
  title = '实例列表';

  basicDataSource = [];
  columns = [
    {
      field: 'hostName',
      header: '实例名称',
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
      field: 'environment',
      header: '环境',
      fieldType: 'text',
      order: 3,
    },
    {
      field: 'serviceName',
      header: '所属服务',
      fieldType: 'text',
      order: 4,
    },
    {
      field: 'version',
      header: '所属版本',
      fieldType: 'text',
      order: 5,
    },
    {
      field: 'modTimestamp',
      header: '更新时间',
      fieldType: 'text',
      order: 6,
    },
  ];
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'hostName',
      width: '300px',
    },
  ];

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.basicDataSource = [];
    this.service.getInstances().subscribe(
      (res) => {
        this.basicDataSource = res;
      },
      (err) => {
        // todo 提示
      }
    );
  }

  actionFn(rowItem: any): ActionItem[] {
    // UP在线,OUTOFSERVICE摘机,STARTING正在启动,DOWN下线,TESTING拨测状态。
    const actions: ActionItem[] = [
      {
        id: 'DOWN',
        label: '下线',
        disabled: rowItem.status === 'DOWN',
      },
      {
        id: 'tags',
        label: '标签管理',
      },
      {
        id: 'UP',
        label: '上线',
        disabled: rowItem.status === 'UP',
      },
      {
        id: 'OUTOFSERVICE',
        label: '摘机',
        disabled: rowItem.status === 'OUTOFSERVICE',
      },
      {
        id: 'TESTING',
        label: '拨测',
        disabled: rowItem.status === 'TESTING',
      },
    ];

    return actions;
  }

  actionClick(e: ActionItem, rowItem: any): void {
    if (e.id === 'tags') {
      const results = this.module.open({
        id: 'manage-tag',
        component: ManageTagComponent,
        width: '750px',
        data: {
          close: (res: boolean) => {
            if (res) {
              this.initData();
            }
            results.modalInstance.hide();
          },
        },
      });
    } else {
      const results = this.dialog.open({
        id: 'action-modal',
        title: '提示',
        content: `确认改变实例 "${rowItem.hostName}" 的状态为${e.label}?`,
        buttons: [
          {
            text: '确定',
            cssClass: 'danger',
            handler: () => {
              this.service
                .setInstanceStatus(rowItem.serviceId, rowItem.instanceId, e.id)
                .subscribe(
                  (res: any) => {
                    this.initData();
                  },
                  (err) => {
                    // todo 错误提示
                  }
                );
              results.modalInstance.hide();
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
    }
  }
}
