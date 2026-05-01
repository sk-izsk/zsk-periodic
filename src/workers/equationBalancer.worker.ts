import { balanceEquation, type BalanceResult } from '@/lib/balancer'

type BalanceRequest = {
  id: number
  input: string
}

type BalanceResponse = {
  id: number
  result: BalanceResult
}

self.onmessage = (event: MessageEvent<BalanceRequest>) => {
  const response: BalanceResponse = {
    id: event.data.id,
    result: balanceEquation(event.data.input),
  }

  self.postMessage(response)
}
