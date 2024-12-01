import { IResourseService } from "../services/interface/IResource.service";
import { Request,Response } from "express";
import { successResponse } from "../utils/response.helper";
import { HttpStatus } from "../enums/http.status";


export class ResourseController {
    private resourceService: IResourseService;
    
    constructor(resourceService: IResourseService) {
        this.resourceService = resourceService
    }

    async createResourse(req:Request,res:Response){
        try {
            let {title,subtitle,type,course,level,topic,content} = req.body
            const data = req.body
            console.log(title,'title',subtitle,'subtitle',type,'type',course,'course');
            console.log(level,'level',topic,'topic',content,'content');
            
            if(type!=='text'){
                console.log(req.file,'req.file - - - - - ');
                console.log(req.file?.filename,'req.files ++++++');
                content = req.file
                console.log(content,'content in if condition');
                
            }
            
            const response = await this.resourceService.createResourse(title,subtitle,type,course,level,topic,content)
            console.log(response,'response ');
            
            return successResponse(res,HttpStatus.CREATED,"Resource created")
           
        } catch (error) {
            console.error('Error founded in create course',error);
        }
    }




}