from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/')
def index():
    res = {"nome": "Daniel", "idade": 23}
    return json.dumps(res)


if __name__ == "__main__":
	app.run(debug=True)