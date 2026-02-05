import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const modelo = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

export const gerarResumoAI = async(texto: string): Promise<string> => {
    
    try{
        const prompt = `Resuma o seguinte texto em seus pontos principais de forma concisa: \n\n ${texto}`;

        const resultado = await modelo.generateContent(prompt);
        const response = await resultado.response;
        const resumo = response.text();

        if(!resumo){
            throw new Error("A IA retornou um texto vazio");
        }
        return resumo;
    }
    catch(Err){
        console.error("Erro de comunicação com a API", Err);
        throw new Error("Falha ao gerar resumo via IA");
    }
}