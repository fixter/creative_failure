import os

# Put any configurations for server in here.
if os.getenv('ENV', 'TESTING') == 'TESTING':
    os.environ['SENDGRID_API_KEY'] = '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'

SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')