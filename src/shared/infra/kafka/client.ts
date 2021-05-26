import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  clientId: 'contents',
});

const producer = kafka.producer();

const consumer = kafka.consumer();

export { kafka, consumer, producer };
