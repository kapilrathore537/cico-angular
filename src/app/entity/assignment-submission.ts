import { StudentDetails } from "./student-details"
import { TaskQuestion } from "./task-question"

export class AssignmentSubmission {

    public submissionId: number = 0
    public assignmentId: number = 0
    public taskId: number = 0
    public student: StudentDetails = new StudentDetails
    public description: string = ''
    public submitFile: string = ''
    public submissionDate!: Date
    public status: string = ''
    public review: string = ''
    public taskQuestion: TaskQuestion = new TaskQuestion
    public title: string = ''

    public taskDescription: string = ''
    public submittionFileName!: File

    public taskName: string = ''
    public profilePic!: string
    public studentId!: number
    public fullName!: string
    public applyForCourse!: string
    public taskNumber: any;
    public taskVersion: number = 0;

}
