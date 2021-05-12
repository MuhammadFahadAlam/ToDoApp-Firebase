/* 
<div class='item'>
	<input type='text' disabled />
	<button onclick='edit(this)'>Edit</button>
	<button onclick='deleteI(this)'>Delete</button>
</div>; 
*/


firebase.database().ref('ToDo').on('child_added', function(data){
	
	let list = document.getElementById('list');

	let item = document.createElement('div');
	item.classList.add('item');

	input = document.createElement('input');
	input.value = data.val().value;
	input.setAttribute('type', 'text');
	input.setAttribute('id', data.val().key);
	input.disabled = true;

	editBut = document.createElement('button');
	editText = document.createTextNode('Edit');
	editBut.appendChild(editText);
	editBut.setAttribute('onclick', 'edit(this)');

	deleteBut = document.createElement('button');
	deleteText = document.createTextNode('Delete');
	deleteBut.appendChild(deleteText);
	deleteBut.setAttribute('onclick', 'deleteI(this)');

	item.appendChild(input);
	item.appendChild(editBut);
	item.appendChild(deleteBut);

	list.appendChild(item);
})


function add(e) {
	let element = e.parentNode.childNodes[1];
	let value = element.value;

	element.value = '';

	let key = firebase.database().ref('ToDo').push().key;

	let ToDo = {
		key: key,
		value: value,
	};

	firebase
		.database()
		.ref('ToDo/' + key)
		.set(ToDo);
}

function edit(e) {
	let parent = e.parentNode;
	let element = parent.childNodes[0];
	if (element.disabled) {
		element.disabled = false;
	} else {
		let value = element.value;
		let id = element.getAttribute('id');
		
		let ToDo = {
			key: id,
			value: value,
		};
		firebase
			.database()
			.ref('ToDo/' + id)
			.set(ToDo);
		element.disabled = true;
	}
}

function deleteI(e) {
	let parent = e.parentNode;
	let element = parent.childNodes[0];
	let id = element.getAttribute('id');
	firebase
		.database()
		.ref('ToDo/' + id)
		.remove();
	parent.remove();
}

function deleteAll() {
	let list = document.getElementById('list');
	firebase.database().ref('ToDo').remove();
	list.innerHTML = '';
}
