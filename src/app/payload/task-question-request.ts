import { Assignment } from "../entity/assignment";

export class TaskQuestionRequest {
    public questionId:number=0;
    public question: string = ''
    public videoUrl: string = ''
    public questionImages:File[]=[]
    public url:string=''
    public images:string[]=[]
}
//public questionImages = new Map<string,File>