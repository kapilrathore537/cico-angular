import { TechnologyStack } from "../entity/technology-stack";
import { TechnologyStackResponse } from "./technology-stack-response";

export class SubjectResponse {

    public subjectId: number = 0;
    public subjectName: string = '';
    public chapters: [] = [];
    public technologyStack: TechnologyStackResponse = new TechnologyStackResponse;
    public isDeleted: boolean = false;
    public isActive: boolean = true;
    public chapterCount: number =0;
    public chapterCompleted:number=0;
 
}
