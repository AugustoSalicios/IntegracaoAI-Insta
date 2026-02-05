import { error } from "console";
import fs from "fs/promises";
import path from "path";
import { Pool } from "pg";
import dotenv from 'dotenv'
<<<<<<< HEAD
import { text } from "stream/consumers";
=======

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
    password: process.env.PASSWORD,
    port: Number(process.env.DB_PORT)
})
>>>>>>> 62c9ef5a3f34729b2f31e33e595bf8629162826e

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

export const SalvarResumo = async (original: string, resumo: string) => {
    const sql = 'INSERT INTO resumos (textoOriginal, resumoGerado) VALUES ($1, $2) RETURNING *';
    const values = [original, resumo];

    try{
        const res = await pool.query(sql, values);
        console.log("Resumo salvo corretamente");
        return res.rows[0];
    }
    catch(erro){
        console.error("Erro ao salvar no banco de dados", erro);
        throw erro;
    }
}

