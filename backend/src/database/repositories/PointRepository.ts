import { EntityRepository, Repository } from 'typeorm'
import {Point} from '../models'

@EntityRepository(Point)
export class PointRepository extends Repository<Point> {}