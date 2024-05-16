import { AssignmentImage } from "./assignment-image"
import { Course } from "./course";
import { Subject } from "./subject";
import { TaskQuestion } from "./task-question"

export class Assignment {
   public id: number = 0;
   public title: string = '';
   public taskAttachment: any;
   public assignmentQuestion: TaskQuestion[] = [];
   public course: Course = new Course;
   public subject: Subject = new Subject;
   public isActive: boolean = true;
   public createdDate: Date | undefined;

}
