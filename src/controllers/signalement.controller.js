import machine from "../Models/machine.model";
import signalement from "../Models/signalement.machine.js";

export async function addasignalement(params) {
    try{
        let machineId,description = req.body;
        let machinebyid = machine.findById(machineId)
        if(!machinebyid) {
            res.status(404).json({success : false,message : 'machine not exist'});
        }
        let newsignalemnt = await signalement.create({
            machine:machineId,description,user : req.user ? req.user_id;
        })
        res.status(201).json({success : true,data:newsignalemnt});
    }catch(error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export async function getSignalements(req, res) {
    try {
        let { machine, status } = req.query;
        let filter = {};
        if (machine) filter.machine = machine;
        if (status) {
            if (!['ouvert', 'en cours', 'résolu'].includes(status)) {
                return res.status(400).json({ success: false, message: 'Statut inconnu.' });
            }
            filter.status = status;
        }
        const signalements = await signalement.find(filter).populate('machine', 'reference name atelier status');
        res.status(200).json({ success: true, data: signalements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateSignalement(req, res) {
    try {
        const { id } = req.params;
        const { status, description, resolutionNote } = req.body;
        const signalement = await signalement.findById(id);
        if (!signalement) {
            return res.status(404).json({ success: false, message: 'Signalement introuvable.' });
        }
        if (status === 'résolu') {
            const finalNote = resolutionNote !== undefined ? resolutionNote : signalement.resolutionNote;
            if (!finalNote || finalNote.trim() === '') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Exiger une note de résolution avant de marquer un signalement comme résolu.' 
                });
            }
            signalement.resolutionNote = finalNote;
            signalement.resolutionDate = new Date();
        }

        if (status) {
            if (!['ouvert', 'en cours', 'résolu'].includes(status)) {
                return res.status(400).json({ success: false, message: 'Statut inconnu.' });
            }
            signalement.status = status;
        }
        if (description !== undefined) {
            if (!description.trim()) {
                return res.status(400).json({ success: false, message: 'La description ne peut pas être vide.' });
            }
            signalement.description = description;
        }

        await signalement.save();
        res.status(200).json({ success: true, data: signalement });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}