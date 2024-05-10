import { TechnologyStack } from "./technology-stack";

export class JobAlert {
    public jobId: number = 0;
    public jobTitle: string = '';
    public jobDescription: string = '';
    public companyName: string = '';
    public experienceRequired: string = '';
    public technicalSkills: string = '';
    public companyDescription:string='';
    public jobResponsibilities:[]=[];
    public type: string = '';
    public jobPackage:string = '';
    public technologyStack: TechnologyStack = new TechnologyStack();
    public isActive:boolean |undefined

}
