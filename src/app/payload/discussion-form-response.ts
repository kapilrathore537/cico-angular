import { CommentResponse } from "./comment-response";
import { LikeResponse } from "./like-response";

export class DiscussionFormResponse {

    public id: number = 0;
    public createdDate: Date | undefined;
    public content: string = '';
    public studentId:number=0;
    public studentName: string = '';
    public studentProfilePic: string = '';
    public file:string=''
    public likes: LikeResponse[] = [];
    public comments: CommentResponse[] = [];
    public  isLike!:Boolean
    public audioFile!:string
}
