const Boom = require('boom');
const user = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MESSAGES } = require('../constants/appConstants');
const { generateOTP } = require('../lib/utils/utils');
const mailer = require('../lib/mailer')

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
    forgetPasswordEmail: async (req, res, next) => {
        try {
            const { Email } = req.body;
            const userObj = await user.findOne({ Email: Email });
            if (!userObj) {
                return next(Boom.badRequest(MESSAGES.RECORD_NOT_FOUND));
            }
            const otp = generateOTP();
            await user.updateOne({ Email }, { $set: { Otp: otp } });
            await mailer.forgetPasswordEmail(userObj.Email, userObj, otp);
            return res.status(202).json({
                error: false,
                message: MESSAGES.PASSWORD_RESET_SENT,
                UserID: userObj._id,
            });
        } catch (error) {
            console.log('Error : ', error);
            return next(Boom.notAcceptable(MESSAGES.SOMETHING_WENT_WRONG, error));
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const { UserID, Password, Otp } = req.body; 
            const userObj = await user.findById(UserID);
            if (Otp != userObj.Otp) return next(Boom.badRequest(MESSAGES.INVALID_OTP));
            const newPassword = await bcrypt.hash(Password, 10);
            const updateuser = await user.updateOne({ _id:UserID }, {
                $set: { Password: newPassword, Otp: null }
            });
            if (!updateuser) {
                return next(Boom.badRequest(MESSAGES.FAILED_TO_UPDATE));
            }
            return res.status(202).json({
                error: false,
                message: MESSAGES.PASSWORD_RESET_SUCCESS,
            });
        } catch (error) {
            console.log('Error : ', error);
            return next(Boom.notAcceptable(MESSAGES.SOMETHING_WENT_WRONG, error));
        }
    },
}