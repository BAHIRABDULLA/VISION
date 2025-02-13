import { ParamsData } from "../../controllers/implementation/course.controller";
import { IResource } from "../../interfaces/IResource";
import { Content } from "../implementation/resource.service";




export interface IResourseService {
    getResources(params:ParamsData): Promise<any>
    createResourse(title: string, type: 'text' | 'image' | 'video', course: string,
        level: string, topic: string, content: string): Promise<IResource | undefined>
    // createResource(data:Partial<IResource>):Promise<IResource | undefined>
    editResource(id: string, data: Partial<IResource>): Promise<Partial<IResource> | null>
    updateResourceStatus(resourceId: string, status: 'active' | 'block'): Promise<IResource | null>
    getResourceById(id: string): Promise<Partial<IResource> | null>
    getResourcesByCourseId(courseId: string): Promise<Partial<IResource[]> | null>
}