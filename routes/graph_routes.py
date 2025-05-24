from flask import Blueprint, render_template
from controllers.graph_controller import create_plot

graph_bp = Blueprint('graph_bp', __name__)

@graph_bp.route("/")
def home():
    plot_div = create_plot()
    return render_template("graph.html", plot_div=plot_div)