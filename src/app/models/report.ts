export class Report {
  atype: string;
  date: string;
  action: string;
  colonist_id: string;
  constructor(atype, date, action, colonistID){
    this.atype = atype;
    this.date = date;
    this.action = action;
    this.colonist_id = colonistID;
  }
}
