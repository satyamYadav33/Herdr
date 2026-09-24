import React, { useState } from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function CostAccuracyCharts() {
  const [activeTab, setActiveTab] = useState('terminalBench');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const tabs = [
    { key: 'terminalBench', label: 'Agentic terminal coding', data: OPUS_CONTENT.chartData.terminalBench },
    { key: 'frontierCode', label: 'FrontierCode v1.1', data: OPUS_CONTENT.chartData.frontierCode },
    { key: 'cursorBench', label: 'CursorBench 4.0', data: OPUS_CONTENT.chartData.cursorBench },
    { key: 'gdpVal', label: 'GDPval-AA v2.1 Elo', data: OPUS_CONTENT.chartData.gdpVal },
    { key: 'automationBench', label: 'AutomationBench', data: OPUS_CONTENT.chartData.automationBench },
    { key: 'wandr', label: 'WANDR Data Retrieval', data: OPUS_CONTENT.chartData.wandr },
  ];

  const currentChart = tabs.find(t => t.key === activeTab)?.data;

  // Compute graph bounds for responsive SVG plotting
  const allCosts = currentChart.models.flatMap(m => m.points.map(p => p.cost));
  const allScores = currentChart.models.flatMap(m => m.points.map(p => p.score));
  
  const minCost = Math.min(...allCosts) * 0.7;
  const maxCost = Math.max(...allCosts) * 1.3;
  const minScore = Math.min(...allScores) * 0.9;
  const maxScore = Math.max(...allScores) * 1.1;

  // SVG dimensions
  const svgWidth = 700;
  const svgHeight = 360;
  const padding = { top: 40, right: 50, bottom: 60, left: 70 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Log scale conversion for cost
  const getX = (cost) => {
    const logMin = Math.log10(minCost);
    const logMax = Math.log10(maxCost);
    const logVal = Math.log10(cost);
    return padding.left + ((logVal - logMin) / (logMax - logMin)) * plotWidth;
  };

  // Linear scale conversion for score
  const getY = (score) => {
    return padding.top + plotHeight - ((score - minScore) / (maxScore - minScore)) * plotHeight;
  };

  return (
    <section className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF9F5] dark:bg-[#141413]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider">
            Cost-Efficiency Frontiers
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-3">
            Accuracy vs. Cost Curves Across Effort Levels
          </h2>
          <p className="font-serif-anthropic text-lg text-[#474541] dark:text-[#C5C2BA]">
            Where Opus 5.5’s advantage is exceptionally pronounced is token efficiency. It costs less per token than Opus 5 and uses fewer tokens per task, which nets out to a 40% drop in overall costs.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2 border-b border-[#E6E4DC] dark:border-[#2E2D29] mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setHoveredPoint(null);
              }}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-t-xl transition-all border-b-2 -mb-[2px] ${
                activeTab === tab.key
                  ? 'border-[#D97757] text-[#D97757] bg-white dark:bg-[#1C1B19]'
                  : 'border-transparent text-[#686660] dark:text-[#A09E96] hover:text-[#141413] dark:hover:text-[#FAF9F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Chart Canvas Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5]">
                {currentChart.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#686660] dark:text-[#A09E96] mt-1 max-w-2xl">
                {currentChart.description}
              </p>
            </div>

            {/* Model Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              {currentChart.models.map(m => (
                <div key={m.name} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[#141413] dark:text-[#FAF9F5]">{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Interactive Scatter & Line Chart */}
          <div className="relative w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[800px] mx-auto overflow-visible select-none">
              {/* Background Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = padding.top + plotHeight * ratio;
                const scoreVal = Math.round(maxScore - ratio * (maxScore - minScore));
                return (
                  <g key={i}>
                    <line 
                      x1={padding.left} 
                      y1={y} 
                      x2={svgWidth - padding.right} 
                      y2={y} 
                      stroke="#E6E4DC" 
                      strokeDasharray="4 4" 
                      className="dark:stroke-[#2E2D29]"
                    />
                    <text 
                      x={padding.left - 12} 
                      y={y + 4} 
                      fontSize="10" 
                      textAnchor="end" 
                      className="fill-[#8C8980]"
                    >
                      {scoreVal}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Log Ticks */}
              {allCosts.sort((a,b) => a-b).slice(0, 5).map((cost, i) => {
                const x = getX(cost);
                return (
                  <g key={i}>
                    <line 
                      x1={x} 
                      y1={padding.top} 
                      x2={x} 
                      y2={svgHeight - padding.bottom} 
                      stroke="#E6E4DC" 
                      strokeDasharray="2 4" 
                      className="dark:stroke-[#2E2D29]"
                    />
                    <text 
                      x={x} 
                      y={svgHeight - padding.bottom + 18} 
                      fontSize="10" 
                      textAnchor="middle" 
                      className="fill-[#8C8980]"
                    >
                      ${cost.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Axis Titles */}
              <text 
                x={svgWidth / 2} 
                y={svgHeight - 12} 
                fontSize="11" 
                textAnchor="middle" 
                className="fill-[#686660] dark:fill-[#A09E96] font-medium"
              >
                {currentChart.xAxisLabel}
              </text>
              <text 
                transform={`rotate(-90)`} 
                x={-(svgHeight / 2)} 
                y={18} 
                fontSize="11" 
                textAnchor="middle" 
                className="fill-[#686660] dark:fill-[#A09E96] font-medium"
              >
                {currentChart.yAxisLabel}
              </text>

              {/* Render Lines for each model */}
              {currentChart.models.map(m => {
                if (m.points.length < 2) return null;
                const pathData = m.points.reduce((acc, pt, index) => {
                  const cmd = index === 0 ? 'M' : 'L';
                  return `${acc} ${cmd} ${getX(pt.cost)} ${getY(pt.score)}`;
                }, '');

                return (
                  <path
                    key={m.name}
                    d={pathData}
                    fill="none"
                    stroke={m.color}
                    strokeWidth={m.name === 'Opus 5.5' ? 3.5 : 2}
                    strokeDasharray={m.name === 'Opus 5.5' ? 'none' : '3 3'}
                    opacity={m.name === 'Opus 5.5' ? 1 : 0.75}
                  />
                );
              })}

              {/* Render Points */}
              {currentChart.models.map(m => (
                <g key={m.name}>
                  {m.points.map((pt, pIdx) => {
                    const cx = getX(pt.cost);
                    const cy = getY(pt.score);
                    const isHovered = hoveredPoint && hoveredPoint.model === m.name && hoveredPoint.effort === pt.effort;
                    const isOpus = m.name === 'Opus 5.5';

                    return (
                      <g 
                        key={pIdx}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPoint({ model: m.name, color: m.color, ...pt })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isHovered ? 8 : (isOpus ? 6 : 4.5)}
                          fill={m.color}
                          stroke="#FFFFFF"
                          strokeWidth={2}
                          className="transition-all duration-150"
                        />
                        {/* Effort label */}
                        <text
                          x={cx}
                          y={cy - 10}
                          fontSize="9"
                          textAnchor="middle"
                          className="fill-[#686660] dark:fill-[#A09E96] font-mono pointer-events-none"
                        >
                          {pt.effort}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}
            </svg>
          </div>

          {/* Interactive Tooltip Card */}
          {hoveredPoint ? (
            <div className="mt-4 p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181715] border border-[#D97757]/30 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredPoint.color }} />
                <span className="font-semibold text-sm text-[#141413] dark:text-[#FAF9F5]">
                  {hoveredPoint.model}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#D97757]/10 text-[#D97757] font-mono font-medium uppercase text-[10px]">
                  Effort: {hoveredPoint.effort}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[#8C8980]">Score: </span>
                  <span className="font-bold text-[#141413] dark:text-[#FAF9F5] text-sm">{hoveredPoint.score}%</span>
                </div>
                <div>
                  <span className="text-[#8C8980]">Cost/Task: </span>
                  <span className="font-bold text-[#D97757] text-sm">${hoveredPoint.cost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 py-2 text-center text-xs text-[#8C8980]">
              Hover over any data point to inspect model effort, accuracy score, and cost per attempt.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
