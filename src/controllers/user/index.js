const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

class userController {
    static async signIn(ctx, next) {
        const body = ctx.request.body;
        if (!body.username || !body.password) {
            return next(ctx.throw(400, 'params error'));
        }
        let obj = null;
        try {
            const doc = await UserModel.findOne({username: body.username});
            if (doc.password == body.password) {
                obj = {
                    message: 'signIn success',
                    uuid: doc._id
                }
            } else {
                obj = {
                    message: 'signIn failed, password error'
                }
            }
        } catch (error) {
            console.log(error)
            obj = {
                error: error,
                msg: 'server error'
            };
        }
        ctx.body = obj
    }
    static async signUp(ctx, next) {
        const body = ctx.request.body;
        if (!body.username || !body.password || !body.userphone || !body.nickname) {
            return next(ctx.throw(400, 'params error'));
        }
        let obj = null;
        try {
            const doc = await UserModel.create({username: body.username, password: body.password, userphone: body.userphone, nickname: body.nickname});
            obj = {
                message: 'signUp success'
            }
        } catch (error) {
            console.log(error)
            obj = {
                error: error,
                msg: 'server error'
            };
        }
        ctx.body = obj
    }
    static async getUserInfo(ctx, next) {
        if (!ctx.params.useruuid) {
            return next(ctx.throw(400, 'params error'));
        }
        let obj = null;
        try {
            const doc = await UserModel.findOne({
                _id: ctx.params.useruuid
            }, {
                password: 0,
                _id: 0
            });
            obj = JSON.stringify(doc)
        } catch (error) {
            console.log(error)
            obj = {
                error: error,
                msg: 'server error'
            };
        }
        ctx.body = obj
    }
    static async setUserInfo(ctx, next) {
        const body = ctx.request.body;
        if (!body.useruuid) {
            return next(ctx.throw(400, 'params error'));
        }
        let obj = null;
        try {
            let names = [];
            for (let item in body) {
                names.push(item)
            }
            for (let i = 0; i < names.length; i++) {
                if (!body[names[i]]) {
                    delete body[names[i]]
                }
            }
            const doc = await UserModel.update({_id: body.useruuid}, body);
            obj = {
                message: 'setUserInfo success'
            }
        } catch (error) {
            console.log(error)
            obj = {
                error: error,
                msg: 'server error'
            };
        }
        ctx.body = obj
    }
}
module.exports = userController;