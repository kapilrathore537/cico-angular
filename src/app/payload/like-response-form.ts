import { is } from "date-fns/locale";
import { LikeResponse } from "./like-response";

export class LikeResponseForm {
  public type: string = '';
  public discussionFormId: number = 0;
  public likes: LikeResponse[] = []
  public isLike!: boolean
  public studentId!: number

  public constructor(discussionFormId: number, type: string, likes: LikeResponse[], isLike: boolean, studentId: number) {
    this.type = type
    this.discussionFormId = discussionFormId
    this.likes = likes
    this.isLike = isLike
    this.studentId = studentId

  }
}
