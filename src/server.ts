import app from "./app";
import { InitKafkaControllers } from ".";
import { appConfig } from "./config/env";
import { log } from "./shared/logger/logger";

const start = async () => {
  try {

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
