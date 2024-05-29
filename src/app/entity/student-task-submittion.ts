import { StudentDetails } from "./student-details"

export class StudentTaskSubmittion {
    public submissionId: number = 0
    public taskDescription: string = ''
    public submittionFileName: any
    public status: string = ''
    public review: string = ''
    public submissionDate: any
    public taskId: number = 0
    public taskName: string = ''
    public profilePic!: string
    public studentId!: number
    public fullName!: string
    public applyForCourse!: string
    public title!: string
    public description!: string
    submitFile: any
    public taskNumber: any;
    public taskVersion: number = 0;
}