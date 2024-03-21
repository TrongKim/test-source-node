const User = require('../models/users');
const Utils = require('../utils/utils');
const bcrypt = require("bcrypt");

class AuthFunction {
    static async register(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const password_bcrypt = await bcrypt.hash(req.body.password, salt);
            const existing_user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (existing_user) {
                return res.status(200).send({
                    status: 400,
                    message: 'fail',
                    data: null
                });
            }

            const user_create = await User.create({
                nguoi_dung_id: null,
                ten_dang_nhap: req.body.username,
                mat_khau: password_bcrypt,
                email: req.body.email,
            });

            if (!user_create) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'register fail'
                });
            }

            const full_user_data = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (full_user_data) {
                return res.status(200).send({
                    status: 200,
                    data: {
                        token: Utils.createJWT(full_user_data),
                        nguoi_dung_id: full_user_data.nguoi_dung_id,
                        ten_dang_nhap: full_user_data.ten_dang_nhap,
                        email: full_user_data.email
                    },
                    message: 'success'
                });
            }
        } catch (err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'register fail'
            });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(200).send({
                    status: 404,
                    message: 'User not found',
                    data: null
                });
            }
            const match = bcrypt.compare(password, user.mat_khau);
            if (match) {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: {
                        token: Utils.createJWT(user),
                        nguoi_dung_id: user.nguoi_dung_id,
                        ten_dang_nhap: user.ten_dang_nhap,
                        email: user.email
                    }
                });
            } else {
                res.status(200).send({
                    status: 404,
                    message: 'fail',
                    data: null
                });
            }
        } catch (error) {
            res.status(200).send({
                status: 404,
                message: 'fail',
                data: null
            });
            console.error('Error during login:', error);
        }
    }

    static async getAllUser(req, res) {
        Admin.findOne({
            where: {
                id: req.body.admin_id
            }
        })
            .then(admin => {
                if (admin) {
                    User.findAll().then(users => {
                        res.status(200).send({
                            status: 200,
                            data: users,
                            message: 'success'
                        });
                    })
                }
            })
            .catch(error => {
                console.log("error get all users", error);
                res.status(200).send({
                    status: 404,
                    data: [],
                    message: 'fail'
                });
            });
    }
}

module.exports = AuthFunction;