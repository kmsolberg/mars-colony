export class Report {
  date: string;
  colonist_id: string;
  atype: string;
  action: string;
  constructor(atype, date, action, colonistID){
    this.date = date;
    this.colonist_id = colonistID;    
    this.action = action;
    this.atype = atype;
  }
}
