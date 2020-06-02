var APIKEY = 'rUMg6e7TiIFFYpG4eHXBl6WHbEEnUm55';
var container = document.getElementById('crearGif');
var p = container.querySelector('p');
var containerChild = container.querySelector('#child');
var containerButtons = container.querySelector('#botones-crear');
var comenzar = containerButtons.querySelector('#comenzar');
var cancelar = containerButtons.querySelector('#cancelar');

cancelar.addEventListener('click', ev =>{
  location.href= 'index.html';
});


var buttonCapturar = document.createElement('button');
buttonCapturar.classList.add('btn-rosado');
buttonCapturar.innerText = 'Capturar';
buttonCapturar.id = "capturar";
buttonCapturar.style.marginLeft = '0';

var buttonListo = document.createElement('button');
buttonListo.innerText = 'Listo';
buttonListo.id = "listo";
buttonListo.style.marginLeft = '0';

var buttonRepetir = document.createElement('button');
buttonRepetir.classList.add('btn-rosado');
buttonRepetir.classList.add('btn-blanco');
buttonRepetir.innerText = 'Repetir Captura';
buttonRepetir.id = "repetir";

var buttonSubir = document.createElement('button');
buttonSubir.classList.add('btn-rosado');
buttonSubir.innerText = 'Subir Guifo';
buttonSubir.id = "Subir";

var buttonCamera = document.createElement('button');
buttonCamera.classList.add('btn-rosado');
buttonCamera.classList.add('camera');
var imgCamera = document.createElement('img');
imgCamera.src = 'img/camera.svg';


var buttonCopiar = document.createElement('button');
buttonCopiar.classList.add('btn-rosado');
buttonCopiar.classList.add('btn-blanco');
buttonCopiar.innerText = 'Copiar Enlace Guifo';
buttonCopiar.id = "copiar";

var buttonDescargar = document.createElement('button');
buttonDescargar.classList.add('btn-rosado');
buttonDescargar.classList.add('btn-blanco');
buttonDescargar.innerText = 'Descargar Guifo';
buttonDescargar.id = "descargar";


//async function init() {
	//await pasoUno();
//}
comenzar.addEventListener('click', pasoUno);

function pasoUno() {
	//comenzar.addEventListener('click', ev =>{
    if(containerButtons.querySelectorAll('button').length != 0){
      for(let n = 0; n < containerButtons.querySelectorAll('button').length; n++){
         containerButtons.querySelectorAll('button')[n].style.display = "none";
      }
    }

		p.innerText = 'Un chequeo antes de empezar';
		containerChild.style.display = 'none';
		if (!document.getElementById('video')) {
			console.log('entro al if' + typeof(video)); 
			var video = document.createElement('video');
			video.id = 'video';
			container.replaceChild(video, containerChild);
			//container.appendChild(video);
			buttonCamera.appendChild(imgCamera);
      containerButtons.appendChild(buttonCamera);
			containerButtons.appendChild(buttonCapturar);
			navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					height: { max: 350 },
					width: { max: 500 }
				}
			})
			.then(function(stream) {
				video.srcObject = stream;
				video.play();

        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 280,
          hidden: 240,
                  
          onGifRecordingStarted: function() { 
            console.log('started')
          },
          });
			});
		}
		
//	});


	
}

buttonCapturar.addEventListener('click', pasoDos);

async function pasoDos() {
  p.innerText = 'Capturando tu Guifo';
  while ( containerButtons.childNodes.length >= 1 )
  {
    containerButtons.removeChild( containerButtons.firstChild );
  }
  buttonCamera.style.display = 'inline-block';
  containerButtons.appendChild(buttonCamera);
  buttonListo.style.display = 'inline-block';
  containerButtons.appendChild(buttonListo);
  console.log('entro a capturar');
  var img = containerButtons.querySelector('img');
  img.src = 'img/recording.svg';
  await buttonListo.classList.add('btn-rosado');
  await containerButtons.classList.add("botonRojo");
  await recorder.startRecording();
}

buttonListo.addEventListener('click', pasoTres);

