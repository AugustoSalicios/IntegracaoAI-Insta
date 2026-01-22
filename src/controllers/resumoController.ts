import { Request, Response } from "express";
import { gerarResumoAI } from "../services/aiService.js";

export const criarResumoAi = async(req: Request, res: Response) => {
    const {textoParaResumir} = req.body;

    if(!textoParaResumir){
        return res.status(400).json({erro: 'Por favor envie campo textoParaResumir'});
    }

    try{
        const resumo = await gerarResumoAI(textoParaResumir);
        res.json({message: "Sucesso", resumo});
    }
    catch(error: any){
        console.error("Detalhe do erro:", error.message || error);
        res.status(500).json({erro: "Error, falha ao gerar o resumo", detalhe: error.message});
    }
}