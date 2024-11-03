
import { Container, injectable } from "inversify";

import { TYPES } from "../types";
import { AdminRepository } from "../repositories/implementation/admin.repository";
import { AdminService } from "../services/implementation/admin.service";
import { AdminController } from "../controllers/admin.controller";

const container = new Container()

container.bind<AdminRepository>(TYPES.AdminRepository).to(AdminRepository).inSingletonScope()
container.bind<AdminService>(TYPES.AdminService).to(AdminService).inSingletonScope()
container.bind<AdminController>(TYPES.AdminController).to(AdminController).inSingletonScope

export { container }