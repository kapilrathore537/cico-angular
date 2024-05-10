import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/entity/task';
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

}
