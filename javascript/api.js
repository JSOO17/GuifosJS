var APIKEY = 'rUMg6e7TiIFFYpG4eHXBl6WHbEEnUm55';
var m = 0;
//document.addEventListener('DOMContentLoaded', init);
function init() {
	sugerencias();
	tendencias();
	search();
	clickInput();
}


// fetch de sección de sugerencias

function sugerencias() {
	var topic = ["Light", "Dark", "Silence", "Noise"];	
	let url = 'https://api.giphy.com/v1/gifs/random?api_key=' + APIKEY + '&tag=';
	console.log(url);
	var sug = document.getElementById('container-sug');
	for (var i = 0; i < 4; i++) {
		url = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIKEY + '&limit=2&q=';
		url = url.concat(topic[i]);
		//var tituloSug = document.getElementsByClassName('titulosug');
		//var imgSug = document.getElementsByClassName('img-Sug');
		
		//tituloSug[i].innerText = '#' + topic[i];
		console.log(url);
		fetch(url)
		.then(response => response.json())
		.then(content => {
			console.log(content.data);
			let div = `<div class="imgsug">
                    <p class="titulosug">#${topic[m]}</p>
                    <img class="img-Sug" src="${content.data[0].images.downsized.url}" alt="${topic[m]}">
					<input type="hidden" value="${topic[m]}">
					<button onClick="verMas(this)">Ver más..</button>
                </div>`;
                sug.innerHTML += div;
                m++;
			//imgSug[m].src = content.data.images.downsized.url;
			//imgSug[m].alt = ;
			})
			.catch(err => {
				console.error(err);
			});
	}
}


// fetch de sección de tendencias

function tendencias() {
	let url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + APIKEY + '&limit=16';
	getFetch(url)
	.then(content => {
		console.log(content.data);
		let inputTende = document.getElementById('tendencias');
		inputTende.value = search.value;
		let imgTend = document.getElementById('container-tend');
		for (i = 0; i < content.data.length - 2; i++){
			let div = document.createElement('div');
			div.setAttribute('class', 'imgtend');
			let img = document.createElement('img');
			img.setAttribute('class', 'img-tend');
			img.setAttribute('src', content.data[i].images.downsized.url);
			
				if (i==5 || i==9) {
					div.classList.add('column2');
				}		
			let p = document.createElement('p');
			p.setAttribute('class', 'titletend');
			//div.setAttribute('onHover', 'hoverTendencias(this)');
			p.innerText = content.data[i].title;
			div.appendChild(img);
			div.appendChild(p);
			imgTend.appendChild(div);
		}
	})
	.catch(err => {
		console.error(err);
	})
}




// fetch de busqueda

function search() {
	//busqueda
	document.getElementById('btnSearch').addEventListener('click', ev => {
		let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIKEY + '&limit=16&q=';
		let search = document.getElementById('search');
		//buscados
		let busqueda = search.value;
		crearAzules(busqueda);
		document.getElementById('resultado').setAttribute('style', 'display: none;');
		
		let str = search.value.trim();
		url = url.concat(str);
		console.log(url);
		fetch(url)
			.then(response => response.json())
			.then(content => {
					console.log(content.data);
					console.log('META', content.meta);
					let imgSug = document.getElementsByClassName('img-tend');
					let tituloSug = document.getElementsByClassName('titletend');
					let inputTende = document.getElementById('tendencia');
					inputTende.value = search.value;
					search.value = '';

					m = 0;
					for (i = 0; i < 16; i++){
						imgSug[m].src = content.data[m].images.downsized.url;
						tituloSug[m].innerText = content.data[m].title;
						m++;
					}
					ev.returnValue = true;
			})
			.catch(err => {
				console.error(err);
			})
			document.getElementById('sugerencias').style = 'display:none';

	});
}

function crearAzules(search){
	if (search != "") {
		console.log('entro a azules');
		let buscados = document.getElementById('busqueda');
		let p = document.createElement('p');
		p.setAttribute('class', 'buscados');
		p.setAttribute('onClick', 'clickBuscados(this.textContent)');
		p.innerText = search;
		buscados.appendChild(p);
	}
}

// eventos de input de busqueda

