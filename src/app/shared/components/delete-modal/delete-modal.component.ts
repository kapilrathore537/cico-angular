
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  @Input() title: string = '';
  @Output() onClick = new EventEmitter<any>()

  public deleteFun() {
    this.onClick.emit()
  }
}
