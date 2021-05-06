import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { isArray } from 'lodash';
import { ICategorySearchTagItem } from 'ng-devui';
import { FilterItem } from '../toolFunction/tabel.pagination';

@Component({
  selector: 'app-filter-refresh',
  templateUrl: './filter-refresh.component.html',
  styleUrls: ['./filter-refresh.component.less'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FilterRefreshComponent implements OnInit {
  @Input() category!: ICategorySearchTagItem[];

  @Output() selectedTagsChange = new EventEmitter();
  @Output() refresh = new EventEmitter();

  @ViewChild('categorySearch') categorySearch: any;

  constructor() {}

  ngOnInit(): void {}

  onSelectedTagsChange(e: any): void {
    const filters: FilterItem[] = e.selectedTags.map((item: any) => {
      return {
        field: item.field,
        value: isArray(item.value.value)
          ? item.value.value.map((j: any) => j.id || j.label)
          : item.value.value,
      };
    });
    this.selectedTagsChange.emit(filters);
  }
  onRefresh(): void {
    this.categorySearch.clearFilter();
    this.refresh.emit();
  }
}
