import os

# Put any configurations for server in here.
if os.getenv('ENV', 'TESTING') == 'TESTING':
    sendgridf = open('sengridapikey.txt', 'r')
    os.environ['SENDGRID_API_KEY'] = sendgridf.readline()

SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')

