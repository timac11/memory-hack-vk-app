import * as Router from 'koa-router'
import NodeDatabase from "../../database/NodeDatabase";
import {User} from "../../database/models";
import koaBody = require("koa-body");
import {MILITARY_UNITS} from "../mocks/militaryUnits";

export class BaseController {
  public readonly db: NodeDatabase;

  constructor(db: NodeDatabase) {
    this.db = db;
  }

  public router(): Router {
    const router = new Router()
    const namespace = `/api`;

    router.get(`${namespace}/user/:id`, this.getUser.bind(this));
    router.get(`${namespace}/militaryUnits`, this.getMilitaryUnits.bind(this));
    router.post(`${namespace}/user`, koaBody(), this.postUser.bind(this));
    router.get(`${namespace}/hello`, (ctx: Router.IRouterContext) => {
      this.setCorsHeaders(ctx);
      ctx.response.body = 'Hello!';
    });

    return router
  }

  setCorsHeaders (ctx: Router.IRouterContext) {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
    ctx.response.status = 200;
  }

  async getUser(ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx);
    const userId: string = ctx.params.id;
    console.log(`userId: ${userId}`);
    const user: User | undefined = await this.db.service.userRepository.findOne({id: userId});
    ctx.response.status = 200;
    ctx.response.body = user || {};
  }

  async postUser(ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx);
    const user: User = ctx.request.body.user;
    console.log(user);
  }

  getMilitaryUnits(ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx);
    ctx.response.body = {units: MILITARY_UNITS};
  }
}
