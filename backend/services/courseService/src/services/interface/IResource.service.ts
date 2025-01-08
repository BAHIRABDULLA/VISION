import { IResource } from "../../interfaces/IResource";




export interface IResourseService {
    getResources():Promise<Partial<IResource[]> | null>
    createResourse(title:string,subtitle:string,type:'text'|'image'|'video',course:string,
        level:string,topic:string,content:any):Promise<IResource | undefined>
        // createResource(data:Partial<IResource>):Promise<IResource | undefined>

    getResourceById(id:string):Promise<Partial<IResource> | null>
}