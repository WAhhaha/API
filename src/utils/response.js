class Response {
  constructor(reqId ,statusCode, httpStatus, message, data){
    this.timeStamp = new Date().toLocaleString();
    this.reqId = reqId;
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}

export default Response;
