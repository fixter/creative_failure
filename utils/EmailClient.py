import sparkpost


class EmailClient:
    def __init__(self):
        self.sp = sparkpost.SparkPost()
        self.msg = ''
        self.response = ''

    def send_email(self, email, body, subject, phone_number, first_name, last_name):
        html_body = """<p>This email is an inquiry for Ross Collier from www.creativefailure.com <br>
        <strong>name:</strong> {0} {1} <br>
        <strong>email:</strong> {2} <br>
        <strong>phone number:</strong> {3} <br>
        <strong>body:</strong> {4} </p>""".format(first_name, last_name, email,
                                                  phone_number if phone_number is not None or phone_number == '' else
                                                  'N/A', body)
        text_body = """This email is an inquiry for Ross Collier from www.creativefailure.com \n
        name: {0} {1} \n
        email: {2} \n
        phone number: {3} \n
        body: {4}""".format(first_name, last_name, email,
                            phone_number if phone_number is not None or phone_number == '' else 'N/A', body)

        response = self.sp.transmissions.send(
                recipients=[{
                    'address': {
                        'email': 'collier.j.ross@gmail.com',
                        'name': 'Ross Collier'
                    }
                }],
                html=html_body,
                text=text_body,
                from_email='Creative Failure <noreply@sparkpostbox.com>',
                subject='Creative Failure - ' + subject)
        self.response = response
        status = 200 if response['total_rejected_recipients'] == 0 else 500
        if 200 > status >= 400:
            self.msg = 'Email did not end successfully for all recipients'
        return status
