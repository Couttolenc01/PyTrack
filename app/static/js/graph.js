const graphDiv = document.getElementById('graph');
const cpkRange = document.getElementById('cpkRange');

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
  Plotly.newPlot(graphDiv, generateData(cpk), {
    title: '',
    margin: { t: 10 },
    xaxis: { title: '', showgrid: false },
    yaxis: { title: '', gridcolor: '#e5e7eb' },
    paper_bgcolor: 'white',
    plot_bgcolor: 'white'
  });
}

drawGraph(cpkRange.value);

cpkRange.addEventListener('input', () => {
  drawGraph(cpkRange.value);
});