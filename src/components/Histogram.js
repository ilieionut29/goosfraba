import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Histogram = ({
  monthlyData,
  windowWidth,
  windowHeight,
  months,
  colorMap,
}) => {
  useEffect(() => {
    const data = {};
    monthlyData.forEach(({ month, postCount }) => {
      data[month] = data[month] ? data[month] + postCount : postCount;
    });

    d3.select('.histogram').selectAll('*').remove();

    const chartMargin = { left: 24, right: 24, top: 24, bottom: 24 };
    const chartWidth = windowWidth - chartMargin.left - chartMargin.right;
    const chartHeight = windowHeight - chartMargin.top - chartMargin.bottom;

    const svg = d3
      .select('.histogram')
      .append('svg')
      .attr('width', chartWidth + chartMargin.left + chartMargin.right)
      .attr('height', chartHeight + chartMargin.top + chartMargin.bottom)
      .append('g')
      .attr('transform', `translate(${chartMargin.left}, ${chartMargin.top})`);

    const x = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.24);
    const y = d3.scaleLinear().rangeRound([chartHeight, 0]);

    x.domain(months);
    y.domain([0, d3.max(Object.values(data))]);

    svg
      .append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(x))
      .style('fill', (d) => colorMap[d]);

    svg
      .append('g')
      .attr('class', 'axis axis-y')
      .call(
        d3
          .axisLeft(y)
          .tickValues(d3.ticks(0, d3.max(Object.values(data)), 5))
          .tickFormat(d3.format('d'))
      );

    svg
      .selectAll('.axis-x text')
      .style('fill', (d) => colorMap[d])
      .style('font-weight', 'bold');
    svg.selectAll('.axis-x line').style('color', (d) => colorMap[d]);
    svg.selectAll('.axis-x .domain').style('color', '#f5f6fa');
    svg
      .selectAll('.axis-y text')
      .style('fill', '#f5f6fa')
      .style('font-weight', 'bold');
    svg.selectAll('.axis-y .domain').style('color', '#f5f6fa');

    svg
      .selectAll('.bar')
      .data(months)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d))
      .attr('y', chartHeight - 24)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('rx', 12)
      .attr('ry', 12)
      .style('fill', (d) => colorMap[d])
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('y', (d) => y(data[d] ? data[d] : 0) - 6)
      .attr('height', (d) =>
        y(data[d] ? data[d] : 0) > chartHeight
          ? 0
          : chartHeight - y(data[d] ? data[d] : 0)
      );
  }, [monthlyData, windowWidth, windowHeight, months, colorMap]);

  return <div className='histogram' />;
};

export default Histogram;
