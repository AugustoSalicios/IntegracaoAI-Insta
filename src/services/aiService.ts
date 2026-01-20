import { GoogleGenerativeAI } from "@google/generative-ai";

export const gerarResumoAI = async(texto: string) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ''); //gera instancia de IA do Google
    const modelo = genAI.getGenerativeModel({model: "gemini-2.5-flash" }); //define o modelo utilizado pela API
    const prompt = (`Resuma o seguinte texto em seus pontos principais: ${texto}`); //o prompt recebido

    const resultado = await modelo.generateContent(prompt); //resultado recebe o resultado/resposta dada pelo prompt (await)
    return resultado.response.text();
}