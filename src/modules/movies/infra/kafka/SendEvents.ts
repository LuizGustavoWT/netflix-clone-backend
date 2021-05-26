import { producer } from '@infra/kafka/client';
import {
  IKafkaSendMessage,
  IMoviesKafkaEvents,
} from '@modules/movies/repositories/IMoviesKafkaEvents';
import { CompressionTypes, RecordMetadata } from 'kafkajs';

class SendEvents implements IMoviesKafkaEvents {
  public async sendMessage({
    messages,
    topic,
  }: IKafkaSendMessage): Promise<RecordMetadata[]> {
    await producer.connect();

    return producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages,
    });
  }
}
