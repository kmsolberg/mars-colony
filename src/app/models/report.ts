export class Report {
  date: string;
  colonist_id: string;
  atype: string;
  action: string;
  constructor(atype, date, action, colonistID) {
    this.atype = atype;
    this.date = date;
    this.action = action;
    this.colonist_id = colonistID;
  }
}
