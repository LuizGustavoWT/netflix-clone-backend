import { Message, RecordMetadata } from 'kafkajs';

export interface IKafkaSendMessage {
  topic: string;
  messages: Message[];
}
export interface IMoviesKafkaEvents {
  sendMessage: (data: IKafkaSendMessage) => Promise<RecordMetadata[]>;
}
