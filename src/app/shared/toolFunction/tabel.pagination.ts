// tslint:disable:variable-name

import { cloneDeep, isArray, isMatch, reduce } from 'lodash';

export const getTabelData = (
  data: any[], // 原数据 已排序
  pageination: PaginationOptions // 分页配置
): any[] => {
  let __data = filterTableData(data);
  __data = __data.slice(
    (pageination.pageIndex - 1) * pageination.pageSize,
    pageination.pageIndex * pageination.pageSize
  );
  return __data;
};

export const filterTableData = (
  data: any[], // table数据
  filter?: { [key: string]: any }[]
): any[] => {
  if (!isArray(data)) {
    return [];
  }
  let __data = cloneDeep(data || []);
  __data = reduce(
    __data,
    (list: any[], item: any) => {
      if (isMatch(item, filter || {})) {
        list.push(item);
      }
      return list;
    },
    []
  );
  return __data;
};

export const getShowPagination = (
  total: number,
  minPageSize: number
): boolean => {
  return total > minPageSize;
};

interface PaginationOptions {
  total: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[];
  [key: string]: any;
}
