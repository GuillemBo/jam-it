
export interface Venue {
    id_venue: number; // Identificador único del lugar
    id_user: number; // Identificador del usuario que posee el lugar
    title: string; // Título o nombre del lugar (requerido)
    address: string; // Dirección del lugar (requerido)
    capacity: number; // Capacidad máxima del lugar (requerido)
    created_at: Date; // Fecha de creación del lugar (automáticamente gestionada)
    updated_at: Date; // Fecha de la última actualización del lugar (automáticamente gestionada)
}

export interface VenueResponse {
    code: number;
    message: string;
    data: Venue[];
}
