class CustomError extends Error {
    public statusCode:number;
    constructor(message:string,statusCode:number){
        super(message);
        console.log(message,'message',statusCode,'status code');
        
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.constructor)
    }
}

export default CustomError