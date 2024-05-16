import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { Task } from 'src/app/entity/task';
import { PageRequest } from 'src/app/payload/page-request';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-shared-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  ngOnInit(): void {

  }
  constructor(private loginService: LoginService) {
    this.role = loginService.getRole().toLowerCase();
  }
  role: string = ''

  @Input() tasks: Task[] = [];
  @Input() taskIndexing: number = 0;


  @Input() paginationManager !: PaginationManager
  @Input() pageRequest!: PageRequest
  @Input() data: any
  @Input() type !: string
  @Output() eventEmit = new EventEmitter<any>();

  getAllData(event: any) {
    this.eventEmit.emit({ 'method': 'getAllData', 'type': this.type })
  }
}
