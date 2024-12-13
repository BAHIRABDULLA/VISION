

import mongoose, { Schema, Types } from 'mongoose'
import { IBooking } from '../interface/IBooking'


const bookingSchema = new Schema<IBooking>({
    mentorId: { type: Schema.Types.ObjectId, ref: 'Mentor', required: true },
    menteeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // planType: { type: String, enum: ['monthly', 'single'], required: true },
    // price: {type:Number,required:true},
    date: { type: Date, required: true, },
    time: { type: String, required: true, },
    sessions: { type: Number, default: 0 },
    status: { type: String, enum: ['pending',  'completed'], default: 'pending' },
    bookedAt: { type: Date, default: Date.now() },
    sessionCount:{type:Number},
    sessionDates: [{ type: Date }]
})

export default mongoose.model("Booking", bookingSchema)