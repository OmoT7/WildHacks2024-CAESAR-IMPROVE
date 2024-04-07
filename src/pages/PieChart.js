import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
<link href="https://fonts.googleapis.com/css?family=Noto-Serif" rel="stylesheet"></link>
let isClicked = false;
const PieChart = ({ data }) => {

 
  const ref = useRef();
  const [selectedArray, setSelectedArray] = useState([]);
  useEffect(() => {


    const expandFactor = 1.1; // Factor by which the slice expands
    const svg = d3.select(ref.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const radius = Math.min(width, height) / (2 * expandFactor); // Adjust radius based on expansion
    const pie = d3.pie().value(d => d[0]);
    let arcData = pie(data.sort((a, b) => {
        if (a[0] === b[0]) {
          return b[1].localeCompare(a[1]);
        }
        return a[0] - b[0];
      }));

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const arcHoverGenerator = d3.arc().innerRadius(0).outerRadius(radius * expandFactor); // Larger radius for hover

    const legendItem = svg.select('.pie-legend')
      .selectAll('g')
      .data(arcData);
     
      // Remove any unnecessary items
      legendItem.exit().remove();
      
      // Create new items for new data
      const newLegendItem = legendItem.enter()
        .append('g')
        .attr('transform', (d, i) => `translate(-30, ${i * 60})`);
      
      newLegendItem.append('rect')
        .attr('width', 40)
        .attr('height', 40)
        .attr('fill', d => d.data[2]);
      
      newLegendItem.append('text')
        .attr('x', 60)
        .attr('y', 25)
        .attr('font-size', '30px')
        //.attr('font-family', 'Noto Serif')
        .text(d => d.data[1])
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle');
      
      // Update existing items
      legendItem.select('text')
        .text(d => d.data[1]);
      legendItem.select('rect')
        .attr('fill', d => d.data[2]);
      
      legendItem.attr('transform', (d, i) => `translate(-30, ${i * 60})`);
    arcData = pie(data.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1].localeCompare(b[1]);
      }
      return a[0] - b[0];
    }));
    svg.select('.array-items').remove();

    // Create a group for array items
    const arrayGroup = svg.append('g')
      .attr('class', 'array-items')
      .attr('transform', `translate(${width - 200}, 50)`); // Positioning the group

    // Add text elements for each item in the array
    arrayGroup.selectAll('text')
      .data(selectedArray)
      .enter()
      .append('text')
      .attr('y', (d, i) => i * 30) // Vertical spacing
      .attr('font-size', '20px')
      .text(d => d);

    const paths = svg.select('.pie-slices').selectAll('path')
      .data(arcData, (d) => d.index);
    let isClickedLocal = false;
    paths.join(
      enter => enter.append('path')
                    .attr('fill', (d) => d.data[2])
                    .attr('opacity', 0.7)
                    .attr('transform', `translate(${width / 2}, ${height / 2})`)
                    .attr('stroke', 'white')
                    .attr('stroke-width', '2px')
                    .each(function(d) { this._current = d; })
                    .on('mouseover', function(event, d) {
                      if(!isClicked){
                        d3.select(this).transition().duration(300)
                        .attr('d', arcHoverGenerator(d))
                      }
                    })
                    .on('mouseout', function(event, d) {
                      if(!isClicked){
                        d3.select(this).transition().duration(300)
                          .attr('d', arcGenerator(d))
                      }
                    })
                    .on('click', function(event, d) {
                      if(isClicked && isClickedLocal){
                        isClicked = false;
                        isClickedLocal = false;
                      } else if(!isClicked && !isClickedLocal){
                        d3.select(this).transition()
                          .attr('d', arcHoverGenerator(d))
                        isClicked = true;
                        isClickedLocal = true;
                        setSelectedArray(d.data[3]);
                      }
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
                     .attr('fill', (d) => d.data[2])
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

  }, [data, selectedArray]);

  // Increase the viewBox size by the expandFactor to accommodate the expanded slice
  const viewBoxSize = 1500 * 1.5; // 10% larger than the original size

  return (
    <div className="pie-chart-wrapper">
      <div className="pie-chart">
        <svg ref={ref} width={1600} height={1300} viewBox={`0 -100 ${viewBoxSize} ${viewBoxSize}`}>
          <g className="pie-slices" />
          <g className="pie-legend" transform={`translate(${-210}, 300)`} />
        </svg>
      </div>
    </div>
  );  
};

export default PieChart;