import { Response } from "express";

module.exports = (res: Response, error: {message: string, stack?: string}) => {    return res.status(404).send({
        'status': false,
        'message': error.message
    });
};
