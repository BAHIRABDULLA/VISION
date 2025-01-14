import { IResource } from "../../interfaces/IResource"
import { Resource } from "../../models/resource.model";
import { IResourceRepository } from "../interface/IResource.repository"
import { BaseRepository } from "./base.repository"

class ResourceRepository extends BaseRepository<IResource> implements IResourceRepository {
    async findAllWithPopulateCourse(): Promise<Partial<IResource[]> | null> {
        try {
            return await Resource.find().populate('course').exec()
        } catch (error) {
            console.error('Error founded in get resource in service layer', error);
            throw error      
        }
    }
    async findByIdWithCourse(id: string): Promise<Partial<IResource> | null> {
        try {
            return await Resource.findById(id).populate('course')
        } catch (error) {
            console.error('Error founded in get resource in service layer', error);
            throw error
        }
    }

    async findByCourseId(courseId: string): Promise<Partial<IResource[]> | null> {
        try {
            return await Resource.find({ course: courseId }).populate('course')
        } catch (error) {
            console.error('Error founded in get resource in service layer', error);
            throw error
        }   
    }
}
export default ResourceRepository