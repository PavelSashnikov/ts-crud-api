export class ResponseErr extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.custom = true;
  }
  status: number;
  custom: boolean;
}
