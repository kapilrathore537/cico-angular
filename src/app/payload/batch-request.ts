export class BatchRequest {
    public courseId:number = 0
    public subjectId:number = 0;
    public batchName:string = '';
    public batchStartDate:Date | undefined; 
    public batchTiming:any;
    public batchDetails:string = '';
}
