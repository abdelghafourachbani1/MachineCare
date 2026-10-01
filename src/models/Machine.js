import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: [true, 'Machine reference is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Machine name is required'],
      trim: true,
    },
    workshop: {
      type: String,
      required: [true, 'Workshop is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['available', 'in_maintenance', 'out_of_service'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Machine', machineSchema);