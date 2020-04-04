import NodeDatabase from './NodeDatabase'
import {UserRepository} from "./repositories/UserRepository";
import {getCustomRepository} from "typeorm";
import {MilitaryRepository} from "./repositories/MilitaryRepository";
import {PointRepository} from "./repositories/PointRepository";

export class NodeDatabaseService {
  private readonly db: NodeDatabase;
  public readonly userRepository: UserRepository = getCustomRepository(UserRepository);
  public readonly militaryRepository: MilitaryRepository = getCustomRepository(MilitaryRepository);
  public readonly pointRepository: PointRepository = getCustomRepository(PointRepository);

  constructor (db: NodeDatabase) {
    this.db = db;
  }
}
