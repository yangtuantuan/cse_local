// tslint:disable:variable-name
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autoHide]',
})
export class AutoHidePaginationDirective implements OnChanges {
  @Input() total!: number;
  @Input() pageSizeOptions: number[] = [5];

  @Input() autoHide = false;

  constructor(private el: ElementRef) {
    this.__display = this.el.nativeElement.style.display;
  }
  private __display = '';

  private hide(): void {
    this.el.nativeElement.style.display = 'none';
  }
  private show(): void {
    this.el.nativeElement.style.display = this.__display;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.autoHide && this.total <= this.pageSizeOptions[0]) {
      this.hide();
    } else {
      this.show();
    }
  }
}
