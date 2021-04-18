let cart = []; //carrinho de compras
let modalQtd = 1;
let modalKey = 0;


const c = (element) => document.querySelector(element); //recebe o elemento e retorna o mesmo para a função. Objetivo e tornar código limpo.
const cs = (element) => document.querySelectorAll(element); //retorna um array com os itens que ele achou.

pizzaJson.map((item, index) => { //mapear a lista utilizando uma arrow function recebendo 2 parâmetros.
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clone dos itens *cloneNode pega tudo que tem dentro dos itens (classes do html).


    //listagem das pizzas 
    pizzaItem.setAttribute('data-key', index); //chave da pizza específica - Aplica data-key as divs que compõe as informações de cada item
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; //atribuo o item do json ao src pizza item.  
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // toFixed- mostra as casas decimais | important, não são aspas simples, são ` para utilizar strings e atributos.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;     // recebe name que está no json e atribui a classe pizza-item--name.
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    //evento de clique para abrir o modal
    pizzaItem.querySelector('a').addEventListener('click', (e) => { //seleciona tag a, recebe o evento
        e.preventDefault(); //cancela o default da ação

        let key = e.target.closest('.pizza-item').getAttribute('data-key'); //cria variável e adiciona também no modal. | closest() - procura o elemento mais próximo | pega o atributo data-key
        modalQtd = 1; //atribui 1 ao abrir
        modalKey = key;



        //preenche modal
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected'); //remove a classe selected para resetar ao clicar novamente
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) { //farre as classes e na opção grande (index == 2) atribui a tag selected 
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });                                                                                 //querySelectorAll vai percorrer com foreach
        c('.pizzaInfo--qt').innerHTML = modalQtd;
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex'; //setado como none por padrão no css, altera pra flex quando clica
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200); // 1/5 segundos
    });

    c('.pizza-area').append(pizzaItem); //append adiciona mais um conteúdo, assim como em estrutura de dados.


});


// Eventos do modal

function closeModal(){ 
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500); // 1/2 segundos
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
}); //gerou um array com dois botões para cada um executa o closeModal quando clica 

//Botões do modal
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{  //()=> refere-se a função no evento click
    if(modalQtd > 1){ //condição simples
        modalQtd--; 
        c('.pizzaInfo--qt').innerHTML = modalQtd;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{  //()=> refere-se a função no evento click
    modalQtd++; 
    c('.pizzaInfo--qt').innerHTML = modalQtd;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
   size.addEventListener('click', ()=>{
    c('.pizzaInfo--size.selected').classList.remove('selected'); //limpa o selecionado
    size.classList.add('selected'); //selecina o proprio item que se clica.
   });
});   

c('.pizzaInfo--addButton').addEventListener('click', ()=>{ //carrinho de compras botão adicionar 
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key')); //pega o item data-key transforma em inteiro

    let identifier = pizzaJson[modalKey].id+'@'+size; //cria identificador para comparar os itens com o mesmo identifier

    let key = cart.findIndex((item)=>item.identifier == identifier);  //verifica se o item é igual

    if(key > -1){ // achou item
        cart[key].qtd += modalQtd; //muda a quantidade
    } else{ //não achou 
        cart.push({ //push - Add arrays
            identifier,
            id:pizzaJson[modalKey].id,
            size: size,
            qtd: modalQtd
        }); 
    }

    updateCart(); //atualiza o carrinho
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=>{ //evento de clique no carrinho mobile
    if(cart.length > 0){
        c('aside').style.left = '0vw'; //seta o style css em 0 para mostrar o carrinho 
    }
})

c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});

function updateCart(){

    c('.menu-openner span').innerHTML = cart.length; //mobile

    if(cart.length > 0){ //verifica se tem item no carrinho
        c('aside').classList.add('show'); 
        c('.cart').innerHTML = ''; 

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){ 

            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id); //retorna os itens do carrinho no json 

            subtotal += pizzaItem.price * cart[i].qtd; //calcula subtotal

            let cartItem = c('.models .cart--item').cloneNode(true); //clona o item
            let pizzaSizeName;
            
            switch(cart[i].size){ // switch case para atribuir letras a variável criada mostrando ao usuário
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1: 
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;    
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;  //template string para adicionar o tipo da pizza junto ao nome 

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qtd > 1){
                    cart[i].qtd--;
                }else{
                    cart.splice(i, 1);  //remove item quando 1 e clica no botão menos
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qtd++; //adiciona o item específico pelo for
                updateCart(); //atualiza o visual
            });
            
            c('.cart').append(cartItem); //adiciona o item
        }

        desconto = subtotal * 0.1; 
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`; //dois digitos 
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else{
        c('aside').classList.remove('show'); 
        c('aside').style.left = '100vw';
    }
}