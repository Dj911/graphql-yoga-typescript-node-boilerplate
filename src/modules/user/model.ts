import {Schema, model, Document, ObjectId} from 'mongoose'

export interface IUser 
extends Document<ObjectId> 
{
    userName: string
    password: string
    name: string
    mobileNumber: number
    isActive: boolean
    lastLogin: Date
}

const UserSchema: Schema = new Schema({
    name: String,
    userName: String,
    password: String,
    mobileNumber: Number,
    isActive: Boolean,
    lastLogin: Date
},{
    timestamps: true
})

export const UserModel = model<IUser>('User', UserSchema)