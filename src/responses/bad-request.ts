import { Response } from "express";

module.exports = (res: Response, error: {message: string, stack: string}) => {
    return res.status(400).send({
        'status': false,
        'message': error.message,
        'stack': error.stack
    });
};
