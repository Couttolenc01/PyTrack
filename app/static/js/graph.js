const graphDiv = document.getElementById('graph');
const cpkRange = document.getElementById('cpkRange');

// Create and style the floating value display
const valueBubble = document.createElement('div');
valueBubble.style.position = 'absolute';
valueBubble.style.background = '#4f46e5';
valueBubble.style.color = 'white';
valueBubble.style.padding = '2px 6px';
valueBubble.style.borderRadius = '4px';
valueBubble.style.fontSize = '12px';
valueBubble.style.transform = 'translate(-50%, -150%)';
valueBubble.style.whiteSpace = 'nowrap';
valueBubble.style.pointerEvents = 'none';
valueBubble.style.transition = 'left 0.05s ease';
valueBubble.style.zIndex = '10';
valueBubble.textContent = `$${cpkRange.value}`;

// Create wrapper and position relative
const wrapper = cpkRange.parentElement;
wrapper.style.position = 'relative';
wrapper.appendChild(valueBubble);

function generateData(cpk) {
  const x = ['01 Nov', '02 Nov', '03 Nov', '04 Nov', '05 Nov', '06 Nov', '07 Nov'];
  const base = 15000;
  const y = x.map((_, i) => base + Math.sin(i + cpk / 10) * 10000);
  return [{
    x,
    y,
    type: 'scatter',
    fill: 'tozeroy',
    line: { color: 'rgba(88, 80, 236, 1)', width: 3 }
  }];
}

function drawGraph(cpk) {
  Plotly.react(graphDiv, generateData(cpk), {
    title: '',
    margin: { t: 10 },
    xaxis: { title: '', showgrid: false },
    yaxis: { title: '', gridcolor: '#e5e7eb' },
    paper_bgcolor: 'white',
    plot_bgcolor: 'white'
  });
}

function updateSliderBubble() {
  const rangeWidth = cpkRange.offsetWidth;
  const min = parseFloat(cpkRange.min);
  const max = parseFloat(cpkRange.max);
  const value = parseFloat(cpkRange.value);
  const percent = (value - min) / (max - min);
  const bubbleX = percent * rangeWidth;

  valueBubble.textContent = `$${value}`;
  valueBubble.style.left = `${bubbleX}px`;
}

cpkRange.addEventListener('input', () => {
  updateSliderBubble();
  drawGraph(cpkRange.value);
});

updateSliderBubble();
drawGraph(cpkRange.value);