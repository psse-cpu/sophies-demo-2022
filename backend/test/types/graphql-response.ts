export interface GraphqlResponse<T> {
  data?: T
  // TODO: complete this definition, this is actually not accurate
  // labels: tech-debt
  errors?: {
    message: string
    extensions: {
      response: {
        statusCode: number
        message: string[]
      }
    }
  }[]
}
