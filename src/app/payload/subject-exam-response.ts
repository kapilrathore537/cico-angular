export class SubjectExamResponse {

    subjectName!: string;
    examId!: number;
    subjectId!: number;
    examImage!: string;
    isActive: boolean = false;
    examTimer!: number;
    totalQuestionForTest!: number;
    passingMarks!: number;
    scoreGet!: number
    resultId!: number
    examName!: string
    scheduleTestDate: any;
    examStartTime: any
    timerExpired: boolean = true
    remainingTime: any
    intervalId: null | any
    isExamStarted: boolean = false
    isExamEnd: boolean = false
    extraTime!: number 
    hideLock!:Boolean
}
