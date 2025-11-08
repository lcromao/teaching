from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.templating import _TemplateResponse

app = FastAPI()
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request) -> _TemplateResponse:
    # return {"Hello": "World"}
    return templates.TemplateResponse("client.html", {"request": request})


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}
