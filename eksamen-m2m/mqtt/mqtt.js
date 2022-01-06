const mqtt = require("mqtt");
const Machine = require("../models/machine");
const axios = require("axios");

const host = "hairdresser.cloudmqtt.com";
const port = "15658";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "vbyjequy",
  password: "1Ks-WnMKh7Bo",
  reconnectPeriod: 1000,
});

const subscribeToTopic = (chooseTopic) => {
  const topic = chooseTopic;
  client.on("connect", () => {
    console.log("Connected");
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`);
    });
  });

  const createDocument = async (temp) => {
    if (temp.Fanta === true) {
      await Machine.create({
        topic: `${topic}`,
        machine: `${temp.machine}`,
        sodaArray: { cola: `${temp.Cola}`, fanta: `${temp.Fanta}` },
        machineId: `${temp.machineId}`,
      });
    } else {
      await Machine.create({
        topic: `${topic}`,
        machine: `${temp.machine}`,
        sodaArray: { cola: `${temp.Cola}` },
        machineId: `${temp.machineId}`,
      });
    }
  };

  const updateDocument = async (id, temp) => {
    const result = await Machine.findByIdAndUpdate(
      { _id: id[0]._id },
      {
        $set: {
          sodaArray: { cola: temp.Cola, fanta: temp.Fanta },
        },
      },
      { new: true }
    );

    console.log(result);
  };

  client.on("message", async (topic, payload) => {
    console.log("Received Message:", topic, payload.toString());
    const res = await axios.get("http://localhost:3000/api/soda-machines");
    const temp = JSON.parse(payload.toString());
    const filteredId = res.data.filter(
      (object) => parseInt(temp.machineId) === object.machineId
    );
    console.log(filteredId);
    if (filteredId.length <= 0) {
      createDocument(temp);
    } else if (filteredId[0].machineId == parseInt(temp.machineId)) {
      console.log("found a matching id");
      updateDocument(filteredId, temp);
    }
  });
};

module.exports = { subscribeToTopic };
