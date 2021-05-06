import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DValidateRules, FormLayout, ModalService } from 'ng-devui';
import { EditorComponent } from 'ngx-monaco-editor';
import { ConfigService, getTagsByObj } from '../../../../common/config.service';
import { SelectAppComponent } from '../../modal/select-app/select-app.component';
import { SelectServiceComponent } from '../../modal/select-service/select-service.component';

const defaultConfig = {
  theme: 'vs-dark',
  language: 'text',
};

@Component({
  selector: 'app-config-create',
  templateUrl: './config-create.component.html',
  styleUrls: ['./config-create.component.less'],
})
export class ConfigCreateComponent implements OnInit {
  @ViewChild('monacoEditor') monacoEditor!: EditorComponent;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ConfigService,
    private modalService: ModalService
  ) {
    this.route.queryParams.subscribe((res) => {
      if (res.configType) {
        this.configType = res.configType;
      }
      this.kvId = res.kvId;
    });
    this.route.data.subscribe((res) => {
      this.type = res.type;
      this.title = res.type === 'eidt' ? '编辑配置' : '新建配置';
    });
  }

  formGroup = new FormGroup({
    code: new FormControl(''),
    configName: new FormControl(''),
  });

  formRules: { [key: string]: DValidateRules } = {
    rule: { message: 'The form verification failed, please check.' },
    codeRules: {
      validators: [{ required: true }, { whitespace: true }],
    },
    appId: {
      validators: [{ required: true }],
    },
  };

  type!: 'create' | 'eidt'; // 编辑 创建
  configType!: 'app' | 'service' | 'custom'; // custom app service
  kvId!: string;
  title!: string;
  FormLayout = FormLayout;
  configFormatItems = [
    {
      id: 'text',
      text: 'TEXT',
    },
    {
      id: 'json',
      text: 'JSON',
    },
    {
      id: 'xml',
      text: 'XML',
    },
    {
      id: 'yaml',
      text: 'YAML',
    },
    {
      id: 'ini',
      text: 'INI',
    },
    {
      id: 'properties',
      text: 'Properties',
    },
  ];
  configFormatId: string = defaultConfig.language;
  editorOptions = defaultConfig;
  status: 'enabled' | 'disabled' = 'enabled'; // 状态
  tags: string[] = []; // 标签

  appId = ''; // 应用名称
  serviceId = ''; // 微服务id

  isAlphabetPattern = /^[a-zA-Z0-9-_.]+$/;

  configTageKey!: string;
  configTageValue!: string;

  ngOnInit(): void {
    if (this.kvId) {
      this.service.getKie(this.kvId).subscribe(
        (res) => {
          this.tags = getTagsByObj(res.labels || {});
          this.formGroup.controls.configName.setValue(res.key);
          this.formGroup.controls.code.setValue(res.value);
          this.status = res.status;
          this.configFormatItems = JSON.parse(
            JSON.stringify(this.configFormatItems)
          ).filter((item: any) => item.id === res.value_type);
          this.onConfigFormat(res.value_type);
        },
        (err) => {
          // todo 提示
        }
      );
    }
  }

  onConfigFormat(id: string): void {
    this.configFormatId = id;
    this.editorOptions = {
      ...defaultConfig,
      language: id,
    };
  }

  onSelectApp(): void {
    const results = this.modalService.open({
      id: 'select-app',
      width: '550px',
      backdropCloseable: false,
      component: SelectAppComponent,
      data: {
        onClose: (rowItem: any) => {
          if (rowItem?.appId) {
            this.appId = rowItem.appId;
            this.tags = [
              `app=${rowItem.appId}`,
              `enviroment=${rowItem.environment}`,
            ];
          }
          results.modalInstance.hide();
        },
      },
    });
  }

  onDeleteApp(): void {
    this.appId = '';
    this.tags = [];
  }

  onSelectService(): void {
    const results = this.modalService.open({
      id: 'select-service',
      width: '750px',
      backdropCloseable: false,
      component: SelectServiceComponent,
      data: {
        onClose: (rowItem?: any, version?: string) => {
          if (rowItem?.appId) {
            this.serviceId = rowItem.serviceName;
            this.tags = [
              `service=${rowItem.serviceName}`,
              `app=${rowItem.appId}`,
              `enviroment=${rowItem.environment}`,
              `version=${version}`,
            ];
          }
          results.modalInstance.hide();
        },
      },
    });
  }

  onDeleteService(): void {
    this.serviceId = '';
    this.tags = [];
  }

  onAddTage(): void {
    this.tags.push(`${this.configTageKey}=${this.configTageValue}`);
    this.configTageKey = '';
    this.configTageValue = '';
  }

  onSubmit(): void {
    const param = {
      key: this.formGroup.controls.configName.value,
      labels: this.tags.reduce((pre: any, tag) => {
        const key = tag.split('=')[0];
        const value = tag.split('=')[1];
        pre[key] = value;
        return pre;
      }, {}),
      value: this.formGroup.controls.code.value,
      value_type: this.editorOptions.language,
      status: this.status,
    };
    if (this.kvId) {
      this.service.putKie(this.kvId, param).subscribe(
        (res) => {
          // todo 提示
          this.cancel();
        },
        (err) => {
          // todo 提示
        }
      );
      return;
    }

    this.service.postKie(param).subscribe(
      (res) => {
        console.log(res);
        // todo 提示
        this.cancel();
      },
      (err) => {
        // todo 提示
        console.log(err);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/kie']);
  }
}
