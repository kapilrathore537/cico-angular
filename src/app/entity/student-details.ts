import { Coursereponse } from "../payload/coursereponse";
import { Course } from "./course";

export class StudentDetails {

	public studentId!: number;
	public userId: string = '';
	public fullName: string = '';
	public mobile: string = '';
	public dob: Date | undefined;
	public email: string = '';
	public college: string = '';
	public joinDate: Date | undefined;
	public profilePic: string = '';
	public createdDate: Date | undefined;
	public applyForCourse: string = '';
	public currentSem: string = '';
	public fathersName: string = '';
	public mothersName: string = '';
	public fathersOccupation = '';
	public contactFather: string = '';
	public contactMother: string = ''
	public localAddress: string = '';
	public parmanentAddress:string = '';
	public languageKnown: string = '';
	public currentCourse: string = '';
	public finalFees!:number;
	// public isCompleted:boolean | undefined;
	// public isActive:boolean | undefined
	public course:Course=new Course();
	public courseResponse!:Coursereponse
}
