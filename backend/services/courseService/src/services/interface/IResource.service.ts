import { IResource } from "../../interfaces/IResource";




export interface IResourseService {
    createResourse(title:string,subtitle:string,type:'text'|'image'|'video',course:string,
        level:string,topic:string,content:any):Promise<IResource | undefined>
        // createResource(data:Partial<IResource>):Promise<IResource | undefined>
}