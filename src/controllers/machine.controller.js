import machine from "../Models/machine.model.js";

export async function fetchallmachines(req,res) {
    try {
        let machines = await machine.find({});
        res.status(200).json({success:true,data : machines})
    }catch(error) {
        res.status(500).json({success : false,message :`server error : ${error.message}`});
    }
};

export async function machinecreate(req,res) {
    try {
        let createmachine = await machine(req.body);
        res.status(201).json({sucess : true , dara : createmachine});
    }catch(error){
        res.status(400).json({success : false , message : error.message})
    }
}

export async function getMachineSignalements(req, res) {
    try {
        const { id } = req.params;
        
        const machineExists = await machine.findById(id);
        if (!machineExists) {
            return res.status(404).json({ success: false, message: 'Machine inexistante.' });
        }

        const signalements = await Signalement.find({ machine: id });
        res.status(200).json({ 
            success: true, 
            machineName: machineExists.name,
            count: signalements.length, 
            data: signalements 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}