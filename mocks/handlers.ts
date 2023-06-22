import { rest } from 'msw'
import data from './test-data.json'
import { NewtResponse } from 'types'

const baseUrl = `https://${process.env.spaceUid}.api.newt.so/v1/`

export const handlers = [
  rest.get(`${baseUrl}/asunaroblog/article`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<NewtResponse>(data)
    )
  })
]