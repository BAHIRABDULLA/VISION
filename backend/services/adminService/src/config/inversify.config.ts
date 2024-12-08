
import { Container, injectable } from "inversify";

import { TYPES } from "../types";
import { AdminRepository } from "../repositories/implementation/admin.repository";
import { AdminService } from "../services/implementation/admin.service";
import { AdminController } from "../controllers/admin.controller";
import { IAdminRepository } from "../repositories/interface/IAdmin.repository";
import { IAdminService } from "../services/interface/IAdmin.service";

import { CategoryRepository } from "../repositories/implementation/category.repository";
import { ICategoryRepository } from "../repositories/interface/ICategory.repository";


import BaseRepository from "../repositories/implementation/base.repository";
import { IBaseRepository } from "../repositories/interface/IBase.repository";
import Category, { ICategory } from "../models/category.model";
import { Model } from "mongoose";
const container = new Container()

container.bind<Model<ICategory>>(TYPES.Category).toConstantValue(Category)
container.bind<IBaseRepository<ICategory>>(TYPES.BaseRepository).to(BaseRepository).inSingletonScope()
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository).inSingletonScope()
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container.bind<IAdminService>(TYPES.AdminService).to(AdminService).inSingletonScope()
container.bind<AdminController>(TYPES.AdminController).to(AdminController).inSingletonScope()

export { container }