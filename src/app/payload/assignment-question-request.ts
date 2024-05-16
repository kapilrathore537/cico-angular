import { TaskQuestion } from '../entity/task-question';
import { TaskQuestionRequest } from './task-question-request';

export class AssignmentQuestionRequest {
  public assignmentId: number = 0;
  public taskAttachment: any
  public assignmentQuestion: TaskQuestionRequest[] = [];
}
