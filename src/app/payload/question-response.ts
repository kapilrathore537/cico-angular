export class QuestionResponse {
     questionId:number=0
	 questionContent:string='';
	 option1:string='';
	 option2:string='';
	 option3:string='';
	 option4:string='';
	 correctOption:string='';
	 selectedOption:string='';// select by student 
	 questionImage:string='';
	 public isSelected!:Boolean
}
