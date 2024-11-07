
import { Container, injectable } from "inversify";

import { TYPES } from "../types";
import { AdminRepository } from "../repositories/implementation/admin.repository";
import { AdminService } from "../services/implementation/admin.service";
import { AdminController } from "../controllers/admin.controller";
import { IAdminRepository } from "../repositories/interface/IAdmin.repository";
import { IAdminService } from "../services/interface/IAdmin.service";

const container = new Container()

container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository).inSingletonScope()
container.bind<IAdminService>(TYPES.AdminService).to(AdminService).inSingletonScope()
container.bind<AdminController>(TYPES.AdminController).to(AdminController).inSingletonScope()

export { container }