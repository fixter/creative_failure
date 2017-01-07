from flask import Flask, render_template, request, jsonify, make_response
import utils.EmailClient as EmailClient
from config.Config import configure_app
import uuid
import os

configure_app()


application = Flask(__name__)
app = application
app.debug = True
app.secret_key = uuid.uuid1() if os.getenv('ENV', 'TESTING') == 'PROD' else 'secret_key'


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
        json = request.get_json()

        def extract_data(key, data): return str(data[key]) if key in data else None
        first_name = extract_data('firstName', json)
        last_name = extract_data('lastName', json)
        form_email = extract_data('email', json)
        subject = extract_data('subject', json)
        body = extract_data('body', json)
        if None in [first_name, last_name, form_email, subject, body]:
            return jsonify(error='Missing parameter(s)')
        phone_number = extract_data('phoneNumber', json)
        email = EmailClient.EmailClient()
        status = email.send_email(email=form_email, body=body, subject=subject, phone_number=phone_number,
                                  first_name=first_name, last_name=last_name)
        if 200 <= status < 400:
            return jsonify(message='Email sent successfully.')
        else:
            return jsonify(error=email.msg)


@app.route('/')
def index():
    if 'partial' in request.args and request.args.get('partial'):
        return render_template('_index.html')
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
