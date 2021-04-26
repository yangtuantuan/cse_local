import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import * as swaggerUI from 'swagger-ui';
import * as yaml from 'js-yaml';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.less'],
})
export class SwaggerComponent implements OnInit, OnChanges {
  @Input() code: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    swaggerUI({
      dom_id: '#swagger-ui',
      spec: yaml.load(this.code.toString()),
    });
  }
}
