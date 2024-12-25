import { Request, Response } from "express";

const healthcheck = {
  checkHealth(req: Request, res: Response) {
    const healthcheck = {
      message: "OK",
      uptime: process.uptime(),
      timestamp: Date.now(),
    };

    try {
      res.send(healthcheck);
    } catch (error) {
      res.status(503).send(error);
    }
  },
};

export default healthcheck;
