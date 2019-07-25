const diameter = 500;
const radius = diameter / 2;
const frameWidth = 3;

const svg = d3.select('svg')
  .attr('width', diameter)
  .attr('height', diameter);

const group = svg.append('g')
  .attr('transform', `translate(${radius}, ${radius})`);

const circle = group.append('circle')
  .attr('r', radius - frameWidth)
  .style('fill', 'white')
  .style('stroke', 'black')
  .style('stroke-width', frameWidth);

group.append('circle')
  .attr('r', 5)
  .style('fill', 'black');

const secondHand = group.append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 0)
  .attr('y2', -(radius - 30))
  .attr('stroke', 'red')
  .attr('stroke-width', 2);

const minuteHand = group.append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 0)
  .attr('y2', -(radius - 70))
  .attr('stroke', 'black')
  .attr('stroke-width', 3);

const hourHand = group.append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 0)
  .attr('y2', -(radius - 140))
  .attr('stroke', 'black')
  .attr('stroke-width', 3);

const currentTime = new Date();
let secondTracker = currentTime.getSeconds();
let minuteTracker = currentTime.getMinutes();
let hourTracker = currentTime.getHours();

const rotateMinutes = () => {
  const minutePosition = minuteTracker / 60 * 360;
  console.log(minutePosition)
  minuteHand.attr('transform', `rotate(${minutePosition})`);
};

const rotateHours = () => {
  const hourPosition = hourTracker / 12 * 360;
  hourHand.attr('transform', `rotate(${hourPosition})`)
}

const incrementSeconds = () => {
  secondTracker += 6;
  const secondPosition = secondTracker % 360;
  secondHand.attr('transform', `rotate(${secondPosition})`);

  console.log(secondTracker)
  if (secondPosition === 0 && secondTracker === 360) {
    minuteTracker += 1;
    rotateMinutes();
  }

  setTimeout(incrementSeconds, 100);
};

incrementSeconds();
rotateMinutes();
rotateHours();
