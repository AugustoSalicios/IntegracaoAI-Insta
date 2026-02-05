import { Request, Response } from "express";
import { gerarResumoAI } from "../services/aiService.js";
import { SalvarResumo } from "../services/dbService.js";

export const criarResumoAi = async(req: Request, res: Response) => {
    try{
        const {textoOriginal} = req.body;

        if(!textoOriginal){
            return res.status(400).json({erro: 'Por favor envie campo textoParaResumir'});
        }

        const resumoGerado = await gerarResumoAI(textoOriginal);
        const registroSalvo = await SalvarResumo(textoOriginal, resumoGerado);

        return res.status(201).json({
            mensagem: "Resumo gerado e salvo!",
            data: registroSalvo
        })
    }
    catch(error){
        return res.status(500).json({error: "Erro interno na geração do resumo"});
    }
}