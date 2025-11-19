import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchRiskScore, fetchRiskTransactions } from '../../api/services/risk'
import Container from '../../components/layout/Container'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const RiskDashboard: React.FC = () => {
  const { data: scoreData } = useQuery(['riskScore', 'mock-customer-123'], () => fetchRiskScore('mock-customer-123'))
  const { data: txns } = useQuery(['riskTxns'], fetchRiskTransactions)

  const chartData = (txns?.data || []).map((t: any, i: number) => ({ name: `T${i + 1}`, value: t.amount }))

  return (
    <Container>
      <div className="bg-white rounded-md p-6 shadow">
        <h2 className="text-2xl font-semibold">Risk Dashboard</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded">
            <div className="text-sm text-gray-600">Risk Score</div>
            <div className="text-3xl font-bold">{scoreData?.score ?? '—'}</div>
            <div className="text-xs text-gray-500">Level: {scoreData?.level}</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-sm text-gray-600">Suspicious Transaction Trend</div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0B5FFF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default RiskDashboard
