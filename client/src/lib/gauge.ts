// import { select, scaleLinear, arc } from "d3";

// export function createGauge(element: HTMLElement, value: number): void {
//   const width = 300;
//   const height = 200;
//   const radius = Math.min(width, height) / 2;

//   // Clear existing content
//   select(element).selectAll("*").remove();

//   const svg = select(element)
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", `translate(${width/2},${height-20})`);

//   const scale = scaleLinear()
//     .domain([0, 100])
//     .range([-90, 90]);

//   // Create gradient
//   const gradient = svg.append("defs")
//     .append("linearGradient")
//     .attr("id", "gauge-gradient")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "0%");

//   gradient.append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "#3b82f6");

//   gradient.append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "#60a5fa");

//   // Draw gauge background
//   const gaugeArc = arc()
//     .innerRadius(radius * 0.7)
//     .outerRadius(radius)
//     .startAngle(-Math.PI/2)
//     .endAngle(Math.PI/2);

//   svg.append("path")
//     .attr("class", "gauge-background")
//     .attr("d", gaugeArc)
//     .style("fill", "#e5e7eb");

//   // Draw value arc
//   const valueArc = arc()
//     .innerRadius(radius * 0.7)
//     .outerRadius(radius)
//     .startAngle(-Math.PI/2)
//     .endAngle((scale(value) * Math.PI) / 180);

//   svg.append("path")
//     .attr("class", "gauge-value")
//     .attr("d", valueArc)
//     .style("fill", "url(#gauge-gradient)")
//     .style("opacity", 0)
//     .transition()
//     .duration(1000)
//     .style("opacity", 1);

//   // Add value text
//   svg.append("text")
//     .attr("class", "gauge-value-text")
//     .attr("y", -radius/3)
//     .attr("text-anchor", "middle")
//     .style("font-size", "2.5rem")
//     .style("font-weight", "bold")
//     .style("fill", "#1e3a8a")
//     .text("0%")
//     .transition()
//     .duration(1000)
//     .tween("text", function() {
//       const interpolate = scaleLinear().domain([0, 100]).range([0, value]);
//       return function(t: number) {
//         const node = this as SVGTextElement;
//         node.textContent = `${Math.round(interpolate(t))}%`;
//       };
//     });
// }




import { select, scaleLinear, arc, easeElastic, interpolate, interpolateNumber } from 'd3';

export function createGauge(element: HTMLElement, value: number): void {
  const width = element.clientWidth || 300;
  const height = 200;
  const radius = Math.min(width, height) / 2;

  // Clear existing content
  select(element).selectAll("*").remove();

  const svg = select(element)
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${width/2},${height-20})`);

  const scale = scaleLinear()
    .domain([0, 100])
    .range([-Math.PI/2, Math.PI/2]);

  // Create gradient
  const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", `gauge-gradient-${Math.random().toString(36).substr(2, 9)}`)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#3b82f6");

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#60a5fa");

  // Draw gauge background
  const backgroundArc = arc()
    .innerRadius(radius * 0.65)
    .outerRadius(radius * 1.05)
    .startAngle(-Math.PI/2)
    .endAngle(Math.PI/2);

  svg.append("path")
    .attr("d", backgroundArc)
    .style("fill", "#e5e7eb");

  // Draw value arc
  const valueArc = arc()
    .innerRadius(radius * 0.65)
    .outerRadius(radius * 1.05)
    .startAngle(-Math.PI/2)
    .endAngle(-Math.PI/2);

  const path = svg.append("path")
    .attr("d", valueArc)
    .style("fill", `url(#${gradient.attr("id")})`)
    .style("filter", "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))");

  path.transition()
    .duration(1500)
    .ease(easeElastic)
    .attrTween("d", function() {
      const interpolateAngle = interpolate(-Math.PI/2, scale(Math.max(0, Math.min(100, value))));
      return function(t) {
        valueArc.endAngle(interpolateAngle(t));
        return valueArc();
      };
    });

  // Add value text
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -radius/3)
    .style("font-size", "2.5rem")
    .style("font-weight", "bold")
    .style("fill", "#1e3a8a")
    .text("0%")
    .transition()
    .duration(1000)
    .tween("text", function() {
      const i = interpolateNumber(0, value);
      return function(t) {
        this.textContent = `${Math.round(i(t))}%`;
      };
    });
}