function pasoTres() {
  p.innerText = 'Vista Previa';
  if(containerButtons.querySelectorAll('button').length != 0){
      for(let n = 0; n < containerButtons.querySelectorAll('button').length; n++){
         containerButtons.querySelectorAll('button')[n].style.display = "none";
      }
    }
  recorder.stopRecording();
    var blob = recorder.getBlob();
    var videoURL = window.URL.createObjectURL(blob);
    console.log(videoURL);
    var img = document.createElement("img");
    img.src = videoURL;
    container.removeChild(document.getElementById("video"));
    container.removeChild(document.getElementById("botones-crear"));
    let div = `<div id='gifCreado'>
                <img src='${videoURL}'>
              </div>`;
    container.innerHTML += (div);
    containerButtons.appendChild(buttonRepetir);
    containerButtons.appendChild(buttonSubir);
    container.appendChild(containerButtons);
    containerButtons.className = "";

}


buttonSubir.addEventListener('click', pasoCuatro);

buttonRepetir.addEventListener('click', ev =>{
  container.innerHTML =  '';
  /*if(container.querySelectorAll('div').length != 0){
    for(let n = 0; n < container.querySelectorAll('div').length; n++){
      container.querySelectorAll('div')[n].style.display = "none";
    }
  } */
while ( containerButtons.childNodes.length >= 1 )
{
containerButtons.removeChild( containerButtons.firstChild );
}
  buttonCamera.style.display = "inline-block";
  buttonCamera.querySelector('img').src = 'img/camera.svg';
  containerButtons.appendChild(buttonCamera);
  buttonCapturar.style.display = "inline-block"
  containerButtons.appendChild(buttonCapturar);

  container.appendChild(p);
  var video = document.createElement('video');
  video.id = 'video';
  navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          height: { max: 350 },
          width: { max: 500 }
        }
      })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();

        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 280,
          hidden: 240,
                  
          onGifRecordingStarted: function() { 
            console.log('started')
          },
          });
      });
  container.appendChild(video);
  container.appendChild(containerButtons);
});









//"&source_image_url=" + window.URL.createObjectURL(recorder.getBlob())

function pasoCuatro() {
  console.log('subir');
let form = new FormData();
form.append('file', recorder.getBlob(), 'myGif.gif');
let GIF_preview = URL.createObjectURL(recorder.getBlob());

fetch('https://upload.giphy.com/v1/gifs?api_key='+APIKEY, {
                    method: 'POST',
                    body: form,
                })
                .then(response => {
                    return response.json();
                })
                .then(info => {
                    GIF_id = info.data.id;
                    archivo(recorder.getBlob(), GIF_id);
                    p.innerText = 'Guifo Subido Con Éxito';
                    return (GIF_id);

                })
                .catch(function(err) {
                    console.error(err);
                });

while ( containerButtons.childNodes.length >= 1 ){
    containerButtons.removeChild( containerButtons.firstChild );
  }
container.removeChild(containerButtons);
document.getElementById('gifCreado').appendChild(containerButtons);
document.getElementById('gifCreado').classList.add('gifCreado');
containerButtons.classList.add("containerButtons");
buttonCopiar.setAttribute('onClick', 'copiar()');
let text = document.createElement('p');
text.className = "titulo-bold";
text.innerText = "Guifo creado con éxito";
let listo = document.createElement('a');
listo.href = "upload.html";
listo.className = "btn-rosado listo";
listo.innerText = "Listo";
buttonCopiar.setAttribute('onClick', 'location.reload()');
containerButtons.appendChild(text);
containerButtons.appendChild(buttonCopiar);
containerButtons.appendChild(buttonDescargar);
containerButtons.appendChild(listo);

}
function archivo(file, link) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    localStorage.setItem(("GIF" + link), reader.result);
  };
  reader.onerror = function() {
    console.log(reader.error);
  };
}

buttonDescargar.addEventListener('click', ev =>{
  invokeSaveAsDialog(recorder.getBlob());
});

function copiar() {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = "https://giphy.com/gifs/" + GIF_id;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}



for (let i = 0; i < localStorage.length; i++) {
  let alt = localStorage.key(i);
  let src = localStorage.getItem(localStorage.key(i));
  var sug = document.getElementById('container-sug');
  if (alt.substring(0, 3) === "GIF") {
    let div = `<div class="imgsug">
                    <img class="img-Sug" src="${src}" alt="${alt}">
                </div>`;
                sug.innerHTML += div;
  }
}

//window.onLoad = init();

/*

function pasoDos() {
  document.getElementById('capturar').addEventListener('click', ev =>{
    console.log('entro a capturar');
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(async function (strem) {
      recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function() {
            console.log('started');
        },
      }); 
      recorder.startRecording();

      const sleep = m => new Promise(r => setTimeout(r, m));
      await sleep(3000);

      recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
      });
    })
    .catch(err => {
      console.log(err);
    });
    
  });
  
}
*/