import { Response } from "express";

module.exports = (res: Response, body: {}) => {
    return res.status(201).send({
        'status': true,
        'data': body
    });
};
