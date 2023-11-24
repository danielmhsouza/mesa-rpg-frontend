from flask import Flask, request
from flask_cors import CORS
import json
import pymysql;

app = Flask(__name__)
CORS(app)

db = pymysql.connect(host='localhost', user='root', password='', database='rpg')

@app.route('/login', methods=["POST"])
def index():
    data = request.get_json()

    email = data.get('email')
    senha = data.get('pass')
    
    cursor = db.cursor()
    query = "SELECT * FROM user WHERE email = %s and password = %s"
    cursor.execute(query, (email, senha))
    user = cursor.fetchall()
    db.commit()
    
    if len(user) > 0:
        nuser = list(user)
        res = {"approved": "1", "id": nuser[0][0]}
        return json.dumps(res)
    return {"approved" : "0"}
    
          
@app.route('/user/<id>', methods=['GET'])
def user(id):
    cursor = db.cursor()
    query = "SELECT * FROM user WHERE id = %s"
    cursor.execute(query, (id))
    user = cursor.fetchall()
    db.commit()

    nuser = list(user)
    juser = {
         "name": nuser[0][1]
    }

    return json.dumps(juser)


@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    senha = data.get('pass')

    cursor = db.cursor()
    query = "SELECT * FROM user WHERE email = %s"
    cursor.execute(query, (email))
    res = cursor.fetchall()
    db.commit()

    if len(res) > 0:
        return {"approved": "0"}
    
    cursor = db.cursor()
    query = "INSERT INTO user (name, email, password) VALUES (%s, %s, %s)"
    cursor.execute(query, (name, email, senha))
    db.commit()
    return {"approved": "1"}



if __name__ == "__main__":
	app.run(debug=True)