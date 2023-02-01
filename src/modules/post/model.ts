import { Schema, model, Document, ObjectId } from 'mongoose'

export interface IPost
    extends Document<ObjectId> {
    title: string
    ownerId: ObjectId
    likes: number
    currentOwner: ObjectId
    parentPost: ObjectId
    createdAt: Date
}

const PostSchema: Schema = new Schema({
    title: String,
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number,
        default: 0
    },
    currentOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parentPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdAt: Date
}, {
    timestamps: true
})

export const PostModel = model<IPost>('Post', PostSchema)