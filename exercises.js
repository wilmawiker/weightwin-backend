import { client } from "./dbConnect";

export const getExercises = (req, res) => {
  client.connect((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const collection = client.db("weightwin").collection("exercises");
    collection.find().toArray((err, result) => {
      if (err) res.status(500).send(err);
      if (result) res.json(result);
      client.close();
    });
  });
};
