const Class = require('../models/classes');
const ClassUser = require('../models/class_users');
const { Op } = require('sequelize');
const Utils = require('../utils/utils');
const { OWNER_CLASS } = require('../enums/class_permission');

class ClassFunction {
    static async getAllClass(req, res) {
        try {
            const classes = await Class.findAll();
            if (classes) {
                return res.status(200).send({
                    status: 200,
                    data: classes,
                    message: 'success'
                });
            }
            
            return res.status(200).send({
                status: 401,
                data: classes,
                message: 'fail'
            });
        } catch (err) {
            console.log("error get all users", err);
            return res.status(200).send({
                status: 404,
                data: [],
                message: 'fail'
            });
        }
    }

    static async getByAdmin(req, res) {
        try {
            const _list_class_user_id = await ClassUser.findAll({
                where: {
                    nguoi_dung_id: req.userId
                },
                attributes: ['ma_lop']
            });

            if (_list_class_user.length == 0) {
                return res.status(200).send({
                    message: 'not found class of this user',
                    data: [],
                    status: 404
                });
            }

            const _list_class = await Class.findAll({
                where: {
                    ma_lop: _list_class_user_id
                }
            });
            return res.status(200).send({
                data: _list_class,
                message: 'success',
                status: 200
            });
        } catch (err) {
            return res.status(200).send({
                status: 401,
                message: 'fail',
                data: null
            });
        }
    }

    static async search(req, res) {
        try {
            const classes_found = await Class.findAll({
                ten_lop: {
                    [Op.like]: `%${req.body.class_name}%`
                }
            });

            if (classes_found) {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: classes_found
                });
            }
        } catch (err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'error'
            });
        }
    }

    static async createClass(req, res) {
        try {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
            const decoded_data = Utils.getDecodeTokenData(token);
            const id = Utils.createID('ma_lop');
            console.log(decoded_data);
            return res.status(200).send('test');
            const class_created = await Class.create({
                ma_lop: id,
                ten_lop: req.body.class_name,
                description: req.body.description || null
            });

            const class_user_created = await ClassUser.create({
                id: Utils.createID('ma_lop_user'),
                nguoi_dung_id: decoded_data.nguoi_dung_id,
                ma_lop: id,
                permission: OWNER_CLASS
            });

            if (!class_created) {
                return res.status(200).send({
                    status: 401,
                    message: 'fail',
                    data: null
                });
            }
            return res.status(200).send({
                status: 200,
                message: 'success',
                data: class_created
            });
        } catch (err) {
            return res.status(200).send({
                status: 401,
                message: 'fail',
                data: null
            });
        }
    }
}

module.exports = ClassFunction;