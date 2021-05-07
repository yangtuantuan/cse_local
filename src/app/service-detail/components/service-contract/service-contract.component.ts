import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-service-contract',
  templateUrl: './service-contract.component.html',
  styleUrls: ['./service-contract.component.less'],
})
export class ServiceContractComponent implements OnInit {
  constructor(private service: ServiceService, private route: ActivatedRoute) {
    this.serviceId = this.route.snapshot.paramMap.get('id');
  }

  selectBtn = 'swagger';
  serviceId: string | null;
  options = [];

  monacoOptions = {
    theme: 'vs',
    language: 'yaml',
    readOnly: true,
  };

  code!: string;

  selected = { schema: '' };

  ngOnInit(): void {
    if (this.serviceId) {
      this.service.getSchemas(this.serviceId).subscribe(
        (res) => {
          this.options = res;
          this.selected = res[0];
          this.code = res[0].schema;
        },
        (err) => {
          // todo 提示
        }
      );
    }
  }

  onSelectLanguage(type: 'swagger' | 'yaml'): void {
    this.selectBtn = type;
  }
}
