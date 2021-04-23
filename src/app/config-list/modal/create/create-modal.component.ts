import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.less']
})
export class CreateModalComponent implements OnInit {
  @Input() data!: {
    onClose: () => void;
  };
  constructor(
    private router: Router
  ) { }

  items = [
    {
      title: '应用级配置',
      content: '将新建到配置关联到某一应用，并添加应用名称和所在环境到标签。',
      type: 'app',
    },
    {
      title: '微服务级配置',
      content: '将新建到配置关联到某一微服务，并添加微服务名称和所在环境到标签。',
      type: 'service',
    },
    {
      title: '自定义配置',
      content: '自定义一个新到配置文件。',
      type: 'custom',
    }
  ];

  ngOnInit(): void {
  }

  onCreateBtn(type: string): void {
    this.data.onClose();
    this.router.navigate(
      ['/kie/create'],
      {
        queryParams: {
          configType: type,
        }
      }
    );
  }

}
