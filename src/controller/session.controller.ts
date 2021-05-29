import { Request, Response } from 'express';
import { get } from 'lodash'
import log from "../logger";
import { validatePassword } from '../service/user.service'
import { createAccessToken, createSession, findSessions, updateSession } from "../service/session.service";
import config from 'config';
import { sign } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("invalid username or password");
    }
    const session = await createSession(user._id, req.get('user-agent') || '');
    
    const accessToken = createAccessToken({
        user,
        session
    });

    const refreshToken = sign(session, config.get('privateKey'), {
        expiresIn: config.get('refreshTokenTtl'), // 1year
    });

    return res.send({ accessToken, refreshToken })
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
    const sessionId = get(req, 'user.session');
    await updateSession({ _id:sessionId }, { valid: false });
    return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = get(req, 'user._id');
    const sessions = await findSessions({ user: userId, valid: true })
    log.info(userId, sessions)
    return res.send(sessions)

}