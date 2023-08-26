from todolist import app
from flask import render_template


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/monday')
def monday():
    return render_template('monday.html')


@app.route('/tuesday')
def tuesday():
    return render_template('tuesday.html')


@app.route('/wednesday')
def wednesday():
    return render_template('wednesday.html')


@app.route('/thursday')
def thursday():
    return render_template('thursday.html')


@app.route('/friday')
def friday():
    return render_template('friday.html')


@app.route('/saturday')
def saturday():
    return render_template('saturday.html')


@app.route('/sunday')
def sunday():
    return render_template('sunday.html')