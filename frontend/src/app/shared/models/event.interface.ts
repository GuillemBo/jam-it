
export interface Event {
    id_event: number; // Identificador único del evento
    id_venue: number; // Identificador del venue asociado
    id_application?: number | null; // Identificador de la aplicación asociada (opcional)
    f_ini: Date; // Fecha de inicio del evento
    f_end: Date; // Fecha de fin del evento
    name?: string; // Nombre del evento (opcional)
    description?: string; // Descripción del evento (opcional)
    payment?: number | null; // Monto del pago (opcional)
    event_type: string; // Tipo de evento
    date_end_bid: Date; // Fecha de finalización de la puja
    price: number; // Precio del evento
}


export interface EventResponse {
    code: number;
    message: string;
    data: Event[];
}
