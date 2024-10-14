import { Group } from "./group.interface";
import { Space } from "./space.interface";

export interface Event {
    title: string;
    description: string;
    musicStyle: string;
    space: Space;
    group?: Group;
    date: Date;

}


export interface ApplyEvent {
    name: string;
    description: string;
    payment: number;
    event_type: string;
    f_ini: Date;
    f_end: Date;
    date_end_bid: Date; //fecha limite para aplicar
    price: number; //precio del evento (entrada)
}