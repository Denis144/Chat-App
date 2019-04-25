export class User {
  uid?: any;
  userName?: string;

  constructor(id: any, userName: string) {
    this.uid = id;
    this.userName = userName;
  }
}