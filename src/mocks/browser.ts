import { setupWorker, rest } from 'msw'

const handlers = [
  rest.post('/api/onboarding', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.status(201), ctx.json({ id: 'mock-customer-123', ...body }))
  }),
  rest.get('/api/transactions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: [{ id: 'txn_1', amount: 250.5, currency: 'USD', status: 'posted' }] })
    )
  }),
  rest.get('/api/risk/score', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ score: 42, level: 'medium' }))
  })
 ,
  rest.get('/api/payments', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: [ { id: 'p_1', amount: 1200, currency: 'USD', beneficiary: 'Alice', status: 'posted' } ] })
    )
  }),
  rest.post('/api/payments', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.status(201), ctx.json({ id: 'p_mock_123', ...body, status: 'pending' }))
  }),
  rest.get('/api/risk/transactions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: [ { id: 'r_txn_1', amount: 5000, country: 'NG', flagged: true } ] })
    )
  })
]

export const worker = setupWorker(...handlers)
