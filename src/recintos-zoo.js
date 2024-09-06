class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        // Lista de recintos do zoológico
        const recintos = [
            {numero:1, bioma:['savana'], tamanhoTotal: 10, animais: [{tipo: 'macaco', quantidade: 3}]},
            {numero:2, bioma:['floresta'], tamanhoTotal: 5, animais: []},
            {numero:3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{tipo: 'gazela', quantidade: 1}]},
            {numero:4, bioma: ['rio'], tamanhoTotal: 8, animais:[]},
            {numero:5, bioma: ['savana'], tamanhoTotal:9, animais: [{tipo: 'leao', quantidade: 1}]}
        ];

        // Lista de animais válidos com suas informações
        const animaisValidos = {
            leao: {tamanho:3, bioma:['savana'], carnivoro: true},
            leopardo: {tamanho: 2, bioma: ['savana'], carnivoro: true},
            crocodilo:{tamanho:3, bioma:['rio'], carnivoro: true},
            macaco:{tamanho:1, bioma:['savana', 'floresta'], carnivoro: false},
            gazela: {tamanho: 2, bioma:['savana'], carnivoro: false},
            hipopotamo: {tamanho:4, bioma:['savana', 'rio'], carnivoro: false}
        };

        //Verifica se o animal é válido

        if(!animaisValidos[animal]){
            return {erro:"Animal inválido"};
        }

        //Agora ve se a qtd é válida
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return {erro: "Quantidade inválida"};
        }

        const animalInfo = animaisValidos[animal];
        let recintosViaveis = [];

        //vê os recintos adequados
        recintos.forEach((recinto) =>{
            //verifica se o bioma é compativel
            if (!recinto.bioma.some(b => animalInfo.bioma.includes(b))) {
                return; // vai p próximo recinto
            }

            let espacoUsado = recinto.animais.reduce((acum, animal) =>{const animalExistente = animaisValidos[animal.especie];
                return acum + (animalExistente.tamanho * animal.quantidade);
            }, 0);

            //verifica a qtd de especie pra ver se tem espaço extra
            if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
                espacoUsado += 1; // espaço extra p conviver
            }

            const espacoNecessario = animalInfo.tamanho * quantidade;
            const espacoDisponivel = recinto.tamanhoTotal - espacoUsado;

            //verifica se tem espaço o suficiente
            if (espacoDisponivel >= espacoNecessario) {
                //verifica se hipopotamos e carnivoros tem restrições
                const algumCarnivoro = recinto.animais.some(a =>animaisValidos[a.especie].carnivoro);
                if (animalInfo.carnivoro && (recinto.animais.length > 0 || algumCarnivoro)) {
                    return;// carnivoros não pode dividir mesmo espaço que outras espécies
                }
                if (animal === 'hipopotamo' && !recinto.bioma.includes('rio')) {
                    return;// Hipopotamos precisam de rio e savana
                }

                //adiciona o recinto a lista viavel
                recintosViaveis.push(`recinto ${recinto.numero}(espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        });

        //Retorna os recintos viaveis ou uma mensagem de erro
        if(recintosViaveis.length > 0){
            return{recintosViaveis: recintosViaveis.sort()};
        } else{
            return{erro: "Não há recinto viável"};
        }
    }

}

export { RecintosZoo as RecintosZoo };

  