from flask import redirect
from flask_openapi3 import OpenAPI

app = OpenAPI(__name__)


@app.get("/")
def read_root():
    return redirect("/openapi/swagger#/")
