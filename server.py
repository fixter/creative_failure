from flask import Flask, render_template, request, jsonify, make_response


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


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'GET':
        if 'partial' in request.args and request.args.get('partial'):
            return render_template('_contact-form.html')
        return render_template('contact-form.html')
    elif request.method == 'POST':
        # put in email sender.
        response = make_response()
        response.status_code = 200
        return response


@app.route('/')
def index():
    if 'partial' in request.args and request.args.get('partial'):
        return render_template('_index.html')
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
