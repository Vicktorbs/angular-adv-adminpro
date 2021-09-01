import { Hospital } from "./hospital.model";

interface _MediclUser {
    _id: string,
    name: string, 
    img: string
}

export class Medic {

    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _MediclUser,
        public hospital?: Hospital
    ) {}

}