import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { PageRequest } from 'src/app/payload/page-request';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  ngOnInit(): void {

  }

  @Input() paginationManager !: PaginationManager
  @Input() pageRequest!: PageRequest
  @Input() data: any
  @Input() type !: string
  @Output() eventEmit = new EventEmitter<any>();

  getAllData() {
    this.eventEmit.emit({ 'method': 'getAllData', 'type': this.type })
  }
  ManageNextPrev(isNext: boolean) {
    if (isNext)
      this.pageRequest.pageNumber++;
    else
      this.pageRequest.pageNumber--;
    if (this.pageRequest.pageNumber >= 0 && this.pageRequest.pageNumber < this.paginationManager.totalPages)
      this.getAllData();
  }
  // get pages
  setPage(page: any) {
    if (page - 1 != this.pageRequest.pageNumber) {
      this.pageRequest.pageNumber = page - 1;
      this.getAllData();
    }
  }
}
