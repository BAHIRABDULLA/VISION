import ICourse from "../../interfaces/ICourse";

export interface ICourseService {

    createCourse(data: object,imageFile?: Express.Multer.File): Promise<ICourse | null>
    getAllCourses(): Promise<{success:boolean,message:string,data?:any}>
    getCourseById(id:string):Promise<{success:boolean,message:string,data?:object}>
    editCourseData(data:object,id:string,imageFile?:Express.Multer.File):Promise<ICourse | null>
    courseStatusUpdate(id:string,status:'active'|'block'):Promise<ICourse | null>
}