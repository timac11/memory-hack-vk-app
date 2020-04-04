import { EntityRepository, Repository } from 'typeorm'
import {Military} from '../models'

@EntityRepository(Military)
export class MilitaryRepository extends Repository<Military> {}