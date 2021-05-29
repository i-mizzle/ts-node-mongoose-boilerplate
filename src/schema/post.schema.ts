import { object, string, ref } from "yup";

const payload = {
    body: object({
        title: string().required('title is required'),
        body: string().required('body is required').min(120, 'body is too short - should be 120 chars minimum.')
    })
}

const params = {
    params: object({
        postId: string().required('post id is required')
    })
}

export const createPostSchema = object({
   ...payload
});

export const updatePostSchema = object({
    ...params,
    ...payload
})
    
export const deletePostSchema = object({
    ...params
})