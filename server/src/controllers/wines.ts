import { createWine, getWineById, getWineByName, getWines } from '../db/wines';
import express from 'express';


export const getAllWines = async (req: express.Request, res: express.Response) => {
  try {
    const wines = await getWines();

    return res.status(200).json(wines);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};


export const createNewWine = async (req: express.Request, res: express.Response) => {
  try {
    const {
      name,
      year,
      variety,
      type,
      color,
      temperature,
      graduation,
      ph,
      observations } = req.body;

    if (!name || !year || !variety || !type || !color || !temperature || !graduation || !ph || !observations) {
      return res.sendStatus(400);
    }

    const existingWine = await getWineByName(name);

    if (existingWine) {
      return res.sendStatus(400);
    }

    const wine = await createWine({
      name,
      year,
      variety,
      type,
      color,
      temperature,
      graduation,
      ph,
      observations
    });

    return res.status(200).json(wine).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateWine = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      year,
      variety,
      type,
      color,
      temperature,
      graduation,
      ph,
      observations } = req.body;

    if (!name || !year || !variety || !type || !color || !temperature || !graduation || !ph || !observations) {
      return res.sendStatus(400);
    }

    const wine = await getWineById(id);

    wine.name = name;
    wine.year = year;
    wine.variety = variety;
    wine.type = type;
    wine.color = color;
    wine.temperature = temperature;
    wine.graduation = graduation;
    wine.ph = ph;
    wine.observations = observations;

    await wine.save();

    return res.status(200).json(wine).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}