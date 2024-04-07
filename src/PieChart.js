import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const colors = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red','green'];

const PieChart = ({ data }) => {
  const ref = useRef();
  const colorsRef = useRef([]);

  useEffect(() => {

    const expandFactor = 1.1; // Factor by which the slice expands
    const svg = d3.select(ref.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const radius = Math.min(width, height) / (2 * expandFactor); // Adjust radius based on expansion
    const pie = d3.pie();
    const arcData = pie(data);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const arcHoverGenerator = d3.arc().innerRadius(0).outerRadius(radius * expandFactor); // Larger radius for hover

    const paths = svg.select('.pie-slices').selectAll('path')
                     .data(arcData, (d) => d.index);

    paths.join(
      enter => enter.append('path')
                    .attr('fill', (d, i) => colors[arcData.length-1])
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
                      .data(arcData);

    labels.join(
      enter => enter.append('text')
                    .attr('transform', d => `translate(${arcGenerator.centroid(d).map(p => p + width / 2)})`)
                    .attr('text-anchor', 'middle')
                    .text(d => d.data),
      update => update.attr('transform', d => `translate(${arcGenerator.centroid(d).map(p => p + width / 2)})`)
                      .text(d => d.data),
      exit => exit.remove()
    );
  }, [data]);

  // Increase the viewBox size by the expandFactor to accommodate the expanded slice
  const viewBoxSize = 200 * 1.2; // 10% larger than the original size

  return (
    <svg ref={ref} width={viewBoxSize} height={viewBoxSize} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
      <g className="pie-slices" />
      <g className="pie-labels" />
    </svg>
  );
};

export default PieChart;
