
import { Context } from './Context'


class BoredError extends Error {

  isBoredError = true

  sdk = 'Bored'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  BoredError
}

