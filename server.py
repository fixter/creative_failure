from flask import Flask, render_template, request


application = Flask(__name__)
app = application
app.debug = True
app.secret_key = 'Add secret key in a config file.'


@app.route('/audio')
def audio():
    if 'partial' in request.args and request.args.get('partial'):
        return render_template('_audio.html')
    return render_template('audio.html')


@app.route('/design')
def design():
    if 'partial' in request.args and request.args.get('partial'):
        return render_template('_design.html')
    return render_template('design.html')


@app.route('/')
def index():
    if 'partial' in request.args and request.args.get('partial'):
        return render_template('_index.html')
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
