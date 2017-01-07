# Creative Failure

This is a website for Creative Failure, a company owned by Ross Collier

===========================================================================

## Set up

- make sure you have python 2.7 and node set up on your computer
- You may have to run `sudo` on all these commands.
- do `git clone https://github.com/fixter/creative_failure.git` to download the repo
- I would recommend using either Pycharm or Intellij with the python plugin. This will make downloading all python libraries 
  very easy.
  If you don't use Pycharm or Intellij, download virtualenv, create a virtual environment, start the virtualenv,
  and then run `pip install -r requirements.txt`.
- then run `npm install` to download all node libraries
- If you don't have bower installed globally run `npm install -g bower`
- Once bower is installed run `bower install` to install foundation 


## Running the app locally

- Before you start the Flask server, you need to compile the sass and javascript. You do this by running `npm start`.
- If you are using Pycharm or Intellij, you can just run the server.py file from the IDE. If you're using something else
  then go to the command line and run `python server.py` and then go to http://localhost:5000
  
## SparkPost 
- Since this is a public repo, the Sparkpost API key is not included in the repo. By default it will set it to an empty string. 
  If you wish to add a SparkPost API Key to test, you can add a file called sparkpostkey.txt with the API KEY in it, or you can change
  the environment variable to something besides TESTING and add an environment variable called SPARKPOST_API_KEY.

## Development
- You need to checkout develop before you checkout landing-page
- You should make sure you are on the right branch before running `npm start` to avoid git conflicts when switching branches,
  and you should turn it off and on whenever you switch branches. 
  
- You should always make sure `npm start` is running when you make any changes to javascript or sass files.

## Git Branches
- Never develop on the Master branch or the Develop branch directly.
- I think there should be a branch for whatever you are working on. Switch to that branch before developing, and always push
  to that branch. Then you can do pull requests on github so we can do code review and resolve git conflicts.
  
### Existing branches and there purpose
- Master: the branch the production server looks at
- Develop: branched off of master. this branch is for the development server.
- landing-page: branched off of development. this branch is for developing the landing page. Any branches off of landing-page
  don't need to be documented because they should be the actual branches we work on.

