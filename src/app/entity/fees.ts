import { Course } from "./course";
import { StudentDetails } from "./student-details";

export class Fees {

    public feesId: number = 0;
    //  public student:StudentDetails=new StudentDetails;
    public studentId!: number;
    public userId: string = '';
    public fullName: string = '';
    public mobile: string = '';
    public dob: Date | undefined;
    public email: string = '';
    public college: string = '';
    public profilePic: string = '';
    public currentCourse: string = '';
    public finalFees!: number;
    public feesPaid: number = 0;

    public courseId!: number;
    public courseName: string = '';
    public courseFees: string = '';
    // public course:Course=new Course;
    public remainingFees: number = 0;
    public date!: Date;
    public createdDate: Date | undefined
    public updatedDate: Date | undefined;
    public isCompleted: boolean = false;

}
