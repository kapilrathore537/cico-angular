import { Chapter } from "./chapter";
import { StudentDetails } from "./student-details";
import { Subject } from "./subject";
export class ChapterExamResult {
  public id:number=0;
  public correcteQuestions:number=0;
  public  wrongQuestions:number=0;
  public notSelectedQuestions:number=0;
  public chapter= new Chapter;
  public subject = new Subject
  public student= new StudentDetails;
  public review= new Map<number, string>();
  public scoreGet:number =0;
  public totalQuestion:number=0;
}