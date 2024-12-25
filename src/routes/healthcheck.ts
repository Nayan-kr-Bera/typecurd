import express from "express";

const router = express()

import healthcheck from "../controller/healthcheck.controller";

router.get('/', healthcheck.checkHealth);


export default router