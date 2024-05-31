import { FILE } from "dns"

export class QuizeQuestion {
  public questionId:number=0
  public option1:string=''
  public option2:string=''
  public option3:string=''
  public option4:string=''
  public correctOption:string =''
  public questionImage:string =''
  public questionContent:string =''
  public isSelected!:Boolean
}