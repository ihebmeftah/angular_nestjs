export class PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;

  constructor(data: T[], page: number, limit: number, totalItems: number) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / limit);
    this.hasNext = page < this.totalPages;
  }
}