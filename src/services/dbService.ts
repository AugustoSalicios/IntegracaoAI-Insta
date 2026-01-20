import { error } from "console";
import fs from "fs/promises";
import path from "path";

const CAMINHO_ARQ = path.resolve('db.json');

export const salvarNoBanco = async(novoResumo: any) => {
    try{
        let dados = [];

        try{
            const conteudo = await fs.readFile(CAMINHO_ARQ, 'utf-8');
            dados = JSON.parse(conteudo);
        }
        catch(erro){
            dados = [];
        }

        const itemParaSalvar = {
            id: Date.now(),
            data: new Date().toISOString(),
            ... novoResumo
        }

        dados.push(itemParaSalvar);

        await fs.writeFile(CAMINHO_ARQ, JSON.stringify(dados, null, 2));
        return itemParaSalvar;
    }
    catch(erro){
        console.error("Erro ao salvar no banco", erro);
        throw new Error("Erro de persistência");
    }
};
