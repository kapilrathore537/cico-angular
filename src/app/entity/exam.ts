import { QuizeQuestion } from "./quize-question"
import { Question } from "./question"

export class Exam {
    public examId: number | undefined
    public examName: number | undefined
    public score: number | undefined
    public isDeleted: boolean | undefined
    public isActive: boolean | undefined
    public questions: QuizeQuestion[] = []
    public examTimer!: number;
    public totalQuestionForTest!: number
    public passingMarks!: number
    public examType!: string;
    public scheduleTestDate!: Date
    public subjectId!: number
    public totalExamQuestion!: number
    public examImage!: string
    public examStartTime: any
    public isStart!: boolean
}