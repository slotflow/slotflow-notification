import app from "./app";
import { appConfig } from "./config/env";
import { log } from "./shared/logger/logger";
import { kafkaClientAdapter } from './infrastructure/messaging/index';
import { KafkaConsumerController } from "./presentation/kafka.controller";

const kafkaController = new KafkaConsumerController(kafkaClientAdapter);

const start = async () => {
  try {

    await kafkaClientAdapter.connectConsumer();
    await kafkaClientAdapter.connectProducer();
    await kafkaController.startListening();

    app.listen(appConfig.port, () =>
      log.info(`Notification service running on http://localhost:${appConfig.port}`)
    );
  } catch (error) {
    log.error("Startup failed", error as Error);
    process.exit(1);
  }
};

start();
