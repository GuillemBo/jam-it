export interface Application {
    id_application: number; // Identificador único de la aplicación
    id_event?: number | null; // Identificador del evento asociado (opcional)
    id_group?: number | null; // Identificador del grupo asociado (opcional)
    titulodeloquehago: string; // Título de la aplicación
    descriptiondeloquehago: string; // Descripción de la aplicación
    status: 'pending' | 'accepted' | 'rejected'; // Estado de la aplicación
}
