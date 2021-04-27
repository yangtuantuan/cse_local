import { Component, OnInit, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ServiceService } from 'src/common/service.service';
import { ActionItem } from '../action-menu/action-menu.module';

@Component({
  selector: 'app-manage-tag',
  templateUrl: './manage-tag.component.html',
  styleUrls: ['./manage-tag.component.less'],
})
export class ManageTagComponent implements OnInit {
  @Input() data?: {
    close: (res?: boolean) => void;
    serviceId: string;
  };

  constructor(private service: ServiceService) {}

  basicDataSource: any;
  headerNewForm!: boolean;

  columns = [
    {
      field: 'key',
      header: '键',
      fieldType: 'text',
      width: '200px',
    },
    {
      field: 'value',
      header: '值',
      fieldType: 'text',
      width: '200px',
    },
    {
      field: '操作',
      header: '操作',
      fieldType: 'text',
      width: '200px',
    },
  ];

  defaultRowData = {
    key: '',
    value: '',
    id: new Date().getTime().toString(),
  };

  eidteIndex = 0;

  ngOnInit(): void {
    this.initData();
  }
  initData(): void {
    if (this.data?.serviceId) {
      this.service.getServiceTags(this.data.serviceId).subscribe(
        (res) => {
          this.basicDataSource = Object.keys(res.tags).map((key) => {
            return {
              key,
              value: res.tags[key],
              id: new Date().getTime().toString() + key,
            };
          });
        },
        (err) => {
          // todo 提示
          this.basicDataSource = [];
        }
      );
    }
  }

  newRow(): void {
    this.headerNewForm = true;
  }

  quickRowAdded(): void {
    const newData = { ...this.defaultRowData };
    this.defaultRowData = {
      key: '',
      value: '',
      id: new Date().getTime().toString(),
    };
    const dataIndex = this.basicDataSource.findIndex(
      (item: any) => item.id === newData.id
    );
    // 替换原值
    if (dataIndex !== -1) {
      this.basicDataSource[dataIndex] = newData;
    } else {
      // 添加新值
      this.basicDataSource.unshift(newData);
    }
    this.headerNewForm = false;
    this.eidteIndex = 0;
  }

  quickRowCancel(): void {
    this.headerNewForm = false;
    this.defaultRowData = {
      key: '',
      value: '',
      id: new Date().getTime().toString(),
    };
    this.eidteIndex = 0;
  }

  actionsFn(e: any): ActionItem[] {
    const actions = [
      {
        id: 'edit',
        label: '编辑',
        show: !e.isEdit,
        click: () => {
          // todo
        },
      },
      {
        id: 'delete',
        label: '删除',
      },
    ];

    return actions;
  }

  menuClick(action: ActionItem, rowItem: any, index: number = 0): void {
    if (action.id === 'delete') {
      this.basicDataSource = cloneDeep(this.basicDataSource).filter(
        (item: any) => {
          return item.id !== rowItem.id;
        }
      );
    }
    if (action.id === 'edit') {
      this.eidteIndex = index;
      this.defaultRowData = cloneDeep(rowItem);
      this.headerNewForm = true;
    }
  }

  onConfirmBtn(): void {
    const tags = this.basicDataSource.reduce((obj: any, item: any) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    this.service
      .postServiceTags(this.data?.serviceId as string, tags)
      .subscribe(
        () => {
          this.data?.close(true);
        },
        (err) => {
          // todo 提示
        }
      );
  }

  onCancel(): void {
    this.data?.close();
  }
}
