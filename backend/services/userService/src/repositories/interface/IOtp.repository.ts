import IOtp from "../../interfaces/IOtp";

interface IOtpRepository  {
    findOtpByEmail(email:string):Promise<IOtp[] | null>

}
export default IOtpRepository