function clickInput(){
	console.log('Estoy entrando');
	let desplegable = document.getElementById('resultado');
	let btnSearch = document.getElementById('btnSearch');
	let imgb = btnSearch.querySelector('img');
	document.getElementById('search').addEventListener('focus', ev =>{
		ev.preventDefault();
		imgb.src = 'img/lupa.svg';
		btnSearch.setAttribute('class', 'search-rosado');
		
	});
	document.getElementById('search').addEventListener('blur', ev =>{
		imgb.src = 'img/lupa_inactive.svg';
		btnSearch.setAttribute('class', '');
	});
	document.getElementById('search').addEventListener('keyup', ev =>{ 
		if (ev.target.value == '') {
			console.log('está vacío');
			desplegable.setAttribute('style', 'display: none;');
		}else{
			console.log('estoy escribiendo');
			desplegable.setAttribute('style', 'display: flex;');
			let url = 'https://api.giphy.com/v1/gifs/search/tags?api_key=' + APIKEY + '&q=' + ev.target.value;
			let botones = document.getElementsByClassName('resultados');
			fetch(url)
			.then(response => response.json())
			.then(content => {
			for (i = 0; i < 3; i++){
				botones[i].setAttribute('onClick', 'buscarBtn(this.textContent)');
				botones[i].textContent = content.data[i].name;
			}

			})
			.catch(err => {
				console.error(err);
			})
		}
	});

}

function clickBuscados(buscado){		
	let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIKEY + '&limit=16&q=' + buscado;
	getFetch(url)
		.then(content => {
			let imgSug = document.getElementsByClassName('img-tend');
			let tituloSug = document.getElementsByClassName('titletend');
			let inputTende = document.getElementById('tendencia');
			inputTende.value = buscado;
			m = 0;
			for (i = 0; i < 16; i++){
				imgSug[m].src = content.data[m].images.downsized.url;
				tituloSug[m].innerText = content.data[m].title;
				m++;
			}
		})
		.catch(err => {
				console.error(err);
		});
	document.getElementById('sugerencias').style = 'display:none';
}


// buscar con botones de sugerencia

function buscarBtn(busqueda){
	let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIKEY + '&limit=16&q=' + busqueda;
	getFetch(url)
		.then(content => {
			let imgSug = document.getElementsByClassName('img-tend');
			let tituloSug = document.getElementsByClassName('titletend');
			let inputTende = document.getElementById('tendencia');
			inputTende.value = busqueda;
			m = 0;
			for (i = 0; i < 16; i++){
				imgSug[m].src = content.data[m].images.downsized.url;
				tituloSug[m].innerText = content.data[m].title;
				m++;
			}
		})
		.catch(err => {
				console.error(err);
		});
	crearAzules(busqueda);
	desplegable = document.getElementById('resultado');
	desplegable.setAttribute('style', 'display: none;');
	document.getElementById('search').value = '';
	document.getElementById('sugerencias').style = 'display:none';
}



function verMas(button){

		console.log(button);
		console.log('entré al submit');
		
		var topico = button.parentNode.querySelector('input').value;
		let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIKEY + '&limit=16&q=' + topico;
		getFetch(url)
		.then(content => {
			let imgSug = document.getElementsByClassName('img-tend');
			let tituloSug = document.getElementsByClassName('titletend');
			let inputTende = document.getElementById('tendencia');
			inputTende.value = topico;
			
			for (var i = 0; i < 16; i++){
				imgSug[i].src = content.data[i].images.downsized.url;
				tituloSug[m].innerText = content.data[i].title;
				m++;
			}
		})
		.catch(err => {
				console.error(err);
		});

		document.getElementById('sugerencias').style = 'display:none';
}


document.getElementById('mine').addEventListener('click', misGuifos);

function misGuifos() {
	document.getElementById('sugerencias').style = 'display:none';
	document.getElementById('tendencias').style = 'display:none';
	document.querySelector('.search').style = 'display:none';
	for (let i = 0; i < localStorage.length; i++) {
  let alt = localStorage.key(i);
  let src = localStorage.getItem(localStorage.key(i));
  var sug = document.getElementById('container-misGuifos');
  document.getElementById('misguifos').style.display = "block";
  if (alt.substring(0, 3) === "GIF") {
    let div = `<div class="imgsug">
                    <img class="img-Sug" src="${src}" alt="${alt}">
                </div>`;
                sug.innerHTML += div;
  }
}
}

window.onLoad = init();

	

async function getFetch(url){
	let response = await fetch(url);
	let content = await response.json();
		

	return content;
			
}