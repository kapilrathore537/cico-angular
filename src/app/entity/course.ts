import { Batch } from "./batch";
import { Subject } from "./subject";
import { TechnologyStack } from "./technology-stack";

export class Course {

	public courseId: number = 0;
	public courseName: string = '';
	public courseFees: string = '';
	public duration: string = '';
	public subjects: Subject[] = [];
	public batches: Batch[] = [];
	public sortDescription: string = '';
	public createdDate: Date | undefined;
	public updatedDate: Date | undefined;
	public isDeleted = false;
	public technologyStack: TechnologyStack = new TechnologyStack;
	public isStarterCourse: boolean = false;
	imageName: any;
}
