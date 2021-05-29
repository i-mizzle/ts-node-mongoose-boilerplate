import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import Post, { PostDocument } from '../model/post.model';

export async function createPost (input: DocumentDefinition<PostDocument>) {
    return Post.create(input)
}

export async function findPost(
    query: FilterQuery<PostDocument>,
    options: QueryOptions = { lean: true }
) {
    return Post.findOne(query, {}, options)
}

export async function findAndUpdate(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options: QueryOptions
) {
    return Post.findOneAndUpdate(query, update, options)
}

export async function deletePost(
    query: FilterQuery<PostDocument>
) {
    return Post.deleteOne(query)
}