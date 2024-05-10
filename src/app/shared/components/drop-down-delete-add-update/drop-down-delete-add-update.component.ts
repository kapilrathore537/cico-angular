import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Import Bootstrap's JavaScript in your JavaScript/TypeScript file

@Component({
  selector: 'app-drop-down-delete-add-update',
  templateUrl: './drop-down-delete-add-update.component.html',
  styleUrls: ['./drop-down-delete-add-update.component.scss']
})
export class DropDownDeleteAddUpdateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  @Input() params: any;
  @Input() id: any;
  @Input() path: string = ''
  @Input() index: number = 0
  @Input() editModalId: string = ''
  @Input() deleteModalId: string = ''
  @Output() onClick = new EventEmitter<any>();
  @Input() examType: string = ''

  getData() {
    this.onClick.emit({ type: 'getData', id: this.id, examType: this.examType })
  }
  deleteData() {
    this.onClick.emit({ type: 'delete', index: this.index, id: this.id, examType: this.examType })
  }

  public pageRenderUsingRouterLink() {
    this.router.navigate([this.path], {
      queryParams: this.params
    });
  }
}
