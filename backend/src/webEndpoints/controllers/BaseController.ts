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
    const router = new Router();
    const namespace = `/api`;

    router.get(`${namespace}/user/:id`, this.getUser.bind(this));
    router.get(`${namespace}/matched/:id`, this.getAggregatedInfo.bind(this));
    router.get(`${namespace}/militaryUnits`, this.getMilitaryUnits.bind(this));
    router.get(`${namespace}/points/:userId`, this.getPointsByUser.bind(this));
    router.post("postUser",`${namespace}/user`, koaBody(), this.postUser.bind(this));
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
    const user: User | undefined = await this.db.service.userRepository.findOne({id: userId});
    ctx.response.status = 200;
    ctx.response.body = user || {};
  }

  async postUser(ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx);
    const user: User = ctx.request.body;
    const foundUser: User | undefined = await this.db.service.userRepository.findOne({id: user. id});
    if (foundUser) {
      await this.db.service.userRepository.update({id: user. id}, user);
    } else {
      await this.db.service.userRepository.save(user);
    }
  }

  async getAggregatedInfo(ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx);
    const userId: string = ctx.params.id;
    const user: User = await this.db.service.userRepository.findOneOrFail({id: userId});
    const users: User[] = (await this.db.service.userRepository.find({where: {military: user.military}})).filter((u: User) => u.id != user.id);
    ctx.response.body = {
      user,
      matched: users
    }
  }

  async getPointsByUser(ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx);
    const userId: string = ctx.params.userId;
    const user: User = await this.db.service.userRepository.findOneOrFail({id: userId});
    ctx.response.body = {
      points: MILITARY_UNITS.filter((unit) => unit.id === user.military)[0].points
    };
  }

  getMilitaryUnits(ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx);
    ctx.response.body = {units: MILITARY_UNITS};
  }
}
