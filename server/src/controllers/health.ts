import express from 'express';

export const health = async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json('ok');
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
