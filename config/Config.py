import os


def configure_app():
    path = os.path.join(os.path.dirname(__file__), 'sparkpostkey.txt')
    if os.getenv('ENV', 'TESTING') == 'TESTING' and os.path.exists(path):
        sparkpost_file = open(path, 'r')
        os.environ['SPARKPOST_API_KEY'] = sparkpost_file.readline()
    else:
        os.environ['SPARKPOST_API_KEY'] = ''
