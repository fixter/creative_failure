/**
 * Created by rayde on 1/12/2016.
 */

window.React = require('react');
var ReactDom = require('react-dom');
var HelloWorldApp = require('./components/HelloWorld.react');

//HelloWorldApp Component should be deleted. It is here just to make sure things work.
ReactDom.render(<HelloWorldApp/>, document.getElementById('react-container'));

