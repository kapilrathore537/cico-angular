import { Chapter } from "./chapter";
import { TechnologyStack } from "./technology-stack";

export class Subject {
    // public subjectId:number = 0;
    // public subjectName:string = '';
    // public chapters:[] = [];
    // public technologyStack:TechnologyStack = new TechnologyStack;
    // public isDeleted:boolean = false;
    // public isActive:boolean = true;

    public subjectId:number = 0;
    public subjectName:string = '';
    public chapters:Chapter[] = [];
    public technologyStack:TechnologyStack = new TechnologyStack;
    public isDeleted:boolean = false;
    public isActive:boolean = true;
}
