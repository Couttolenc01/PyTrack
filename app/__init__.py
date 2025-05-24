from flask import Flask
from routes.graph_routes import graph_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(graph_bp)
    return app