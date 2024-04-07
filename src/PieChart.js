import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const colors = ['Green', 'LimeGreen', 'Lime', 'GreenYellow', 'Yellow', 'Gold', 'GoldenRod', 'Orange', 'DarkOrange', 'OrangeRed', 'Red', 'DarkRed'].reverse();

const PieChart = ({ data }) => {
  const ref = useRef();
  const colorsRef = useRef([]);

  useEffect(() => {

    const expandFactor = 1.1; // Factor by which the slice expands
    const svg = d3.select(ref.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const radius = Math.min(width, height) / (2 * expandFactor); // Adjust radius based on expansion
    const pie = d3.pie().value(d => d[0]);
    const arcData = pie(data.sort((a, b) => {
        if (a[0] === b[0]) {
          return a[1].localeCompare(b[1]);
        }
        return a[0] - b[0];
      }));

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const arcHoverGenerator = d3.arc().innerRadius(0).outerRadius(radius * expandFactor); // Larger radius for hover

    const paths = svg.select('.pie-slices').selectAll('path')
        .data(arcData, (d) => d.index);

        const legendItem = svg.select('.pie-legend')
        .selectAll('g')
        .data(arcData.reverse());
      
      // Remove any unnecessary items
      legendItem.exit().remove();
      
      // Create new items for new data
      const newLegendItem = legendItem.enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`);
      
      newLegendItem.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', (d, i) => colors[i % colors.length]);
      
      newLegendItem.append('text')
        .attr('x', 15)
        .attr('y', 10)
        .text(d => d.data[1])
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle');
      
      // Update existing items
      legendItem.select('text')
        .text(d => d.data[1]);
      
      legendItem.attr('transform', (d, i) => `translate(0, ${i * 20})`);

    paths.join(
      enter => enter.append('path')
                    .attr('fill', (d, i) => colors[arcData.length-1])
                    .attr('opacity', 0.7)
                    .attr('transform', `translate(${width / 2}, ${height / 2})`)
                    .attr('stroke', 'white')
                    .attr('stroke-width', '2px')
                    .each(function(d) { this._current = d; })
                    .on('mouseover', function(event, d) {
                      d3.select(this).transition().duration(300)
                        .attr('d', arcHoverGenerator(d))
                    })
                    .on('mouseout', function(event, d) {
                      d3.select(this).transition().duration(300)
                        .attr('d', arcGenerator(d))
                    })
                    .transition().duration(750)
                    .attrTween('d', function(d) {
                      const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                      return function(t) {
                        d.endAngle = i(t);
                        return arcGenerator(d);
                      };
                    }),
      update => update.transition().duration(750)
      
                     .attrTween('d', function(d) {
                       const i = d3.interpolate(this._current, d);
                       this._current = i(0);
                       return function(t) { return arcGenerator(i(t)); };
                     }),
      exit => exit.transition().duration(750)
                  .attrTween('d', function(d) {
                    const i = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                      d.startAngle = i(t);
                      return arcGenerator(d);
                    };
                  })
                  .remove()
    );
    const labels = svg.select('.pie-labels').selectAll('text')
                      .attr('font-size', '12px')
                      .data(arcData);

    labels.join(
      enter => enter.append('text')
                    .attr('transform', d => `translate(${arcGenerator.centroid(d).map(p => p + width / 2)})`)
                    .attr('text-anchor', 'middle')
                    .text(d => d.data[0]),
      update => update.attr('transform', d => `translate(${arcGenerator.centroid(d).map(p => p + width / 2)})`)
                      .text(d => d.data[0]),
      exit => exit.remove()
    );

  }, [data]);

  // Increase the viewBox size by the expandFactor to accommodate the expanded slice
  const viewBoxSize = 1000 * 1.3; // 10% larger than the original size

  return (
    <svg ref={ref} width={500} height={500} viewBox={`-200 -20 ${viewBoxSize} ${viewBoxSize}`}>
      <g className="pie-slices" />
      <g className="pie-labels" fontSize="12px" />
      <g className="pie-legend" transform={`translate(${500}, 500)`} /> {/* Adjust `legendPosition` as needed */}
    </svg>
  );
};

export default PieChart;
