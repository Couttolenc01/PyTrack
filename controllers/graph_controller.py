import plotly.express as px
import plotly.io as pio

def create_plot():
    fig = px.bar(x=["A", "B", "C"], y=[10, 20, 30], title="Gráfica de ejemplo")
    return pio.to_html(fig, full_html=False)