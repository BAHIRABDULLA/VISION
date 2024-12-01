import { IResource } from "../../interfaces/IResource"
import { IResourceRepository } from "../interface/IResource.repository"
import { BaseRepository } from "./base.repository"

class ResourceRepository extends BaseRepository<IResource> implements IResourceRepository {

}
export default ResourceRepository