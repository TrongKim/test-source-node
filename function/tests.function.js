const Test = require('../models/tests');
const Question = require('../models/questions');
const Answer = require('../models/answers');
const Utils = require('../utils/utils');

class TestFunction {
    static async getTests(req, res) {
        try {
            const classId = req.body.classId;
            const tests = await Test.findAll({
                where: {
                    id_malop: classId
                }
            });

            return res.status(200).send({
                message: 'get tests success',
                data: tests ? tests : [],
                status: 200
            });
        } catch(err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'get tests fail'
            });
        }
    }

    static async createTest(req, res) {
        try {
            const data = req.body;
            const test_id = Utils.createID('test');
            const test_created = await Test.create({
                de_thi_id: test_id,
                ten_de_thi: data.name,
                thoi_gian_lam_bai: data.time,
                id_malop: data.classId
            });

            if (!test_created) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'create test fail'
                });
            }
            for(let question of data.questions) {
                const questionId = Utils.createID('question');
                const question_created = await Question.create({
                    cau_hoi_id: questionId,
                    noi_dung_cau_hoi: question.content,
                    id_dethi: test_id
                });

                if (!question_created) {
                    return res.status(200).send({
                        data: null,
                        message: 'create question in test fail',
                        status: 401
                    });
                }

                for(let answer of question.dap_an) {
                    const answer_created = await Answer.create({
                        id_dapan: Utils.createID('answer'),
                        id_cauhoi: questionId,
                        is_true: answer.dap_an.isTrue,
                        noi_dung: answer.dap_an.content
                    });
    
                    if (!answer_created) {
                        return res.status(200).send({
                            data: null,
                            message: 'create answer in test fail',
                            status: 401
                        });
                    }
                }
            }

            return res.status(200).send({
                status: 200,
                data: null,
                message: 'create test success'
            });
        } catch (err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'create test fail'
            });
        }
    }

}

module.exports = TestFunction;