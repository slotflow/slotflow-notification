import app from "./app";
import { appConfig } from "./config/env";
import { kafkaConsumerService } from "./infrastructure/lib/kafka.consumer";

const start = async () => {
  try {

    await kafkaConsumerService.connect();

    app.listen(appConfig.port, () =>
      console.log(`Server running on http://localhost:${appConfig.port}`)
    );

  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

start();
