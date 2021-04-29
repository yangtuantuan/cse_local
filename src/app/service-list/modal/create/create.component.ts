import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../../common/service.service';

const defaultOpetion = [
  {
    id: '',
    label: '<空>',
  },
  {
    id: 'production',
    label: 'production',
  },
  {
    id: 'development',
    label: 'development',
  },
  {
    id: 'testing',
    label: 'testing',
  },
  {
    id: 'acceptance',
    label: 'acceptance',
  },
];

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

  items = [
    {
      title: 'aaa',
      content: 'content',
      type: 'ddd',
    },
  ];

  versionReg = /^\d{1,}\.(\d{1,}\.){1,2}\d{1,}$/;

  serviceName!: string;
  appId!: string;
  version!: string;

  description!: string;

  envOpetions!: {
    id: string;
    label: string;
  }[];
  environment!: {
    id: string;
    label: string;
  };

  ngOnInit(): void {
    this.envOpetions = JSON.parse(JSON.stringify(defaultOpetion));
    this.environment = this.envOpetions[0];
  }

  async onCreateBtn(): Promise<void> {
    const parmas = {
      service: {
        appId: this.appId,
        description: this.description,
        environment: this.environment.id || '',
        serviceName: this.serviceName,
        version: this.version,
      },
    };
    const service = await this.service.postService(parmas).toPromise();
    this.data.onClose(service?.serviceId);
  }

  onCancel(): void {
    this.data.onClose();
  }
}
