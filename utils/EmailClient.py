import sendgrid


class EmailClient:
    def __init__(self, api_key):
        self.sg = sendgrid.SendGridClient(api_key)
        self.message = ''
        self.status = ''
        self.msg = ''

    def create_email(self, email, body, subject, phone_number, first_name, last_name):
        message = sendgrid.Mail()
        # message.add_to('Ross Collier <ross.j.collier@gmail.com>')
        message.add_to('Ross Collier <collier.j.ross@gmail.com>')
        message.set_subject('Creative Failure - ' + subject)
        text_body = """This email is an inquiry for Ross Collier from www.creativefailure.com \n
        name: {0} {1} \n
        email: {2} \n
        phone number: {3} \n
        body: {4}""".format(first_name, last_name, email,
                            phone_number if phone_number is not None or phone_number == '' else 'N/A', body)
        html_body = """<p>This email is an inquiry for Ross Collier from www.creativefailure.com <br>
        <strong>name:</strong> {0} {1} <br>
        <strong>email:</strong> {2} <br>
        <strong>phone number:</strong> {3} <br>
        <strong>body:</strong> {4} </p>""".format(first_name, last_name, email,
                                                  phone_number if phone_number is not None or
                                                                  phone_number == '' else 'N/A', body)
        message.set_html(html_body)
        message.set_text(text_body)
        message.set_from('Creative Failure <noreply@creativefailure.com>')
        self.message = message

    def send_email(self):
        status, msg = self.sg.send(self.message)
        self.status = status
        self.msg = msg
        return status
