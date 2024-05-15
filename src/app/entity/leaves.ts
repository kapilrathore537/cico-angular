import { LeaveType } from "./leave-type";

export class Leaves {

	public leaveId: number = 0;
	public studentId: number = 0;
	public leaveType: LeaveType = new LeaveType;
	public leaveDate!: string;
	public leaveEndDate: string = '';
	public leaveReason: string = '';
	public leaveDayType: string = '';
	public halfDayType: string = '';
	public leaveStatus: number = 0;
	public retractLeave: number = 0;
	public leaveDuration: number = 0;


	public leaveDeclinedReason: string = '';

	public createdDate: Date | undefined;
}
