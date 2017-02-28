class Client {

	
	
	findAll(callback){
		var request = new Request('/notes', {
			headers: new Headers ({
				'Accept': 'application/json'
			})
		});
		
		fetch(request, {
			method: 'GET'
		}).then(function(response) {
			return response.json();
		}).then(callback).catch(function(err) {
			console.log(err)
		});
			
	}
	
	find(id, callback){	
		var request = new Request('/notes/' + id, {
			headers: new Headers ({
				'Accept': 'application/json'
			})
		});
		
		fetch(request, {
			method: 'GET'
		}).then(function(response) {
			return response.json();
		}).then(callback).catch(function(err) {
			console.log(err)
		});
	}
	
	create(note){	
		var request = new Request('http://localhost:4000/notes/', {	
		});
		
		
		fetch(request, {
			headers:{'Content-Type':'application/json'},
			method: 'POST',
			body: JSON.stringify(note)
		}).then(function(response) {
			return response.json();
		}).catch(function(err) {
			console.log(err)
		});
	}
	
	remove(id, callback){	
		var request = new Request('/notes/' + id, {	
		});
		
		
		fetch(request, {
			method: 'DELETE'
		}).then(callback).catch(function(err) {
			console.log(err)
		});
	}

}

export default Client
