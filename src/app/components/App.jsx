import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Link } from 'react-router' ;

import configure from './store';

import client from './client';

require('bootstrap/dist/css/bootstrap.css');

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);

class List extends Component {

	constructor(props){
		super(props);
		this.delete = this.delete.bind(this);
		this.state = {notes:[]};
		this.client = new client(); 
		const that = this ; 
		this.client.findAll(function (notes){
			that.setState({notes:notes});
		}) ;
		console.log("delete : " + this.delete);
	}
	
	delete(event){
		
		console.log("event delete");
		
		console.log("value : " + event.target.value);
		const that = this ; 
		var id = event.target.value ;
		var callback = function (response) {
			let notes = [];
			this.state.notes.map(function(note) {
				if (note.id != id) {
					notes.push(note);
				}
			});
			this.setState({notes:notes});
		}
		callback = callback.bind(this);
		this.client.remove(event.target.value, callback);
		
	}
	
	render() {
		var each = function(note) {
			return (<li key={note.id} className="list-group-item"><Link to={'/' + note.id} >{note.content}</Link><button value={note.id} onClick={this.delete} >Delete </button></li>)
		}
		each = each.bind(this);
		
		var that = this;
		console.log(this.state);
		var notes = this.state.notes;
		return (<div className="container">	
			<h3>Liste des notes</h3>
			<hr/>
			<div className="row">
			<div className="col-sm-4">	
				<ul className="list-group">
				{notes.map(each)}
				</ul>
			</div>
			</div>
			<br/>
			<button className="btn btn-success">Ajouter une nouvelle note</button>
				</div>
		);	
	}
	
};

class Details extends Component {

	constructor(props){
		super(props);
		console.log(props.params.splat);
		this.state = {note:[]};
		const c = new client(); 
		const that = this ; 
		c.find(props.params.splat, function (note){
			that.setState({note:note});
		}) ;
	}
	
	render() {
		console.log(this.state);
		var note = this.state.note;
		
		return (<div className="container">
			<h3>Consulter une note</h3>
			<hr/>
			<div className="row">
			<div className="col-sm-6">
			<div className="panel panel-default">
			<div className="panel-heading">
				<h3 className="panel-title"> {note.title} </h3>
			</div>
			<div className="panel-body">
				{note.content}
			</div>
			</div>
			</div>
			</div>
			<br/>
			<span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> {note.id}
			<br/>
			<br/>
			<Link to={'/'}><span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Retour </Link>		
			</div>
			)
	}
	
};



class Create extends Component {

	constructor(props){
		super(props);
		this.state = {}; 
		
		this.titleChange = this.titleChange.bind(this);
		this.contentChange = this.contentChange.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	titleChange(event) {
		this.setState({title: event.target.value});
	}
	
	contentChange(event) {
		this.setState({content: event.target.value});
	}
	
	submit(event) {
	
		event.preventDefault();
		var note = {
			title: this.state.title,
			content: this.state.content
		}
		
		console.log(note);
		const c = new client(); 
		c.create(note);
	}
	
	render() {
		return <form onSubmit={this.submit}>
			<label> Title
				<input type="text" value={this.state.title} onChange={this.titleChange} />
			</label>
			<label> Content
				<input type="text" value={this.state.content} onChange={this.contentChange} />
			</label>
			<input type="submit" value="Submit"/>
			</form>
	}
	
};



export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/new" component={Create}>
                    </Route>
                    <Route path="/" component={List}>
                    </Route>
                    <Route path="/*" component={Details}>
                    </Route>
                </Router>
            </Provider>
        );
    }
};
