import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyUploadAdapter } from 'src/app/entity/my-upload-adapter';
import { TestingComponent } from 'src/app/pages/testing/testing.component';
import { AssignmentServiceService } from 'src/app/service/assignment.service';

@Component({
  selector: 'app-admin-task-and-assignments',
  templateUrl: './admin-task-and-assignments.component.html',
  styleUrls: ['./admin-task-and-assignments.component.scss']
})
export class AdminTaskAndAssignmentsComponent {
  constructor(private assignmentService: AssignmentServiceService) { }

  // public Editor = ClassicEditor;
  // static images: File[] = []
  // private editorInstance: any; 

  // onEditorReady(eventData: any) { 
  //   this.editorInstance = eventData;
  //   eventData.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
  //     return new MyUploadAdapter(loader);
  //   };
  // }
  
  // submit() {
  //   const textElement = document.createElement('div');
  //   textElement.innerHTML = this.editorInstance.getData();
  //   const text = textElement.innerText.trim();
  //   this.assignmentService.createAssignment(text, TestingComponent.images).subscribe(
  //     (data) => {
  //       alert("Done")
  //     }
  //   )
  // }
  // public static uploadImages(data: File) {
  //   this.images.push(data)
  //   console.log(data.name)
  // }
}
