import { BatchResponse } from "./batch-response";
import { SubjectResponse } from "./subject-response";
import { TechnologyStackResponse } from "./technology-stack-response";

export class Coursereponse {
  public courseId!:number;
  public  courseName:string='';
  public  courseFees!:string;
  public  subjectCount!:number;
  public  batchesCount!:number;
 // public technologyImage!:string
  public   duration!:string;
  public  sortDescription!:string;
  public  isStarterCourse!:boolean;
  public technologyStack:TechnologyStackResponse = new TechnologyStackResponse 
  public subjectResponse:SubjectResponse[]=[]
  public batchResponse : BatchResponse[]=[]
}


