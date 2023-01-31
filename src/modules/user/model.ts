import {Schema, model, Document, ObjectId} from 'mongoose'

export interface IUser 
extends Document<ObjectId> 
{
    id: string
    userName: string
    password: string
    name: string
    mobileNumber: number
    isActive: boolean
    lastLogin: Date
}

const UserSchema: Schema = new Schema({
    id: String,
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