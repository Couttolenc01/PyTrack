const graphDiv = document.getElementById('graph');
const cpkRange = document.getElementById('cpkRange');
const monthSelect = document.getElementById('monthSelect');
const profitInput = document.getElementById('profitInput');

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
  const selectedMonth = monthSelect.value;

  const monthDaysMap = {
    Enero: 31, Febrero: 28, Marzo: 31, Abril: 30, Mayo: 31, Junio: 30,
    Julio: 31, Agosto: 31, Septiembre: 30, Octubre: 31, Noviembre: 30, Diciembre: 31
  };

  const monthBaseProfit = {
    Enero: 95000, Febrero: 88000, Marzo: 92000, Abril: 100000,
    Mayo: 105000, Junio: 97000, Julio: 99000, Agosto: 94000,
    Septiembre: 98000, Octubre: 97000, Noviembre: 96000, Diciembre: 110000
  };

  const numDays = monthDaysMap[selectedMonth] || 30;
  const days = Array.from({ length: numDays }, (_, i) => `${(i + 1).toString().padStart(2, '0')} ${selectedMonth}`);
  const baseProfit = parseFloat(profitInput.value) || monthBaseProfit[selectedMonth] || 100000;

  // Penalización realista y no lineal según el CPK
  const cpkValue = parseFloat(cpk);
  const cpkPenalty = Math.exp((cpkValue - 10) / 15) - 1; // penaliza más fuerte si CPK sube
  const adjustedProfit = Math.max(baseProfit - cpkPenalty * 8000, 0);

  const y = days.map((_, i) => {
    const dailyFluctuation = Math.sin(i / 5 + cpkValue / 10) * 2000;
    return (adjustedProfit / numDays) + dailyFluctuation;
  });

  const baseDailyProfit = baseProfit / numDays;
  const colors = y.map(v => v >= baseDailyProfit ? 'green' : 'red');
  const text = y.map((v, i) => `${days[i]}: $${v.toFixed(2)}`);

  return [{
    x: days,
    y,
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: colors, size: 6 },
    line: { color: 'rgba(0,0,0,0)', width: 2 },
    fill: 'tozeroy',
    fillcolor: 'rgba(99, 102, 241, 0.3)',
    hoverinfo: 'text',
    text: text
  }];
}

function drawGraph(cpk) {
  Plotly.react(graphDiv, generateData(cpk), {
    title: '',
    margin: { t: 10 },
    xaxis: { title: 'Día del mes', showgrid: false, type: 'category' },
    yaxis: { title: 'Ganancia en pesos mexicanos ($)', gridcolor: '#e5e7eb' },
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

monthSelect.addEventListener('change', () => {
  drawGraph(cpkRange.value);
});

profitInput.addEventListener('input', () => {
  drawGraph(cpkRange.value);
});

updateSliderBubble();
drawGraph(cpkRange.value);