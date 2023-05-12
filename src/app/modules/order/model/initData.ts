import { Shipment } from "./Shipment";
import { Payment } from "./payment";

export interface InitData{
    shipments: Array<Shipment>
    payments: Array<Payment>
}