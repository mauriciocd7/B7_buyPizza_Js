let modalQtd = 1;

const c = (element)=>document.querySelector(element); //recebe o elemento e retorna o mesmo para a função. Objetivo e tornar código limpo.
const cs = (element)=>document.querySelectorAll(element); //retorna um array com os itens que ele achou.

pizzaJson.map((item, index)=>{ //mapear a lista utilizando uma arrow function recebendo 2 parâmetros.
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clone dos itens *cloneNode pega tudo que tem dentro dos itens (classes do html).


    //preencher as informações em pizzaItem
    pizzaItem.setAttribute('data-key', index); //chave da pizza específica - Aplica data-key as divs que compõe as informações de cada item
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; //atribuo o item do json ao src pizza item.  
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // toFixed- mostra as casas decimais | important, não são aspas simples, são ` para utilizar strings e atributos.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;     // recebe name que está no json e atribui a classe pizza-item--name.
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{ //seleciona tag a, recebe o evento
        e.preventDefault(); //cancela o default da ação
        
        //Modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); //cria variável e adiciona também no modal. | closest() - procura o elemento mais próximo | pega o atributo data-key
        modalQtd = 1; //atribui 1 ao abrir



        //preenche modal
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected'); //remove a classe selected para resetar ao clicar novamente
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){ //farre as classes e na opção grande (index == 2) atribui a tag selected 
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });  //querySelectorAll vai percorrer com foreach

        c('.pizzaInfo--qt').innerHTML = modalQtd;


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex'; //setado como none por padrão no css, altera pra flex quando clica
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200); // 200 equivale a 1/5 de segundos para fazer a animação do modal 
    });

    c('.pizza-area').append(pizzaItem); //append adiciona mais um conteúdo, assim como em estrutura de dados.
    


});