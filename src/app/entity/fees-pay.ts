import { Fees } from "./fees";

export class FeesPay {
	public payId: number = 0;
	public feesPay!: Fees
	public feesPayAmount!: number;
	public payDate!: Date;
	public recieptNo: string = '';
	public description: string = 's';
	public createDate: Date | undefined;
	public updatedDate: Date | undefined;
}
