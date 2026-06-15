'use client'
import { useState, useMemo } from 'react'

const DEFAULT_ROWS = [
  { id: 1, x: '1', y: '2.1' },
  { id: 2, x: '2', y: '4.8' },
  { id: 3, x: '3', y: '7.3' },
  { id: 4, x: '4', y: '10.1' },
  { id: 5, x: '5', y: '12.9' },
  { id: 6, x: '6', y: '15.7' },
]

function nf(n, d = 3) {
  if (!isFinite(n)) return '—'
  return parseFloat(n.toFixed(d)).toString()
}

function axf(n) {
  return parseFloat(n.toFixed(2)).toString()
}

function isProcessed(v) {
  const s = String(v).trim()
  const d = s.indexOf('.')
  return d !== -1 && s.length - d - 1 > 3
}

function linearCoeffs(pts) {
  const n = pts.length
  if (n < 2) return null
  let sx = 0, sy = 0, sxy = 0, sx2 = 0
  for (const { x, y } of pts) { sx += x; sy += y; sxy += x * y; sx2 += x * x }
  const d = n * sx2 - sx * sx
  if (Math.abs(d) < 1e-12) return null
  const m = (n * sxy - sx * sy) / d
  const b = (sy - m * sx) / n
  return { m, b }
}

function quadCoeffs(pts) {
  const n = pts.length
  if (n < 3) return null
  let s0 = n, s1 = 0, s2 = 0, s3 = 0, s4 = 0, t0 = 0, t1 = 0, t2 = 0
  for (const { x, y } of pts) {
    s1 += x; s2 += x ** 2; s3 += x ** 3; s4 += x ** 4
    t0 += y; t1 += x * y; t2 += x ** 2 * y
  }
  const A = [[s0, s1, s2, t0], [s1, s2, s3, t1], [s2, s3, s4, t2]]
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      const f = A[j][i] / A[i][i]
      for (let k = i; k <= 3; k++) A[j][k] -= f * A[i][k]
    }
  }
  const c = [0, 0, 0]
  for (let i = 2; i >= 0; i--) {
    c[i] = A[i][3]
    for (let j = i + 1; j < 3; j++) c[i] -= A[i][j] * c[j]
    c[i] /= A[i][i]
  }
  if (c.some(isNaN)) return null
  return { c: c[0], b: c[1], a: c[2] }
}

function getRegression(pts, type) {
  if (pts.length < 2) return null
  if (type === 'linear') {
    const c = linearCoeffs(pts)
    if (!c) return null
    const sg = c.b >= 0 ? ' + ' : ' − '
    return { fn: x => c.m * x + c.b, label: `y = ${nf(c.m)}x${sg}${nf(Math.abs(c.b))}` }
  }
  if (type === 'quadratic') {
    const c = quadCoeffs(pts)
    if (!c) return null
    const s1 = c.b >= 0 ? ' + ' : ' − ', s2 = c.c >= 0 ? ' + ' : ' − '
    return {
      fn: x => c.a * x ** 2 + c.b * x + c.c,
      label: `y = ${nf(c.a)}x²${s1}${nf(Math.abs(c.b))}x${s2}${nf(Math.abs(c.c))}`,
    }
  }
  if (type === 'exponential') {
    const vp = pts.filter(p => p.y > 0)
    if (vp.length < 2) return null
    const lp = vp.map(p => ({ x: p.x, y: Math.log(p.y) }))
    const c = linearCoeffs(lp)
    if (!c) return null
    const a = Math.exp(c.b), b = c.m
    return { fn: x => a * Math.exp(b * x), label: `y = ${nf(a)} · e^(${nf(b)}x)` }
  }
  if (type === 'normal') {
    const mu = pts.reduce((s, p) => s + p.x, 0) / pts.length
    const sigma = Math.sqrt(pts.reduce((s, p) => s + (p.x - mu) ** 2, 0) / pts.length)
    if (sigma < 1e-10) return null
    const yMax = Math.max(...pts.map(p => p.y))
    const scale = yMax / (1 / (sigma * Math.sqrt(2 * Math.PI)))
    return {
      fn: x => (scale / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2)),
      label: `y = (1/σ√2π) · e^(−(x−μ)²/2σ²)   μ=${nf(mu, 2)}, σ=${nf(sigma, 2)}`,
    }
  }
  return null
}

const ML = 52, MT = 16, MR = 16, MB = 42
const CW = 420, CH = 255
const PW = CW - ML - MR, PH = CH - MT - MB

