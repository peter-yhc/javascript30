/**
 * Ref:
 * https://bost.ocks.org/mike/join/
 * http://bl.ocks.org/tomgp/6475678
 **/

const diameter = 500;
const faceRadius = diameter / 2;
const clockStrokeWidth = 3;
const clockRadius = faceRadius - clockStrokeWidth;
const secondtickStart = clockRadius - 5;
const secondtickLength = 5;
const minutetickStart = clockRadius - 5;
const minutetickLength = 10;
const hourTextHeight = clockRadius - 25;

const svg = d3.select('svg')
  .attr('width', diameter)
  .attr('height', diameter);


const hourScale = d3.scaleLinear().range([0, 330]).domain([0, 11]);
const minuteScale = d3.scaleLinear().range([0, 354]).domain([0, 59]);
const secondScale = minuteScale;

const clockData = [{
  type: 'hour',
  value: 0,
  length: faceRadius - 100,
  scale: hourScale
}, {
  type: 'minute',
  value: 0,
  length: faceRadius - 30,
  scale: minuteScale
}, {
  type: 'second',
  value: 0,
  length: faceRadius - 40,
  scale: secondScale
}];


const drawClock = () => {

  const clockFace = svg.append('g')
    .attr('transform', `translate(${faceRadius}, ${faceRadius})`);

  clockFace.append('circle')
    .attr('class', 'clock-face')
    .attr('r', 5)

  const handGroup = clockFace.append('g').attr('id', 'clock-hands');

  handGroup.selectAll('line').data(clockData).enter()
    .append('line')
    .attr('class', d => d.type + '-hand')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', d => -d.length)
    .attr('transform', d => `rotate(${d.scale(d.value)})`);

  clockFace.selectAll('second-tick')
    .data(d3.range(0, 60))
    .enter()
    .append('line')
    .attr('class', 'second-tick')
    .attr('x1', 0)
    .attr('y1', secondtickStart)
    .attr('x2', 0)
    .attr('y2', secondtickStart + secondtickLength)
    .attr('transform', d => `rotate(${d * 6})`);

  clockFace.selectAll('minute-tick')
    .data(d3.range(0, 60, 5))
    .enter()
    .append('line')
    .attr('class', 'minute-tick')
    .attr('x1', 0)
    .attr('y1', minutetickStart)
    .attr('x2', 0)
    .attr('y2', minutetickStart + minutetickLength)
    .attr('transform', d => `rotate(${d * 6})`);

  clockFace.selectAll('hour-labels')
    .data(d3.range(1, 13))
    .enter()
    .append('text')
    .attr('class', 'hour-labels')
    .attr('text-anchor', 'middle')
    .attr('x', d => hourTextHeight * Math.sin(Math.PI / 6 * d))
    .attr('y', d => -hourTextHeight * Math.cos(Math.PI / 6 * d))
    .attr('transform', 'translate(0, 5)')
    .text(d => d);
};

const updateClock = () => {
  const currentTime = new Date();
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  clockData[0].value = (hours % 12) + minutes / 60;
  clockData[1].value = minutes;
  clockData[2].value = seconds;

  d3.select('#clock-hands').selectAll('line')
    .data(clockData)
    .transition()
    .attr('transform', d => `rotate(${d.scale(d.value)})`);
};

drawClock();

setInterval(() => {
  updateClock();
}, 1000);
