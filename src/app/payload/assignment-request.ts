import { Assignment } from 'src/app/entity/assignment';
import { TaskQuestion } from '../entity/task-question';
export class AssignmentRequest {
    public title:string = '';
    // public taskAttachment:string = '';
    // public assginmentQuestion:TaskQuestion[]=[];
    public courseId:number = 0;
    public subjectId:number = 0;
}
