export class CommentResponseForm {
    public type: string = '';
    public id: number = 0;
    public createdDate:any;
    public content: string = '';
    public studentName: string = '';
    public studentProfilePic: string = '';
    public discussionFormId:number=0;
    
    public constructor (discussionFormId: number, studentProfilePic: string, studentName: string, content: string, createdDate: any, id: number, type: string) {
        this.type = type
        this.id = id
        this.createdDate = createdDate
        this.content = content
        this.studentName = studentName
        this.studentProfilePic = studentProfilePic
        this.discussionFormId = discussionFormId
    }
}
