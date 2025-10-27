from src.app.routes.comment_routes import register_comment_routes
from src.app.routes.docs_routes import register_docs_routes
from src.app.routes.health_routes import register_health_routes
from src.app.routes.product_routes import register_product_routes

__all__ = [
    "register_comment_routes",
    "register_docs_routes",
    "register_health_routes",
    "register_product_routes",
]
