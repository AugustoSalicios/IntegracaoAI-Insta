import { Router } from "express";
import { criarResumoAi } from "../controllers/resumoController.js";

const router = Router();

router.post('/resumir', criarResumoAi);
export default router;