const Boom = require('boom');
const user = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MESSAGES } = require('../constants/appConstants');

module.exports = {
    auth: async (req, res, next) => {
        const { Username, Email, Password } = req.body;
        if (!Username || !Email || !Password) {
            return next(Boom.badRequest(MESSAGES.INVALID_DATA));
        }
        const isEmailExist = await user.findOne({Email});
        if (isEmailExist) {
            return next(Boom.badRequest(MESSAGES.REGISTRATION_DUPLICATE_EMAIL));
        }
        const userObj = {
            Username,
            Email,
            Password: await bcrypt.hash(Password, 10),
        }
        user.create(userObj);
        return res.status(200).json({
            error: false,
            message: MESSAGES.REGISTRATION_SUCCESS
        });
    },
    Login: async (req, res, next) => {
        try {
            const { Email, Password } = req.body;
            if (!Email || !Password) {
                return next(Boom.badRequest(MESSAGES.INVALID_CREDENTIALS));
            }
            const userObj = await user.findOne({Email});
            if (!userObj) {
                return next(Boom.badRequest(MESSAGES.RECORD_NOT_FOUND));
            }
            const isValidUser = await bcrypt.compare(Password, userObj.Password)
            if (!isValidUser) {
                return res.status(404).json({
                    error: true,
                    message: MESSAGES.INVALID_CREDENTIALS,
                });
            }
            const payload = {
                userID: userObj.UserID,
            };
            const token = jwt.sign(payload, 'secret', { expiresIn: '24h' });

            return res.status(200).json({
                token,
                userID: userObj._id,
                error: false,
                message: MESSAGES.USER_LOGIN_SUCCESSFULLY,
            });
        } catch (error) {
            console.log('Error : ', error);
            return next(Boom.notAcceptable(MESSAGES.SOMETHING_WENT_WRONG, error));
        }
    },
}