import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DValidateRules } from 'ng-devui';
import { envOptions } from 'src/config/global.config';
import { ServiceService } from '../../../../common/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
  @Input() data!: {
    onClose: (data?: any) => void;
  };

  constructor(private service: ServiceService) {}

  formGroup = new FormGroup({
    serviceName: new FormControl(''),
    appId: new FormControl(''),
    version: new FormControl(''),
    environment: new FormControl(''),
    description: new FormControl(''),
  });
  formRules: { [key: string]: DValidateRules } = {
    rule: { message: 'The form verification failed, please check.' },
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 1 },
        { whitespace: true },
        { maxlength: 128 },
      ],
    },
    appIdRules: {
      validators: [
        { required: true },
        { whitespace: true },
        { minlength: 1 },
        { maxlength: 128 },
      ],
    },
    versionRules: {
      validators: [
        { required: true },
        { whitespace: true },
        { minlength: 3 },
        { maxlength: 46 },
        {
          pattern: /^\d{1,}\.(\d{1,}\.){1,2}\d{1,}$/,
          message: {
            'zh-cn':
              'X.Y.Z, X.Y.Z.B 型版本号, X、Y、Z 为数字且范围在0-32767, 长度为3-46个字符',
            'en-us':
              'The value cannot contain characters except uppercase and lowercase letters.',
            default:
              'X.Y.Z, X.Y.Z.B 型版本号, X、Y、Z 为数字且范围在0-32767, 长度为3-46个字符',
          },
        },
      ],
    },
    environmentRules: {
      validators: [],
    },
    descriptionRules: {
      validators: [],
    },
  };

  items = [
    {
      title: 'aaa',
      content: 'content',
      type: 'ddd',
    },
  ];

  envOpetions!: {
    id: string;
    label: string;
  }[];

  ngOnInit(): void {
    this.envOpetions = JSON.parse(JSON.stringify(envOptions));
    this.formGroup.controls.environment.setValue(this.envOpetions[0]);
  }

  async onCreateBtn(): Promise<void> {
    const parmas = {
      service: {
        appId: this.formGroup.controls.appId.value,
        description: this.formGroup.controls.description.value,
        environment: this.formGroup.controls.environment.value?.id,
        serviceName: this.formGroup.controls.serviceName.value,
        version: this.formGroup.controls.version.value,
      },
    };
    const service = await this.service.postService(parmas).toPromise();
    this.data.onClose(service?.serviceId);
  }

  onCancel(): void {
    this.data.onClose();
  }
}
