/* menu interativo onde 
lista tarefas
adicionar tarefa
concluir tarefa(dentro de listar)
remover tarefa
sair
*/

const readline = require('readline');

let itensconsulta = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function menu(){
    console.log("===============================")
    console.log("1 - Consultar Lista");
    console.log("2 - Adicionar Item");
    console.log("3 - Remover Item");
    console.log("0 - Sair da lista");
    console.log("===============================")

    interagir()
}

function interagir(){
    rl.question("Escolha uma opção: ", function (resposta){
        console.clear();
        switch(parseInt(resposta)){
            case 1:
                consultar();
                rl.question("\nPressione Enter para voltar ao menu...", () => {
                    console.clear();
                    menu();
                });
                break;
            case 2:
                consultar()
                adicionar();
                break;
            case 3:
                remover();
                break;
            case 0:
                console.log("Saindo...")
                rl.close();
                break;
            default:
                menu();
                break;
        }
    })
}

function consultar(){
    console.log("===============================\nLista de Itens: \n===============================");
    if(itensconsulta.length == 0){
        console.log("A lista está vazia.");
    }
    else {
        console.table(itensconsulta);
    }   
}

function adicionar() {
    console.log("\nTecle ENTER se não quiser adicionar...");
    rl.question("Qual o nome do item? ", function (nomeDoItem) {
        if(nomeDoItem === ''){
            rl.question('\nNenhum item foi adicionado.\nTecle Enter para continuar...', () => {
            console.clear();
            menu();
        });
        }
        else{
            itensconsulta.push({ "Item": nomeDoItem });
        
            rl.question('\nAdicionado com sucesso!\nTecle Enter para continuar...', () => {
                console.clear();
                menu();
            });
        }  
    });
}


function remover() {
    if (itensconsulta.length === 0) {
        console.log("Nada para remover. A lista está vazia.");
        menu();
        return;
    }
    consultar();

    rl.question("Digite o índice (index) do item que deseja remover: ", function (index) {
        const i = parseInt(index);

        if (isNaN(i) || !itensconsulta[i]) {
            console.log("\nÍndice inválido.");
        } else {
            const removido = itensconsulta.splice(i, 1);
            console.log(`\nItem "${removido[0].Item}" removido!`);
        }

        rl.question('\nTecle Enter para continuar...', () => {
            console.clear();
            menu();
        });
    });
}

function main(){
    console.clear();
    console.log("===============================\nBem Vindo a Lista de Produtos!");
    menu();
}

main();