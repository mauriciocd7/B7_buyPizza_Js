const c = {element}=>document.querySelector(element); //recebe o elemento e retorna o mesmo para a função. Objetivo e tornar código limpo.
const cs = {element}=>document.querySelectorAll(element); //retorna um array com os itens que ele achou.

pizzaJson.map((item, index)=>{ //mapear a lista utilizando uma arrow function recebendo 2 parâmetros.
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clone dos itens *cloneNode pega tudo que tem dentro dos itens (classes do html).

    //preencher as informações em pizzaItem
    c('.pizza-area').append(pizzaItem); //*querySelector - clona | | append adiciona mais um conteúdo, assim como em estrutura de dados.
    
});