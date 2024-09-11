/* eslint-disable no-use-before-define */
import { env } from '@/core/env'
import { Db, MongoClient } from 'mongodb'

export class MongoService {
  private static instance: MongoService

  private client: MongoClient

  public databaseInstance: Db

  constructor() {
    const {
      MONGO_INITDB_ROOT_USERNAME: DATABASE_USERNAME,
      MONGO_INITDB_ROOT_PASSWORD: DATABASE_PASSWORD,
      MONGO_INITDB_DATABASE: DATABASE_DB,
      DATABASE_PORT,
    } = env

    const URI = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}`

    this.client = new MongoClient(URI)

    this.databaseInstance = this.client.db(DATABASE_DB)

    Promise.resolve(this.connect()).then(() => {
      console.log('Connected to mongo')
    })
  }

  static getInstance() {
    if (!MongoService.instance) {
      MongoService.instance = new MongoService()
    }

    return MongoService.instance
  }

  private async connect() {
    try {
      await this.client.connect()
    } catch (error) {
      console.log('Connection to mongo failed:: ', error)
      throw new Error()
    }
  }
}
