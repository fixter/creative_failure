import os


def configure_app():
    if os.getenv('ENV', 'TESTING') == 'TESTING':
        sparkpost_file = open(os.path.join(os.path.dirname(__file__), 'sparkpostkey.txt'), 'r')
        os.environ['SPARKPOST_API_KEY'] = sparkpost_file.readline()
