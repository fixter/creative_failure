from flask import Flask, render_template


app = Flask(__name__)
app.debug = True
app.secret_key = 'Add secret key in a config file.'


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
