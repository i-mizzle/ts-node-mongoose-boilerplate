'use script';
import { Response } from "express";

module.exports = (res: Response, info: {message: string}) => {
    return res.status(401).send({
        'status': false,
        'message': info.message
    });
};
