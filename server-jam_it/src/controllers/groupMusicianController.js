import GroupMusician from '../models/groupMusicianModel.js';
import Group from '../models/groupModel.js';
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';

export const addMusicianToGroup = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_group, id_user } = req.body;

        const group = await Group.findByPk(id_group);
        const user = await User.findByPk(id_user);

        if (!group || !user) {
            return res.status(404).json({ message: 'Grupo o usuario no encontrado' });
        }

        await GroupMusician.create({
            id_group,
            id_user,
        });

        res.status(200).json({ message: 'Músico añadido al grupo con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir músico al grupo', error });
    }
};

export const getGroupsByUserId = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_user } = req.params;

        const groups = await User.findAll({
            where: { id_user },
            include: {
                model: Group,
                through: { attributes: [] }  // Excluir atributos de la tabla intermedia
            }
        });

        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los grupos', error });
    }
};


export const deleteMusicianFromGroup = async (req, res) => {
    try {
        const errors = validationResult(req);

        // Si hay errores de validación, responde con un estado 400 Bad Request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_group, id_user } = req.params;

        const group = await Group.findByPk(id_group);
        const user = await User.findByPk(id_user);

        if (!group || !user) {
            return res.status(404).json({ message: 'Grupo o usuario no encontrado' });
        }

        const removed = await GroupMusician.destroy({
            where: {
                id_group,
                id_user,
            },
        });

        if (removed) {
            return res.status(200).json({ message: 'Músico eliminado del grupo con éxito' });
        } else {
            return res.status(404).json({ message: 'El músico no estaba en el grupo' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar al músico del grupo', error });
    }

};


