import ICourse from "../../interfaces/ICourse";
import { IPayment } from "../../models/payment.model";

export interface ICourseService {

    createCourse(data: object): Promise<ICourse | null>
    getAllCourses(): Promise<{success:boolean,message:string,data?:ICourse[]}>
    getCourseById(id:string):Promise<{success:boolean,message:string,data?:object}>
    editCourseData(data:object,id:string,imageFile?:Express.Multer.File):Promise<ICourse | null>
    courseStatusUpdate(id:string,status:'active'|'block'):Promise<ICourse | null>
    getPurchasedCourses(userId:string):Promise<IPayment[] | null>
}