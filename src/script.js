const c = (element)=>document.querySelector(element); //recebe o elemento e retorna o mesmo para a função. Objetivo e tornar código limpo.
const cs = (element)=>document.querySelectorAll(element); //retorna um array com os itens que ele achou.

pizzaJson.map((item, index)=>{ //mapear a lista utilizando uma arrow function recebendo 2 parâmetros.
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clone dos itens *cloneNode pega tudo que tem dentro dos itens (classes do html).

    //preencher as informações em pizzaItem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; //atribuo o item do json ao src pizza item.  
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // toFixed- mostra as casas decimais | important, não são aspas simples, são ` para utilizar strings e atributos.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;     // recebe name que está no json e atribui a classe pizza-item--name.
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;


    pizzaItem.querySelector('a').addEventListener('click', (e)=>{ //seleciona tag a, recebe o evento
        e.preventDefault(); //cancela o default da ação

        console.log("Clicou na pizza");
    });
    

    c('.pizza-area').append(pizzaItem); //*querySelector - clona | | append adiciona mais um conteúdo, assim como em estrutura de dados.
    


});