
import { Course } from "../entity/course";
import { Subject } from "../entity/subject";

export class TaskRequest {
    public course!: Course; 
    public subject!: Subject;
    public attachmentStatus:string=''
    public taskName:string=''
        

}
