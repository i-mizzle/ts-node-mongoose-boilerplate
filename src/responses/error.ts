'use script';
import { Response } from "express";

module.exports = (res: Response, error: {name?: string, message: string, stack: string}) => {
    return res.status(500).send({
        'status': false,
        'name': error.name,
        'message': error.message,
        'stack': error.stack
    });
};
