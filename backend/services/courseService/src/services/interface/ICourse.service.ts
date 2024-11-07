import ICourse from "../../interfaces/ICourse";

export interface ICourseService {

    createCourse(data: object,imageFile?: Express.Multer.File): Promise<ICourse | null>
    getAllCourses(): Promise<{success:boolean,message:string,data?:any}>
    getCourseById(id:string):Promise<{success:boolean,message:string,data?:object}>
}