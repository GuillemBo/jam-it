export interface Group {
    id_group: number; // Identificador único del grupo
    musicians?: string; // Lista de músicos, puede ser null
    description?: string; // Descripción del grupo, puede ser null
    genre?: string; // Género musical del grupo, puede ser null
    id_user: number; // Identificador del usuario asociado al grupo
    name: string; // Nombre del grupo
}

export interface GroupResponse {
    code: number;
    message: string;
    data: Group[];
}