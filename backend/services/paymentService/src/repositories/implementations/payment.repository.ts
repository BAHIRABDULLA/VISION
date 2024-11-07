import { IPayment } from "../../models/payment.model";
import { IPayemntRepository } from "../interface/IPayment.repository";
import BaseRepository from "./base.repository";


export class PaymentRepository extends BaseRepository<IPayment> implements IPayemntRepository{

}