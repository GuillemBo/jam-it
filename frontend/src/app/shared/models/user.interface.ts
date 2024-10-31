export interface User {
    id_user: number; // Identificador único del usuario
    name: string; // Nombre del usuario
    email: string; // Correo electrónico del usuario
    password: string; // Contraseña del usuario (debería manejarse de manera segura)
    role: 'musician' | 'venue'; // Rol del usuario, puede ser 'musician' o 'venue'
    created_at: Date; // Fecha de creación del usuario
    // photo?: string; // Foto del usuario (opcional)
}
