from flask import Flask, render_template


application = Flask(__name__)
app = application
app.debug = True
app.secret_key = 'Add secret key in a config file.'


@app.route('/audio')
def audio():
    return render_template('audio.html')


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
