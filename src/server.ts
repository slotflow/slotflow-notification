import app from "./app";
import { appConfig } from "./config/env";
import { kafkaConsumerService } from "./infrastructure/lib/kafka.consumer";
import { kafkaConsumerController } from "./interface/kafka.consumer.controller";

const start = async () => {
  try {

    await kafkaConsumerService.connect();
    await kafkaConsumerController.startListening();

    app.listen(appConfig.port, () =>
      console.log(`Server running on http://localhost:${appConfig.port}`)
    );

  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

start();
