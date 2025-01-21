import { Document, Types } from 'mongoose'


export interface IBooking extends Document{
    mentorId: Types.ObjectId;
    menteeId: Types.ObjectId;
    date: Date
    time: string
    // planType:'monthly' | 'single';
    // price:number;
    sessions: number;
    status: 'pending' | 'completed';
    bookedAt?: Date;
    sessionCount:number
    sessionDates?: Date[],
} 