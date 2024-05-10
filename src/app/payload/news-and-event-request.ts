export class NewsAndEventRequest {
    public  id:number=0;
	public  shortDescription:string='';
	public  briefDescription:string='';
	public  image:string='';
	public  title:string='';
	public  isDeleted:boolean | undefined;
	public  createdDate:Date | undefined;
	public  updatedDate:Date | undefined;
	public  isActive:boolean | undefined;
	public  dayAgo:number=0;
    public fileName:any
	public file:String='';
}
