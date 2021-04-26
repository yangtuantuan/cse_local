import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.less'],
})
export class ActionMenuComponent implements OnInit {
  @Input() actions!: ActionItem[];
  @Input() menuText?: string;
  @Input() maxShowNum = 3;
  @Input() onToggle?: (e?: any) => void;
  @Input() moreBtnRef?: TemplateRef<any>;

  @Output() meunClick = new EventEmitter();

  constructor() {}

  moreActions?: ActionItem[];
  buttonActions?: ActionItem[];

  ngOnInit(): void {
    console.log(this.actions);

    this.actions = this.actions.filter(
      (item) => item.show || item.show === undefined
    );

    if (this.actions.length > this.maxShowNum) {
      this.buttonActions = this.actions.slice(0, this.maxShowNum - 1);
      this.moreActions = this.actions.slice(this.maxShowNum - 1);
    } else {
      this.buttonActions = this.actions;
    }
    console.log(this.buttonActions, this.moreActions);
  }

  toggle(e?: any): void {
    if (this.onToggle) {
      this.onToggle(e);
    }
  }

  onClick(e: ActionItem): any {
    this.meunClick.emit(e);
  }
}

export interface ActionItem {
  id?: string;
  label: string;
  disabled?: boolean;
  show?: boolean;
  tip?: string;
}
