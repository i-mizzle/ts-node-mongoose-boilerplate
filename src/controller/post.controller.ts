import { Request, Response } from "express";
import { get } from "lodash";
import { createPost, findPost, findAndUpdate, deletePost } from "../service/post.service";
import * as response from '../responses'

export async function createPostHandler (req: Request, res: Response) {
    const userId = get(req, 'user._id')
    const body = req.body

    const post = await createPost({ ...body, user: userId })
    // return res.send(post)
    return response.created(res, post)
}

export async function updatePostHandler (req: Request, res: Response) {
    const postId = get(req, 'params.postId');
    const userId = get(req, 'user._id');
    const update = req.body;

    const post = await findPost({ postId });
    if (!post) {
        return response.notFound(res, { message: `Post with id: ${postId} was not found` })
    }
    if (String(post.user) !== userId) {
        return response.conflict(res, { message: `Post with id: ${postId} was not created by you` })
    }
    const updatedPost = await findAndUpdate({ postId }, update, { new: true })
    return response.ok(res, updatedPost)
}

export async function getPostHandler (req: Request, res: Response) {
    const postId = get(req, 'params.postId');
    const post = await findPost({ postId });
    if(!post) {
        return response.notFound(res, { message: `Post with id: ${postId} was not found` })
    } 
    return response.ok(res, post)
}

export async function deleteHandler (req: Request, res: Response) {
    const postId = get(req, 'params.postId');
    const userId = get(req, 'user._id');

    const post = await findPost({ postId });
    if (!post) {
        return response.notFound(res, { message: `Post with id: ${postId} was not found` })
    }

    if (String(post.user) !== userId) {
        return response.conflict(res, { message: `Post with id: ${postId} was not created by you` })
    }

    await deletePost({ postId });
    return response.ok(res, {message: 'post deleted successfully'});
}