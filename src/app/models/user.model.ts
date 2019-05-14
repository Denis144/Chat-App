export class User {
  uid?: any;
  userName: string;
  isCurrent: boolean;

  constructor(id: any, userName: string, isCurrent: boolean) {
    this.uid = id;
    this.userName = userName;
    this.isCurrent = isCurrent;
  }
}
