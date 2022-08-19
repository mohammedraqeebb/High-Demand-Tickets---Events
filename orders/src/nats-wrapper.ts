import nats, { Stan, Message } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('cannot access NATS before connecting');
    }

    return this._client;
  }
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('connected to NATS');
        resolve();
      });

      this.client.on('error', (err) => {
        console.log('error connecting', err);
        reject();
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();

// export class natswrapper {
//   private _client?: Stan;

//   get client() {
//     if (!this._client) {
//       throw new Error('error connecting nats');
//     }
//     return this._client;
//   }

//   connect(clusterId: string, clientId: string, url: string) {
//     this._client = nats.connect(clusterId, clientId, {
//       url: url,
//     });
//     return new Promise<void>((resolve, reject) => {
//       this.client.on('connect', () => {
//         console.log('connected to nats');
//         resolve();
//       });
//       this.client.on('error', () => {
//         console.log('error in connecting nats');
//         reject();
//       });
//     });
//   }
// }

// export const natswrappe = new natswrapper();

// enum Subjects {
//   TicketCreated = 'ticket:created',
//   TicketUpdated = 'ticket:updated',
// }

// interface Event {
//   subject: Subjects;
//   data: any;
// }

// abstract class Publisher<T extends Event> {
//   abstract subject: T['subject'];
//   private client: Stan;

//   constructor(client: Stan) {
//     this.client = client;
//   }

//   publish(data: T['data']): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.client.publish(this.subject, JSON.stringify(data), (err) => {
//         if (err) reject(err);
//         console.log('event published', this.subject);
//         resolve();
//       });
//     });
//   }
// }

// abstract class Listener<T extends Event> {
//   abstract subject: T['subject'];
//   private client: Stan;
//   abstract queueGroup: string;
//   abstract onMessage(data: T['data'], msg: Message): void;

//   constructor(client: Stan) {
//     this.client = client;
//   }
//   subsrictionOptions() {
//     return this.client
//       .subscriptionOptions()
//       .setManualAckMode(true)
//       .setDeliverAllAvailable()
//       .setDurableName(this.queueGroup);
//   }

//   listen() {
//     const subsriction = this.client.subscribe(
//       this.subject,
//       this.queueGroup,
//       this.subsrictionOptions()
//     );

//     subsriction.on('message', (msg: Message) => {
//       console.log('message recieved', msg.getSubject());
//       const data = this.parseMessage(msg);
//       this.onMessage(data, msg);
//     });
//   }

//   parseMessage(msg: Message) {
//     const data = msg.getData();
//     return typeof data === 'string'
//       ? JSON.parse(data)
//       : JSON.parse(data.toString('utf8'));
//   }
// }

// interface TicketCreatedEvent {
//   subject: Subjects.TicketCreated;
//   data: {
//     id: string;
//     title: string;
//     price: number;
//   };
// }

// class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
//   readonly subject = Subjects.TicketCreated;
// }

// new TicketCreatedPublisher(natsWrapper.client).publish();

// class TicketCreatedListener extends Listener<TicketCreatedEvent>{
//   readonly subject= Subjects.TicketCreated;
//   queueGroup = "ticket-created-group";

//   onMessage(data:TicketCreatedEvent['data'], msg: Message) {
//     msg.ack();
//   }
// }

// new TicketCreatedListener(natsWrapper.client).listen();
