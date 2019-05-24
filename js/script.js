//----- GET ---------
const caixa = document.querySelector('.maravilhosas__box');

fetch('http://localhost:5001/maravilhosas')
.then((response) => {
    return response.json();
})

.then(function(data){
    console.log("SUCESSO!!")
    console.log(data)
    data.content.forEach(mulheres => {

        //---- div -----
        const card = document.createElement('div');
        card.setAttribute('class', 'maravilhosas__perfil');
        caixa.appendChild(card);

        const link = document.createElement('a');
        link.href = '#';
        card.appendChild(link);

        //---- image -----
        const photo = document.createElement('img');
        photo.setAttribute('class', 'img-responsive');
        photo.setAttribute('alt', mulheres.title)

        if (mulheres.metadata == undefined || mulheres.metadata.image == undefined || mulheres.metadata.image.url == undefined) {
            photo.setAttribute('src', './img/img-mulher.png');
        } else {
            photo.setAttribute('src', mulheres.metadata.image.url);
        }

        card.appendChild(photo);
            
        //---- name -----
        const name = document.createElement('p');
        name.textContent = mulheres.title;
        card.appendChild(name);

        //----- GET ---------
        const buttonDel = document.createElement('button');
        buttonDel.setAttribute('data-id', mulheres.id);
        buttonDel.textContent = 'REMOVE';
        card.appendChild(buttonDel);

            buttonDel.addEventListener('click', () => {
                const thisCard = buttonDel.parentElement;
                const cardPai = thisCard.parentElement;

                fetch(`http://localhost:5001/maravilhosas/${mulheres.id}`,{
                    method: 'DELETE',
                    head:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'id': buttonDel.getAttribute('data-id'),
                    })
                })

                .then(() => {
                    cardPai.removeChild(thisCard);
                })
                .catch((erro) => {
                    console.log(erro)
                })
            })
    })   
})

.catch(function(erro) {
    console.log(erro);
})

// //----- POST ---------
const botao = document.getElementById('botao')
botao.addEventListener('click', (evento) => {
    evento.preventDefault();

    const nomePost = document.querySelector('.nome').value;
    const pictureUrl = document.querySelector('.picture').value;
  
fetch('http://localhost:5001/maravilhosas', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'title': nomePost,
        'metadata':{
           'image':{
             'url': pictureUrl
            },
        }
    })
})
.then((res) => res.json())
.then((data) =>  console.log(data))
.catch((err)=>console.log(err))
})