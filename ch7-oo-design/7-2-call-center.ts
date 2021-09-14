#!/usr/bin/env ts-node-script
class Call {
  num: string;
  name: string;
  id: number; // customer id\

  queue?: Call[];
  handler?: Employee;

  replyTo(msg: string) {};
  addToQueue(queue: Call[]) {
    queue.push(this);
    queue
  };
  disconnect() {
    if (this.queue) {
      this.queue.remove(this);
    }
  };
};

type Rank = 'responder' | 'manager' | 'director';

abstract class Employee {
  center: CallCenter;
  name: string;
  supervisor?: Employee;
  rank: Rank;

  curCall?: Call;

  receiveCall(call: Call) {}
  private escalateCall() {};
  private finishCall() {};
};

class Responder extends Employee {
  constructor(center: CallCenter, supervisor: Manager) {
    super();
    this.center = center
    this.supervisor = supervisor;
    this.rank = 'responder';
  };
};

class Manager extends Employee {
  constructor(center: CallCenter, supervisor: Manager) {
    super();
    this.center = center
    this.supervisor = supervisor;
    this.rank = 'manager';
  };
};

class Director extends Employee {
  constructor(center: CallCenter) {
    super();
    this.center = center
    this.rank = 'director';
  };
};

class CallCenter {
  employees: Employee[] = [];
  // what can't i pass a string union into typescript, yet?
  free: {[rank: string]: Employee[]} = {};
  queue: Call[] = [];

  dispatchCall (call: Call) {
    if (this.free.responder.length)
      return this.free.responder.shift()?.receiveCall(call);
    if (this.free.manager.length)
      return this.free.manager.shift()?.receiveCall(call);
    if (this.free.director.length)
      return this.free.manager.shift()?.receiveCall(call);
    
    call.replyTo('No agents are available at this time, please wait until one is free');
    call.addToQueue(this.queue);
  };
};
