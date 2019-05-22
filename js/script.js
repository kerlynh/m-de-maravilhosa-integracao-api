const caixa = document.querySelector('.maravilhosas__box');

fetch('https://theblackwomanhistory.firebaseio.com/.json')
.then(function(response){
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
        link.href = '#!';
        card.appendChild(link);

        //---- image -----
        const photo = document.createElement('img');
        photo.setAttribute('class', 'img-responsive');
        photo.setAttribute('alt', mulheres.title)

        if (mulheres.metadata == undefined || mulheres.metadata.image == undefined || mulheres.metadata.image.url == undefined) {
            photo.setAttribute('src', './img/img-mulher.png')
        } else {
            photo.setAttribute('src', mulheres.metadata.image.url);
        }

        card.appendChild(photo);
            
        //---- name -----
        const name = document.createElement('p');
        name.textContent = mulheres.title;
        card.appendChild(name);
        
    })   
})

.catch(function(erro){
    console.log(erro)
})

