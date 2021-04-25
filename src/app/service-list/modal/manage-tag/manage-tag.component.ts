import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manage-tag',
  templateUrl: './manage-tag.component.html',
  styleUrls: ['./manage-tag.component.less']
})
export class ManageTagComponent implements OnInit {
  basicDataSource: any;
  @Input() data = {};

  constructor() { }

  ngOnInit(): void {
  }

}
