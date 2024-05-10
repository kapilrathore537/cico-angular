export class TodayLeavesRequest {
    public studentId: number = 0;
    public fullName: string = '';
    public applyForCourse: string = '';
    public profilePic: string = '';
    public leaveReason: string = '';
    public leaveDate: Date | undefined;
    public leaveEndDate: Date | undefined;
    public leaveDuration: number = 0;
    public leaveTypeId: number = 0;
    public leaveId:number=0;
    public leaveTypeName:string=''
}
