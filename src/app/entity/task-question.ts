import { Assignment } from "./assignment";
import { AssignmentSubmission } from "./assignment-submission";
export class TaskQuestion {
    public questionId: number = 0
    public question: string = ''
    public videoUrl: string = ''
    public questionImages: string[] = []
    public assignment: Assignment = new Assignment
    public assignmentSubmission: AssignmentSubmission[] = []
    public isActive!: boolean;
    public taskNumber: number = 0;
}