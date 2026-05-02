import { balanceEquation, type BalanceResult } from '@/utils/balancer'
import { useCallback, useEffect, useRef, useState } from 'react'

type WorkerResponse = {
  id: number
  result: BalanceResult
}

export const useEquationBalancer = () => {
  const workerRef = useRef<Worker | null>(null)
  const requestIdRef = useRef(0)
  const [result, setResult] = useState<BalanceResult | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const worker = new Worker(new URL('../workers/equationBalancer.worker.ts', import.meta.url), {
      type: 'module',
    })

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data.id !== requestIdRef.current) {
        return
      }

      setResult(event.data.result)
      setPending(false)
    }

    worker.onerror = () => {
      setResult({ error: 'Equation worker failed. Try again.' })
      setPending(false)
    }

    workerRef.current = worker

    return () => {
      worker.terminate()
      workerRef.current = null
    }
  }, [])

  const run = useCallback((input: string) => {
    const id = requestIdRef.current + 1
    requestIdRef.current = id
    setPending(true)

    if (!workerRef.current) {
      setResult(balanceEquation(input))
      setPending(false)
      return
    }

    workerRef.current.postMessage({ id, input })
  }, [])

  return { result, pending, run }
}
