import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ServiceListService } from '../../service-list.service';

const defaultOpetion = [
  {
    id: '',
    label: '<空>',
  }
]

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  @Input() data!: {
    onClose: () => void;
  }

  constructor(
    private service: ServiceListService,

  ) { }

  items = [
    {
      title: 'aaa',
      content: 'content',
      type: 'ddd'
    }
  ];

  versionReg = /^\d{1,}\.(\d{1,}\.){1,2}\d{1,}$/;

  serviceName!: string;
  appId!: string;
  version!: string;
  environment!: string;
  description!: string;

  envOpetions!: {
    id: string,
    label: string,
  }[]

  ngOnInit(): void {

    this.envOpetions = JSON.parse(JSON.stringify(defaultOpetion))
  }

  onCreateBtn(): void {
    const parmas = {
      appId: this.appId,
      description: this.description,
      environment: this.environment,
      serviceName: this.serviceName,
      version: this.version,
      level: "BACK",
      status: "UP",
    }

    this.service.createService(parmas).subscribe(
      (res) => {
        // todo
      },
      (err) => {
        // todo 提示
      }
    )
    this.data.onClose();
  }

  onCancel(): void {
    this.data.onClose();
  }



}
