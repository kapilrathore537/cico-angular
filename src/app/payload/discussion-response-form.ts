import { CommentResponse } from "./comment-response";
import { LikeResponse } from "./like-response";

export class DiscussionResponseForm {
    public type: string = ''
    public id: number = 0;
    public createdDate: Date | undefined;
    public content: string = '';
    public studentId: number = 0;
    public studentName: string = '';
    public studentProfilePic: string = '';
    public file: string = ''
    public courseName: string = ''
    public likes: LikeResponse[] = [];
    public comments: CommentResponse[] = [];
    public audioFile!:string

    public constructor(studentProfilePic: string, studentName: string, content: string, createdDate: any, id: number, type: string, file: string, studentId: number,audioFile:string) {
        this.type = type
        this.id = id
        this.createdDate = createdDate
        this.content = content
        this.studentName = studentName
        this.studentProfilePic = studentProfilePic
        this.likes = []
        this.comments = []
        this.file = file
        this.studentId = studentId
        this.audioFile = audioFile

    }
}
