import { input, select } from '@inquirer/prompts';


const tarefas = [];

async function consultarTarefas() {
    console.table(tarefas)

    menu()
}

async function adicionarTarefa() {
    const titulo = await input({ message: "Título: "});
    tarefas.push({ titulo })

    menu()
}

async function menu () {
    console.log('1. Consultar Tarefas')
    console.log('2. Adicionar Tarefa')
    const opcao = await select({
        message: 'O que deseja fazer?',
        choices: [
            { name: 'Consultar Tarefas', value: 1 },
            { name: 'Adicionar Tarefa', value: 2 },
        ]
    });
    
    switch(opcao) {
        case 1:
            consultarTarefas();
            break;
        case 2:
            adicionarTarefa();
            break;
    }
}

menu();
