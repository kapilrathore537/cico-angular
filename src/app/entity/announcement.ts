import { Course } from "./course";
import { MessageSeenBy } from "./message-seen-by";

export class Announcement {

    public announcementId: number = 0;
    public title: string = '';
    public message: string = '';
    public courseName: string[] = [];
    public seenBy: MessageSeenBy = new MessageSeenBy;
    public date: any;

    constructor(title: string, message: string, date: any) {
        this.title = title
        this.message = message
        this.date = date
    }
}
