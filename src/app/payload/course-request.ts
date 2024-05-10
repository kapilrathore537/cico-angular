export class CourseRequest {
	public courseIds:number[]=[]
	public  courseName:string='';
	public  courseFees:string='';
	public  duration:string='';
	public  sortDescription:string='';
    public  subjectIds:number[]=[]
    public  technologyStack:number =0;
	public isStarterCourse!:boolean;
	public courseId!:number
}
