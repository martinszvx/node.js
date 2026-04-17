const { log } = require('console');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let estoque = [];

function boasVindas() {
    console.log("====================");
    console.log(" Seja bem vindo!");
    console.log(" ERP NODE ");
    console.log("====================");
}

function menu() {
    console.log("====================");
    console.log("1. Consultar Estoque");
    console.log("2. Adicionar Item");
    console.log("3. Remover Item");
    console.log("0. Sair");
    console.log("====================");

    interagir();
}

function interagir() {
    rl.question("Escolha uma opção: ", function (resposta) {
        console.clear();

        switch (parseInt(resposta)) {
            case 1:
                consultarEstoque();
                break;
            case 2:
                adicionarItem();
                break;
            case 3:
                removerItem();
                break;
            case 0:
                rl.close();
                break;
            default:
                menu();
                break;
        }

    });
}

function consultarEstoque() {
    console.log("| ESTOQUE");
    console.table(estoque);

    menu();
}

function adicionarItem(itemNome, itemQuantidade) {
    console.log("| ADICIONAR ITEM");

    if (itemNome === undefined) {
        rl.question("Qual o nome do item?", function (nomeDoItem) {
            adicionarItem(nomeDoItem);
        });
        return;
    }

    if (itemQuantidade === undefined) {
        rl.question("Qual é a quantidade?", function (quantidadeDoItem) {
            const quantidade = parseInt(quantidadeDoItem);
            adicionarItem(itemNome, quantidade);
        });
        return;
    }

    if (isNaN(itemQuantidade)) {
        itemQuantidade = 0;
    }

    estoque.push({
        nome: itemNome,
        quantidade: itemQuantidade,
    });

    menu();
}

function removerItem(itemNome, itemQuantidade) {
    console.log("| REMOVER ITEM");

    if (itemNome === undefined) {
        rl.question("Qual o nome do item?", function (nomeDoItem) {
            removerItem(nomeDoItem);
        });
        return;
    }

    if (itemQuantidade === undefined) {
        rl.question("Qual a quantidade do item?", function (quantidadeDoItem) {
            removerItem(itemNome, quantidadeDoItem);
        });
        return;
    }

    const index = estoque.findIndex((item) => item.nome === itemNome);
    // => é a mesma coisa que
    // function(item){
    //     return item.nome === itemNome;

    if (!estoque[index]) {
        console.log("Índice inválido.");
        menu();
        return;
    }

    if (estoque[index].quantidade < itemQuantidade) {
        console.log("Quantidade inválida.");
        menu();
        return;
    }

    estoque[index].quantidade -= itemQuantidade;
    console.log("Item removido com sucesso!");

    menu();
}

function principal() {
    console.clear();
    boasVindas();
    menu();
}

principal();