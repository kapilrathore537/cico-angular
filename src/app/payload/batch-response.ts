import { SubjectResponse } from "./subject-response";
import { TechnologyStackResponse } from "./technology-stack-response";

export class BatchResponse {
     batchId:number=0;
	 batchName:string='';
	 batchStartDate!:Date
	 batchTiming!:Date
	 batchDetails:string='';
	// public technologyStack!:TechnologyStackResponse 
	 public subject:SubjectResponse = new SubjectResponse
	 
}
