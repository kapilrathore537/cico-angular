
import { CommentResponse } from "./comment-response";
import { LikeResponse } from "./like-response";

export class Discussionformsocketresponse {
    public type: string = '';
    public id: number = 0;
    public createdDate: Date | undefined;
    public content: string = '';
    public studentName: string = '';
    public studentProfilePic: string = '';
    public discussionFormId:number=0;

}