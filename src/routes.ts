import { 
    Express,
    Request,
    Response 
} from 'express';
import { createUserHandler } from './controller/user.controller';
import { 
    createUserSessionHandler,
    invalidateUserSessionHandler,
    getUserSessionsHandler
} from './controller/session.controller';
import { 
    createUserSchema,
    createUserSessionSchema
} from './schema/user.schema'
import {
    requiresUser,
    validateRequest
} from './middleware'
import { 
    createPostSchema,
    updatePostSchema,
    deletePostSchema
} from "./schema/post.schema";
import { 
    createPostHandler,
    updatePostHandler ,
    getPostHandler,
    deleteHandler
} from "./controller/post.controller";

export default function(app: Express) {
    app.get('/ping', (req: Request, res: Response) => res.sendStatus(200))
    /**
     * USER OPERATIONS
     */
    
    // Register
    app.post('/api/users', validateRequest(createUserSchema), createUserHandler)
    // Login
    app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler)
    // Get user sessions
    app.get('/api/sessions', requiresUser, getUserSessionsHandler)
    // logout
    app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler)

    /**
     * POST OPERATIONS
     */
    // Create
    app.post('/api/posts', [requiresUser, validateRequest(createPostSchema)], createPostHandler)
    // update
    app.put('/api/posts/:postId', [requiresUser, validateRequest(updatePostSchema)], updatePostHandler)
    // get a post
    app.get('/api/posts/:postId', getPostHandler)
    // delete
    app.delete('/api/posts/:postId', [requiresUser, validateRequest(deletePostSchema)], deleteHandler)


}


