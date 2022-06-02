import { DataSource } from 'typeorm'
import ormConfig from './ormconfig'

export const AppDataSource = new DataSource(ormConfig)

AppDataSource.initialize()
