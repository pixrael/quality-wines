import mongoose from 'mongoose';

// Wine Config
const WineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: String, required: false },
    variety: { type: String, required: false },
    type: { type: String, required: false },
    color: { type: String, required: false },
    temperature: { type: Number, required: false },
    graduation: { type: Number, required: false },
    ph: { type: Number, required: false },
    observations: { type: String, required: false },
});

export const WineModel = mongoose.model('Wine', WineSchema);

// Wine Actions
export const getWines = () => WineModel.find();
export const createWine = (values: Record<string, any>) => new WineModel(values).save().then((wine) => wine.toObject());
export const getWineByName = (name: string) => WineModel.findOne({ name });