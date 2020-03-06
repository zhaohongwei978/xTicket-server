import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import User from '../models/user'
import commonDao from '../middlewares/commonDao'

class UserController {
    async userInfo(ctx, next) {
        if (Number(ctx.params.id) !== 1) {
            throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
        }
        ctx.body = {id: 1, name: 'twj', age: 18}
    }

    async userList(ctx, next) {
        const {name} = ctx.query;
        await commonDao.findAll(User, {name}).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
        });
        await next()
    }
}

export default new UserController()
