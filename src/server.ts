import app from "./app";
import { appConfig } from "./config/env";
import { log } from "./shared/logger/logger";
import { InitKafkaControllers } from "./kafkaInitiator";
import connectDB from "./config/database/mongodb/mongodb.config";

const start = async () => {
  try {
    connectDB();
    await InitKafkaControllers();

    app.listen(appConfig.port, () =>
      log.info(`Notification service running on http://localhost:${appConfig.port}`)
    );
  } catch (error) {
    log.error("Startup failed", error as Error);
    process.exit(1);
  }
};

start();
