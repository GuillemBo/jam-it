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

