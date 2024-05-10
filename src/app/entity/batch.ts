import { Time } from "@angular/common";
import { TechnologyStack } from "./technology-stack";
import { Subject } from "./subject";


export class Batch {
	batchStartDate:Date | undefined;
    batchId:number = 0;
	batchTiming:any ;
	batchName:string = '';
	batchDetails:string = '';
	subject:Subject = new Subject();
	isDeleted = false;
	isActive = true;
	
}