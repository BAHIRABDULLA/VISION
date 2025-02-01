import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { HttpStatus } from "../../enums/http.status";
import { IResource } from "../../interfaces/IResource";
import { ICourseRepository } from "../../repositories/interface/ICourse.repository";
import { IResourceRepository } from "../../repositories/interface/IResource.repository";
import CustomError from "../../utils/custom.error";
import { IResourseService } from "../interface/IResource.service";

interface IFileContent {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
}

export type Content = string | IFileContent;
export class ResourceService implements IResourseService {
    private resourceRepository: IResourceRepository
    private courseRepository: ICourseRepository
    constructor(resourceRepository: IResourceRepository, courseRepository: ICourseRepository) {
        this.resourceRepository = resourceRepository
        this.courseRepository = courseRepository
    }

    async getResources(): Promise<Partial<IResource[]> | null> {
        try {
            const getResourceData = await this.resourceRepository.findAllWithPopulateCourse()
            if (!getResourceData || getResourceData.length <= 0) {
                throw new CustomError('Not founded resources', HttpStatus.NOTFOUND)
            }
            return getResourceData
        } catch (error) {
            throw error
        }
    }
    async createResourse(title: string , type: 'text' | 'image' | 'video', course: string,
        level: string, topic: string, content: string): Promise<IResource | undefined> {
        try {
            const courseDoc = await this.courseRepository.findByName(course)
            if (!courseDoc) {
                throw new CustomError(`Course ${course} not found `, HttpStatus.NOTFOUND)
            }
            const curriculum = courseDoc.curriculum.find(curr => curr.level === level)

            if (!curriculum) {
                throw new CustomError(`Level ${level} not found in course ${course}`, HttpStatus.NOTFOUND)
            }
            if (!curriculum.topics.includes(topic.trim())) {
                throw new CustomError(`Topic ${topic} not found in level ${level} of ${course}`, HttpStatus.NOTFOUND)
            }
            const courseId = courseDoc._id as Types.ObjectId
            const data = { title,  type, course: courseId, level, topic, content }
            const createResourse = await this.resourceRepository.create(data)

            return createResourse
        } catch (error) {
            throw error
        }
    }

    async updateResourceStatus(resourceId:string,status:'active' | 'block'){
        try {
            const response = await this.resourceRepository.update(resourceId,{status})
            if(!response?.isModified){
                return null
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getResourceById(id: string): Promise<Partial<IResource> | null> {
        try {
            const resourceData = await this.resourceRepository.findByIdWithCourse(id)
            if (!resourceData) {
                throw new CustomError('Resource not found', HttpStatus.NOTFOUND)
            }
            return resourceData
        } catch (error) {
            throw error
        }
    }

    async getResourcesByCourseId(courseId: string): Promise<Partial<IResource[]> | null> {
        try {
            const courseData = await this.courseRepository.findById(courseId)
            if (!courseData) {
                throw new CustomError('Course not found', HttpStatus.NOTFOUND)
            }
            const resourceData = await this.resourceRepository.findByCourseId(courseId)
            if (!resourceData || resourceData.length <= 0) {
                throw new CustomError('Resource not found', HttpStatus.NOTFOUND)
            }
            return resourceData
        } catch (error) {
            throw error
        }
    }
}