import ICourse from "../../interfaces/ICourse";


export interface ICourseService {

    createCourse(data: object): Promise<{success:boolean,message:string}>
    getAllCourses(): Promise<{success:boolean,message:string,data?:any}>
}