
import { Container, injectable } from "inversify";

import { TYPES } from "../types";

import { AdminRepository } from "../repositories/implementation/admin.repository";
import { AdminService } from "../services/implementation/admin.service";
import { AdminController } from "../controllers/implementation/admin.controller";
import { IAdminRepository } from "../repositories/interface/IAdmin.repository";
import { IAdminService } from "../services/interface/IAdmin.service";
import { IAdminController } from "../controllers/interface/IAdmin.controller";

import { CategoryController } from "../controllers/implementation/category.controller";
import { CategoryService } from "../services/implementation/category.service";
import { CategoryRepository } from "../repositories/implementation/category.repository";
import { ICategoryRepository } from "../repositories/interface/ICategory.repository";
import { ICategoryService } from "../services/interface/ICategory.service";
import { ICategoryController } from "../controllers/interface/ICategory.controller";


import BaseRepository from "../repositories/implementation/base.repository";
import { IBaseRepository } from "../repositories/interface/IBase.repository";
import Category from "../models/category.model";
import { Model } from "mongoose";
import { ICategory } from "../interface/ICategory";
const container = new Container()

container.bind<Model<ICategory>>(TYPES.Category).toConstantValue(Category)
container.bind<IBaseRepository<ICategory>>(TYPES.BaseRepository).to(BaseRepository).inSingletonScope()
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository).inSingletonScope()
container.bind<IAdminService>(TYPES.AdminService).to(AdminService).inSingletonScope()
container.bind<IAdminController>(TYPES.AdminController).to(AdminController).inSingletonScope()
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController)

export { container }