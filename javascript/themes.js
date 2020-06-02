const btnTemas = document.getElementById('btn-temas');
const divTemas = document.querySelector('.temas');
let imgb = btnSearch.querySelector('img');
btnTemas.addEventListener('click', function() {
    divTemas.classList.toggle('show');
});

divTemas.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        if (e.target.id === 'dia') {
            document.body.className = '';
            document.getElementById('logo').src = 'img/gifOF_logo.png';
            
        } else if (e.target.id === 'noche') {
            document.body.className = 'dark';
            imgb.src = 'img/lupa_inactive.svg';
            document.getElementById('logo').src = 'img/gifOF_logo_dark.png';
                imgb.src = 'img/lupa.svg';
            btnSearch.classList.add('botbuscar');
            document.getElementById('search').addEventListener('focus', ev =>{
                ev.preventDefault();
                imgb.src = 'img/lupa_light.svg';
                   btnSearch.classList.add('btnSearch-dark');
            });
            document.getElementById('search').addEventListener('blur', ev =>{
                imgb.src = 'img/lupa_inactive.svg';
                btnSearch.setAttribute('class', 'botbuscar');
            });
        }
    }
});
