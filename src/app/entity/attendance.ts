import { Time } from "@angular/common"

export class Attendance {
    public attendanceId:number | undefined
    public studentId:number | undefined
    public checkInDate:any | null
    public checkInTime:any | null
    public checkInLat:string | undefined
    public checkInLong:string | undefined
    public checkInImage:string | undefined
    public checkOutDate:any | null
    public checkOutTime:any | null
    public checkOutLat:string | undefined
    public checkOutLong:string | undefined
    public checkOutImage:string | undefined
    public checkOutStatus:string | undefined
    public workingHour:any
    public createdDate:Date | undefined
    public updatedDate:Date | undefined
    workReport:string | undefined
	attachment:string | undefined
}
