import { select, input, confirm } from '@inquirer/prompts';

let itensconsulta = [];

async function menu() {
    console.log("===============================");
    const opcao = await select({
        message: 'Escolha uma opção: ',
        choices: [
            { name: 'Consultar Lista', value: 1 },
            { name: 'Adicionar Item', value: 2 },
            { name: 'Remover Item', value: 3 },
            { name: 'Sair da lista', value: 0 },
        ]
    });

    console.clear();
    switch (opcao) {
        case 1:
            await consultar();
            break;
        case 2:
            await adicionar();
            break;
        case 3:
            await remover();
            break;
        case 0:
            console.log("Saindo...");
            process.exit();
    }
    // Chama o menu novamente após a ação terminar
    await menu();
}

async function consultar() {
    console.log("===============================\nLista de Itens: \n===============================");
    if (itensconsulta.length === 0) {
        console.log("A lista está vazia.");
    } else {
        console.table(itensconsulta.map((t, i) => ({ 
            ID: i, 
            Tarefa: t.Item, 
        })));
    }
}

async function adicionar() {
    const nomeDoItem = await input({ message: "Qual o nome do item? (Deixe vazio para cancelar)" });
    
    if (nomeDoItem.trim() === '') {
        console.log('\nNenhum item foi adicionado.');
    } else {
        itensconsulta.push({ Item: nomeDoItem, concluida: false });
        console.log(`\nItem "${nomeDoItem}" adicionado!`);
    }
}

async function remover() {
    if (itensconsulta.length === 0) {
        console.log("Nada para remover. A lista está vazia.");
        return;
    }

    // console.table(itensconsulta.map((t, i) => ({ ID: i, Tarefa: t.Item })));
    
    const ID = await select({ message: "Selecione o item que deseja remover:", choices: itensconsulta.map((Item) => ({name: Item.Item, value: Item.ID})) });
    const i = itensconsulta.findIndex((Item) => Item.ID === ID);

    if (isNaN(i) || !itensconsulta[i]) {
        console.log("\nÍndice inválido.");
    } else {
        const removido = itensconsulta.splice(i, 1);
        console.log(`\nItem "${removido[0].Item}" removido!`);
    }
}

async function main() {
    console.clear();
    console.log("===============================\nBem Vindo a Lista de Produtos!");
    await menu();
}

main();
