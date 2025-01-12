import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { HttpStatus } from "../../enums/http.status";
import { IResource } from "../../interfaces/IResource";
import { ICourseRepository } from "../../repositories/interface/ICourse.repository";
import { IResourceRepository } from "../../repositories/interface/IResource.repository";
import CustomError from "../../utils/custom.error";
import { uploadFile } from "../../utils/file.upload";
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
            console.log(getResourceData, 'getResource data in resrource service layer')
            if (!getResourceData || getResourceData.length <= 0) {
                throw new CustomError('Not founded resources', HttpStatus.NOTFOUND)
            }
            console.log(getResourceData, 'get resoucrcde');

            return getResourceData
        } catch (error) {
            console.error('Error founded in get resource in service layer', error);
            throw error
        }
    }
    async createResourse(title: string, subtitle: string, type: 'text' | 'image' | 'video', course: string,
        level: string, topic: string, content: any): Promise<IResource | undefined> {
        try {
            const courseDoc = await this.courseRepository.findByName(course)
            console.log('----', courseDoc, 'find course create resource');
            if (!courseDoc) {
                throw new CustomError(`Course ${course} not found `, HttpStatus.NOTFOUND)
            }
            const curriculum = courseDoc.curriculum.find(curr => curr.level === level)
            console.log(curriculum, 'curriculum  in create resource');

            if (!curriculum) {
                throw new CustomError(`Level ${level} not found in course ${course}`, HttpStatus.NOTFOUND)
            }
            if (!curriculum.topics.includes(topic.trim())) {
                throw new CustomError(`Topic ${topic} not found in level ${level} of ${course}`, HttpStatus.NOTFOUND)
            }
            const courseId = courseDoc._id as Types.ObjectId
            const data = { title, subTitle: subtitle, type, course: courseId, level, topic, content }
            if (type !== 'text') {
                let s3FileUrl = ''
                if (typeof content!=='string') {
                    const fileContent = content.buffer;
                    const fileType = content.mimetype;
                    const fileName = `uploads/${Date.now()}_${content.originalname}`;
                    console.log(fileName, 'fileName');
                    const result = await uploadFile(fileContent, fileName, fileType);

                    if (!result) {
                        throw new Error('File upload failed');
                    }
                    s3FileUrl = result.Location
                    console.log('Uploaded file URL:', s3FileUrl);

                    data.content = s3FileUrl
                }
            }
            const createResourse = await this.resourceRepository.create(data)

            return createResourse
        } catch (error) {
            console.error('Error founded in create course', error);
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
            console.error('Error founded in get resource by id', error);
            throw error
        }
    }
}