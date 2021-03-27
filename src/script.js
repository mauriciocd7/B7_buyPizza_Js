pizzaJson.map((item, index)=>{ //mapear a lista utilizando uma arrow function recebendo 2 parâmetros.
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); //clone dos itens *cloneNode pega tudo que tem dentro dos itens (classes do html).

    //preencher as informações em pizzaItem
    document.querySelector('.pizza-area').append(pizzaItem); //*querySelector - clona | | append adiciona mais um conteúdo, assim como em estrutura de dados.
    


});