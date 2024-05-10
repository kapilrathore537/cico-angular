import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentServiceService } from 'src/app/service/assignment.service';
import { MyUploadAdapter } from 'src/app/entity/my-upload-adapter';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  preserveWhitespaces: true, // byfault it false for space between - -
  encapsulation: ViewEncapsulation.Emulated
})
export class TestingComponent {

  // constructor(private assignmentService: AssignmentServiceService) { }

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

