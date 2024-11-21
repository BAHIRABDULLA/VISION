import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ISlot extends Document {
    mentorId: Types.ObjectId;
    time: string;
    availableDays: string[];

}

const slotSchema = new Schema<ISlot>({
    mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: String, required: true },
    availableDays: { type: [String], required: true },
})

export default mongoose.model<ISlot>('Slot', slotSchema)