export default function DataCurveFitting() {
  const [rows, setRows] = useState(DEFAULT_ROWS)
  const [fitType, setFitType] = useState('linear')
  const [nextId, setNextId] = useState(10)

  const validPts = useMemo(
    () => rows
      .filter(r => r.x !== '' && r.y !== '' && !isNaN(+r.x) && !isNaN(+r.y))
      .map(r => ({ x: +r.x, y: +r.y })),
    [rows]
  )

  const hasWarn = useMemo(
    () => rows.some(r => (r.x !== '' && isProcessed(r.x)) || (r.y !== '' && isProcessed(r.y))),
    [rows]
  )

  const chart = useMemo(() => {
    if (!validPts.length) return null
    const xs = validPts.map(p => p.x), ys = validPts.map(p => p.y)
    const xMn = Math.min(...xs), xMx = Math.max(...xs)
    const yMn = Math.min(...ys), yMx = Math.max(...ys)
    const xP = (xMx - xMn) * 0.12 || 1, yP = (yMx - yMn) * 0.18 || 0.5
    const x0 = xMn - xP, x1 = xMx + xP, y0 = yMn - yP, y1 = yMx + yP

    const tx = x => ML + (x - x0) / (x1 - x0) * PW
    const ty = y => CH - MB - (y - y0) / (y1 - y0) * PH

    const NT = 5
    const xTicks = Array.from({ length: NT + 1 }, (_, i) => x0 + i * (x1 - x0) / NT)
    const yTicks = Array.from({ length: NT + 1 }, (_, i) => y0 + i * (y1 - y0) / NT)

    const reg = getRegression(validPts, fitType)
    let curvePath = ''
    if (reg && validPts.length >= 2) {
      const cpArr = []
      for (let i = 0; i <= 80; i++) {
        const xv = x0 + i * (x1 - x0) / 80
        const yv = reg.fn(xv)
        if (isFinite(yv)) cpArr.push(`${tx(xv).toFixed(1)},${ty(yv).toFixed(1)}`)
      }
      curvePath = cpArr.join(' ')
    }

    return { tx, ty, xTicks, yTicks, reg, curvePath }
  }, [validPts, fitType])

  function updateCell(id, field, val) {
    setRows(r => r.map(row => row.id === id ? { ...row, [field]: val } : row))
  }

  function addRow() {
    setRows(r => [...r, { id: nextId, x: '', y: '' }])
    setNextId(n => n + 1)
  }

  function removeRow(id) {
    if (rows.length > 1) setRows(r => r.filter(row => row.id !== id))
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.45fr)' }}>

      {/* Panel A — data table */}
      <div>
        <p className="text-[11px] font-medium text-steel uppercase tracking-widest mb-2">
          Panel A — raw data entry
        </p>

        <div className="border border-parchment rounded-xl overflow-hidden">
          <table className="w-full" style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr className="bg-cream">
                <th className="w-7 px-2 py-2 text-left text-[11px] text-steel font-medium border-b border-parchment">#</th>
                <th className="px-2 py-2 text-left text-[11px] text-steel font-medium border-b border-parchment">x</th>
                <th className="px-2 py-2 text-left text-[11px] text-steel font-medium border-b border-parchment">y</th>
                <th className="w-7 border-b border-parchment" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const xw = row.x !== '' && isProcessed(row.x)
                const yw = row.y !== '' && isProcessed(row.y)
                return (
                  <tr key={row.id} className="border-t border-parchment">
                    <td className="px-2 text-[11px] text-steel/60 align-middle">{i + 1}</td>
                    <td className="p-0" style={{ background: xw ? '#FEF3C7' : undefined }}>
                      <input
                        value={row.x}
                        onChange={e => updateCell(row.id, 'x', e.target.value)}
                        className="w-full border-0 bg-transparent px-2 py-1.5 text-[13px] font-mono text-navy focus:outline-none"
                        placeholder="0"
                      />
                    </td>
                    <td className="p-0" style={{ background: yw ? '#FEF3C7' : undefined }}>
                      <input
                        value={row.y}
                        onChange={e => updateCell(row.id, 'y', e.target.value)}
                        className="w-full border-0 bg-transparent px-2 py-1.5 text-[13px] font-mono text-navy focus:outline-none"
                        placeholder="0"
                      />
                    </td>
                    <td className="text-center align-middle">
                      <button
                        onClick={() => removeRow(row.id)}
                        className="p-1 text-steel/40 hover:text-red-500 transition-colors"
                        aria-label="Remove row"
                      >
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <button
          onClick={addRow}
          className="mt-2 w-full py-1.5 text-[12px] text-steel border border-parchment rounded-lg hover:bg-cream transition-colors flex items-center justify-center gap-1.5"
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add data point
        </button>

        {hasWarn && (
          <div className="mt-2.5 p-2.5 rounded-lg flex items-start gap-2" style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#92400E' }} viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 12.5H1L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M7 5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="text-[11px] leading-relaxed" style={{ color: '#78350F' }}>
              Warning: extended essays require raw, unprocessed data. Highlighted cells may contain calculated values (more than 3 decimal places).
            </p>
          </div>
        )}
      </div>

      {/* Panel B — chart */}
      <div>
        <p className="text-[11px] font-medium text-steel uppercase tracking-widest mb-2">
          Panel B — scatter plot & curve fitting
        </p>

        <div className="flex items-center gap-2 mb-2">
          <label className="text-[12px] text-steel shrink-0">Curve fit:</label>
          <select
            value={fitType}
            onChange={e => setFitType(e.target.value)}
            className="flex-1 text-[12px] border border-parchment rounded-lg px-2 py-1.5 bg-white text-navy focus:outline-none"
          >
            <option value="linear">Linear — y = mx + b</option>
            <option value="quadratic">Quadratic — y = ax² + bx + c</option>
            <option value="exponential">Exponential — y = ae^(bx)</option>
            <option value="normal">Normal distribution</option>
          </select>
        </div>

        <div className="border border-parchment rounded-xl overflow-hidden">
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" style={{ display: 'block' }}>
            <defs>
              <clipPath id="dc-plot-clip">
                <rect x={ML} y={MT} width={PW} height={PH} />
              </clipPath>
            </defs>

            {chart ? (
              <>
                <rect x={ML} y={MT} width={PW} height={PH} fill="#FAFAF8" />

                {chart.xTicks.map((xv, i) => (
                  <g key={`xt-${i}`}>
                    <line x1={chart.tx(xv).toFixed(1)} y1={MT} x2={chart.tx(xv).toFixed(1)} y2={CH - MB} stroke="#DDD9C4" strokeWidth="0.5" />
                    <text x={chart.tx(xv).toFixed(1)} y={CH - MB + 14} textAnchor="middle" fontSize="10" fill="#9BAAB8" fontFamily="ui-monospace,monospace">{axf(xv)}</text>
                  </g>
                ))}

                {chart.yTicks.map((yv, i) => (
                  <g key={`yt-${i}`}>
                    <line x1={ML} y1={chart.ty(yv).toFixed(1)} x2={CW - MR} y2={chart.ty(yv).toFixed(1)} stroke="#DDD9C4" strokeWidth="0.5" />
                    <text x={ML - 5} y={parseFloat(chart.ty(yv).toFixed(1)) + 4} textAnchor="end" fontSize="10" fill="#9BAAB8" fontFamily="ui-monospace,monospace">{axf(yv)}</text>
                  </g>
                ))}

                <line x1={ML} y1={MT} x2={ML} y2={CH - MB} stroke="#C4C0AD" strokeWidth="1" />
                <line x1={ML} y1={CH - MB} x2={CW - MR} y2={CH - MB} stroke="#C4C0AD" strokeWidth="1" />
                <text x={ML + PW / 2} y={CH - 3} textAnchor="middle" fontSize="11" fill="#9BAAB8">x</text>
                <text x="11" y={MT + PH / 2 + 4} textAnchor="middle" fontSize="11" fill="#9BAAB8" transform={`rotate(-90,11,${MT + PH / 2})`}>y</text>

                {chart.curvePath && (
                  <polyline
                    points={chart.curvePath}
                    fill="none"
                    stroke="#3B6D11"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    clipPath="url(#dc-plot-clip)"
                  />
                )}

                {validPts.map((p, i) => (
                  <circle
                    key={i}
                    cx={chart.tx(p.x).toFixed(1)}
                    cy={chart.ty(p.y).toFixed(1)}
                    r="5"
                    fill="#EAF3DE"
                    stroke="#3B6D11"
                    strokeWidth="1.5"
                  />
                ))}
              </>
            ) : (
              <text x={CW / 2} y={CH / 2} textAnchor="middle" fontSize="13" fill="#9BAAB8">
                Add data points to see chart
              </text>
            )}
          </svg>
        </div>

        <div className="mt-2 px-3 py-2 rounded-lg bg-cream border border-parchment text-[13px] font-mono text-navy min-h-[38px] leading-relaxed">
          {chart?.reg
            ? chart.reg.label
            : validPts.length < 2
              ? 'Add at least 2 data points for curve fitting'
              : 'Cannot compute fit for this data'}
        </div>
      </div>
    </div>
  )
}
