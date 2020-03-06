import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import convert from 'koa-convert'
import koaStatic from 'koa-static'
import cors from 'koa-cors'
import path from 'path'
import router from './router'
//import mongoose from 'mongoose'
const koaSwagger = require('koa2-swagger-ui');
import config from './config'
import respondFormatter from './middlewares/respondFormatter'

const app = new Koa();

// mongoose.Promise = global.Promise
// mongoose.connect(config.mongoConfig.url, {
//     useMongoClient: true
// })

app.keys = ['xTicket']
app.context.config = config;

app.use(cors({
    maxAge: 7 * 24 * 60 * 60,
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
    headers: 'Content-Type, Accept, Authorization'
}))
    .use(logger())
    .use(bodyParser())
    .use(convert(session(app)))
    .use(koaStatic(path.join(__dirname, '/public')))
    .use(respondFormatter('^/api'))   // 仅格式化api开头的地址输出
    .use(router.routes())
    .use(router.allowedMethods())
    .use(
        koaSwagger({
            routePrefix: './../swagger', // host at /swagger instead of default /docs
            swaggerOptions: {
                url: './swagger.json', // example path to json
            },
        }),
    )

export default app
