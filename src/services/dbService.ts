import { error } from "console";
import fs from "fs/promises";
import path from "path";
import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.PASSWORD,
    port: Number(process.env.DB_PORT)
})

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
}

export const salvarNoBanco = async (original: string, resumo: string) => {
    const sql = ("INSERT INTO resumos (texto_original, resumo_gerado) VALUES ($1, $2) RETURNING *");
    const values = [original, resumo];

    try{
        const res = await pool.query(sql, values);
        console.log("Resumo salvo corretamente");
        return res.rows[0];
    }
    catch(Err){
        console.error("Erro ao salvar no banco de dados", Err);
        throw Err;
    }
}
