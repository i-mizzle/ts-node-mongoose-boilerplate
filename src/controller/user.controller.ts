import { Request, Response } from "express";
import { createUser } from '../service/user.service'
import { omit } from "lodash";
import * as response from "../responses/index";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body)
        // return res.send(omit(user.toJSON(), 'password'));
        return response.created(res, omit(user.toJSON(), 'password'))
    } catch (error) {
        log.error(error)
        // res.status(409).send(error.message)
        return response.conflict(res, error)
    }
}

export async function createSessionHandler(req: Request, res: Response) {
    try {
        
    } catch (error) {
        
    }
}