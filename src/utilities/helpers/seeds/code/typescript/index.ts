export const samples = [
  `class Animal {
\tprivate name: string;

\tconstructor(name: string) {
\t\tthis.name = name;
\t}

\tpublic move(distanceInMeters: number = 0): void {
\t\tconsole.log(\`\${this.name} moved \${distanceInMeters} meters.\`);
\t}

\tpublic makeSound(): void {
\t\tconsole.log(\`\${this.name} makes a generic sound.\`);
\t}
}

class Dog extends Animal {
\tconstructor(name: string) {
\t\tsuper(name);
\t}

\tpublic makeSound(): void {
\t\tconsole.log(\`\${this.name} barks.\`);
\t}

\tpublic fetch(): void {
\t\tconsole.log(\`\${this.name} is fetching!\`);
\t}
}

const dog = new Dog('Buddy');
dog.move(10);
dog.makeSound();
dog.fetch();`,

  `class Stack<T> {
\tprivate items: T[] = [];

\tpublic push(item: T): void {
\t\tthis.items.push(item);
\t}

\tpublic pop(): T | undefined {
\t\treturn this.items.pop();
\t}

\tpublic peek(): T | undefined {
\t\treturn this.items[this.items.length - 1];
\t}

\tpublic isEmpty(): boolean {
\t\treturn this.items.length === 0;
\t}

\tpublic size(): number {
\t\treturn this.items.length;
\t}

\tpublic clear(): void {
\t\tthis.items = [];
\t}
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.peek()); // Output: 2
console.log(numberStack.size()); // Output: 2
numberStack.pop();
console.log(numberStack.peek()); // Output: 1
numberStack.clear();
console.log(numberStack.isEmpty()); // Output: true`,

  `interface Observer {
\tupdate(message: string): void;
}

class Subject {
\tprivate observers: Observer[] = [];

\tpublic attach(observer: Observer): void {
\t\tthis.observers.push(observer);
\t}

\tpublic detach(observer: Observer): void {
\t\tconst index = this.observers.indexOf(observer);
\t\tif (index !== -1) {
\t\t\tthis.observers.splice(index, 1);
\t\t}
\t}

\tpublic notify(message: string): void {
\t\tfor (const observer of this.observers) {
\t\t\tobserver.update(message);
\t\t}
\t}
}

class ConcreteObserver implements Observer {
\tprivate name: string;

\tconstructor(name: string) {
\t\tthis.name = name;
\t}

\tpublic update(message: string): void {
\t\tconsole.log(\`\${this.name} received message: \${message}\`);
\t}
}

const subject = new Subject();
const observer1 = new ConcreteObserver('Observer 1');
const observer2 = new ConcreteObserver('Observer 2');

subject.attach(observer1);
subject.attach(observer2);
subject.notify('Hello Observers!');
subject.detach(observer1);
subject.notify('Goodbye Observers!');`,

  `function delay(ms: number): Promise<void> {
\treturn new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData(url: string): Promise<any> {
\tconsole.log('Fetching data from', url);
\tawait delay(2000);
\t// Simulate fetching data
\treturn { data: 'Sample Data from ' + url };
}

async function processData(): Promise<void> {
\ttry {
\t\tconst data = await fetchData('https://api.example.com');
\t\tconsole.log('Data received:', data);
\t} catch (error) {
\t\tconsole.error('Error fetching data:', error);
\t}
}

processData();`,

  `function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
\tconst originalMethod = descriptor.value;

\tdescriptor.value = function (...args: any[]) {
\t\tconsole.log(\`Method \${propertyKey} called with args: \`, args);
\t\tconst result = originalMethod.apply(this, args);
\t\tconsole.log(\`Method \${propertyKey} returned: \`, result);
\t\treturn result;
\t};
}

class Calculator {
\t@logMethod
\tpublic add(a: number, b: number): number {
\t\treturn a + b;
\t}

\t@logMethod
\tpublic multiply(a: number, b: number): number {
\t\treturn a * b;
\t}
}

const calculator = new Calculator();
calculator.add(2, 3);
calculator.multiply(4, 5);`,

  `interface Repository<T, ID> {
\tfindById(id: ID): T | null;
\tsave(entity: T): void;
\tdelete(id: ID): void;
}

class InMemoryRepository<T, ID> implements Repository<T, ID> {
\tprivate entities: Map<ID, T> = new Map();

\tpublic findById(id: ID): T | null {
\t\treturn this.entities.get(id) || null;
\t}

\tpublic save(entity: T & { id: ID }): void {
\t\tthis.entities.set(entity.id, entity);
\t}

\tpublic delete(id: ID): void {
\t\tthis.entities.delete(id);
\t}
}

interface User {
\tid: number;
\tname: string;
}

const userRepository = new InMemoryRepository<User, number>();
userRepository.save({ id: 1, name: 'Alice' });
const user = userRepository.findById(1);
console.log(user);
userRepository.delete(1);`,

  `// mathUtils.ts
namespace MathUtils {
\texport namespace Algebra {
\t\texport function solveQuadratic(a: number, b: number, c: number): number[] {
\t\t\tconst discriminant = b * b - 4 * a * c;
\t\t\tif (discriminant < 0) return [];
\t\t\tconst rootDisc = Math.sqrt(discriminant);
\t\t\treturn [(-b + rootDisc) / (2 * a), (-b - rootDisc) / (2 * a)];
\t\t}
\t}

\texport namespace Geometry {
\t\texport function areaOfCircle(radius: number): number {
\t\t\treturn Math.PI * radius * radius;
\t\t}
\t}
}

// app.ts
/// <reference path="mathUtils.ts" />

const roots = MathUtils.Algebra.solveQuadratic(1, -3, 2);
console.log('Quadratic Roots:', roots);

const area = MathUtils.Geometry.areaOfCircle(5);
console.log('Area of Circle:', area);`,

  `type Mutable<T> = {
\t-readonly [P in keyof T]: T[P];
};

interface ReadonlyPoint {
\treadonly x: number;
\treadonly y: number;
}

type Point = Mutable<ReadonlyPoint>;

const point: Point = { x: 10, y: 20 };
point.x = 30; // Now allowed

type PartialOptional<T> = {
\t[P in keyof T]?: T[P];
};

interface Person {
\tname: string;
\tage: number;
\taddress: string;
}

type PersonPartial = PartialOptional<Person>;

const partialPerson: PersonPartial = { name: 'Bob' };`,

  `interface Observer<T> {
\tupdate(data: T): void;
}

class Subject<T> {
\tprivate observers: Observer<T>[] = [];

\tpublic subscribe(observer: Observer<T>): void {
\t\tthis.observers.push(observer);
\t}

\tpublic unsubscribe(observer: Observer<T>): void {
\t\tconst index = this.observers.indexOf(observer);
\t\tif (index !== -1) {
\t\t\tthis.observers.splice(index, 1);
\t\t}
\t}

\tpublic notify(data: T): void {
\t\tfor (const observer of this.observers) {
\t\t\tobserver.update(data);
\t\t}
\t}
}

class DataObserver implements Observer<number> {
\tpublic update(data: number): void {
\t\tconsole.log('DataObserver received:', data);
\t}
}

const subject = new Subject<number>();
const observer = new DataObserver();

subject.subscribe(observer);
subject.notify(42);
subject.unsubscribe(observer);
subject.notify(100);`,

  `class Singleton {
\tprivate static instance: Singleton;

\tprivate constructor() {
\t\t// Private constructor to prevent instantiation
\t}

\tpublic static getInstance(): Singleton {
\t\tif (!Singleton.instance) {
\t\t\tSingleton.instance = new Singleton();
\t\t}
\t\treturn Singleton.instance;
\t}

\tpublic doSomething(): void {
\t\tconsole.log('Singleton instance is doing something.');
\t}
}

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1 === singleton2); // Output: true

singleton1.doSomething();`,

  `import { promises as fs } from 'fs';

async function readFileAsync(path: string): Promise<string> {
  try {
    const data = await fs.readFile(path, 'utf8');
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

async function main(): Promise<void> {
  const content = await readFileAsync('example.txt');
  console.log('File Content:', content);
}

main().catch((error) => console.error('Error in main:', error));`,
  `// app.ts
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(\`Server is running at http://localhost:\${port}\`);
});`,
  `type EventHandler = (...args: any[]) => void;

class EventEmitter {
  private events: Map<string, EventHandler[]> = new Map();

  public on(event: string, handler: EventHandler): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(handler);
  }

  public emit(event: string, ...args: any[]): void {
    const handlers = this.events.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler(...args);
      }
    }
  }

  public off(event: string, handler: EventHandler): void {
    const handlers = this.events.get(event);
    if (handlers) {
      this.events.set(
        event,
        handlers.filter((h) => h !== handler)
      );
    }
  }
}

const emitter = new EventEmitter();

function onFoo(data: any): void {
  console.log('foo event received with data:', data);
}

emitter.on('foo', onFoo);
emitter.emit('foo', { some: 'data' });
emitter.off('foo', onFoo);`,
  `abstract class Handler {
  private nextHandler?: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

class ConcreteHandlerA extends Handler {
  public handle(request: string): void {
    if (request === 'A') {
      console.log('Handled by ConcreteHandlerA');
    } else {
      super.handle(request);
    }
  }
}

class ConcreteHandlerB extends Handler {
  public handle(request: string): void {
    if (request === 'B') {
      console.log('Handled by ConcreteHandlerB');
    } else {
      super.handle(request);
    }
  }
}

const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();

handlerA.setNext(handlerB);

handlerA.handle('A');
handlerA.handle('B');
handlerA.handle('C');`,
  `interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardStrategy implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  public pay(amount: number): void {
    console.log(\`Paid \${amount} using Credit Card \${this.cardNumber}.\`);
  }
}

class PayPalStrategy implements PaymentStrategy {
  constructor(private email: string) {}

  public pay(amount: number): void {
    console.log(\`Paid \${amount} using PayPal account \${this.email}.\`);
  }
}

class ShoppingCart {
  private items: { name: string; price: number }[] = [];

  public addItem(item: { name: string; price: number }): void {
    this.items.push(item);
  }

  public calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  public pay(strategy: PaymentStrategy): void {
    const amount = this.calculateTotal();
    strategy.pay(amount);
  }
}

const cart = new ShoppingCart();
cart.addItem({ name: 'Book', price: 29.99 });
cart.addItem({ name: 'Pen', price: 2.49 });

cart.pay(new CreditCardStrategy('1234-5678-9012-3456'));
cart.pay(new PayPalStrategy('user@example.com'));`,
  `interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  public operation(): string {
    return 'ConcreteComponent';
  }
}

class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return \`ConcreteDecoratorA(\${super.operation()})\`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return \`ConcreteDecoratorB(\${super.operation()})\`;
  }
}

const component = new ConcreteComponent();
const decoratorA = new ConcreteDecoratorA(component);
const decoratorB = new ConcreteDecoratorB(decoratorA);

console.log(decoratorB.operation());`,
  `interface Command {
  execute(): void;
}

class Receiver {
  public action(): void {
    console.log('Receiver action executed.');
  }
}

class ConcreteCommand implements Command {
  private receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  public execute(): void {
    this.receiver.action();
  }
}

class Invoker {
  private commands: Command[] = [];

  public storeAndExecute(cmd: Command): void {
    this.commands.push(cmd);
    cmd.execute();
  }
}

const receiver = new Receiver();
const command = new ConcreteCommand(receiver);
const invoker = new Invoker();

invoker.storeAndExecute(command);`,
  `class Product {
  public parts: string[] = [];

  public listParts(): void {
    console.log('Product parts:', this.parts.join(', '));
  }
}

interface Builder {
  reset(): void;
  buildPartA(): void;
  buildPartB(): void;
  getResult(): Product;
}

class ConcreteBuilder implements Builder {
  private product: Product;

  constructor() {
    this.product = new Product();
  }

  public reset(): void {
    this.product = new Product();
  }

  public buildPartA(): void {
    this.product.parts.push('PartA');
  }

  public buildPartB(): void {
    this.product.parts.push('PartB');
  }

  public getResult(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.buildPartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.buildPartA();
    this.builder.buildPartB();
  }
}

const director = new Director();
const builder = new ConcreteBuilder();
director.setBuilder(builder);

director.buildMinimalViableProduct();
let product = builder.getResult();
product.listParts();

director.buildFullFeaturedProduct();
product = builder.getResult();
product.listParts();`,
  `interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Handling request.');
  }
}

class ProxySubject implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log('Proxy: Checking access before firing a real request.');
    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

const realSubject = new RealSubject();
const proxy = new ProxySubject(realSubject);

proxy.request();`,
  `interface Mediator {
  notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:');
      this.component2.doC();
    }
    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:');
      this.component1.doB();
    }
  }
}

class BaseComponent {
  protected mediator: Mediator;

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Component1 extends BaseComponent {
  public doA(): void {
    console.log('Component 1 does A.');
    this.mediator.notify(this, 'A');
  }

  public doB(): void {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  public doD(): void {
    console.log('Component 2 does D.');
    this.mediator.notify(this, 'D');
  }
}

const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

c1.doA();
c2.doD();`,
  `class Context {
  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(\`Context: Transition to \${(<any>state).constructor.name}.\`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

abstract class State {
  protected context: Context;

  public setContext(context: Context): void {
    this.context = context;
  }

  public abstract handle1(): void;
  public abstract handle2(): void;
}

class ConcreteStateA extends State {
  public handle1(): void {
    console.log('ConcreteStateA handles request1.');
    console.log('ConcreteStateA wants to change the state of the context.');
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log('ConcreteStateA handles request2.');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('ConcreteStateB handles request1.');
  }

  public handle2(): void {
    console.log('ConcreteStateB handles request2.');
    console.log('ConcreteStateB wants to change the state of the context.');
    this.context.transitionTo(new ConcreteStateA());
  }
}

const context = new Context(new ConcreteStateA());
context.request1();
context.request2();`,
  `abstract class AbstractClass {
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperation1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  protected baseOperation1(): void {
    console.log('AbstractClass says: I am doing the bulk of the work');
  }

  protected baseOperation2(): void {
    console.log('AbstractClass says: But I let subclasses override some operations');
  }

  protected baseOperation3(): void {
    console.log('AbstractClass says: But I am doing the bulk of the work anyway');
  }

  protected abstract requiredOperation1(): void;
  protected abstract requiredOperation2(): void;

  protected hook1(): void {}
  protected hook2(): void {}
}

class ConcreteClass1 extends AbstractClass {
  protected requiredOperation1(): void {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

class ConcreteClass2 extends AbstractClass {
  protected requiredOperation1(): void {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  protected hook1(): void {
    console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

const c1 = new ConcreteClass1();
c1.templateMethod();

const c2 = new ConcreteClass2();
c2.templateMethod();`,
  `interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

interface IterableCollection<T> {
  createIterator(): Iterator<T>;
}

class ConcreteIterator<T> implements Iterator<T> {
  private collection: ConcreteCollection<T>;
  private position: number = 0;

  constructor(collection: ConcreteCollection<T>) {
    this.collection = collection;
  }

  public next(): T | null {
    if (this.hasNext()) {
      return this.collection.getItems()[this.position++];
    }
    return null;
  }

  public hasNext(): boolean {
    return this.position < this.collection.getCount();
  }
}

class ConcreteCollection<T> implements IterableCollection<T> {
  private items: T[] = [];

  public getItems(): T[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: T): void {
    this.items.push(item);
  }

  public createIterator(): Iterator<T> {
    return new ConcreteIterator<T>(this);
  }
}

const collection = new ConcreteCollection<number>();
collection.addItem(1);
collection.addItem(2);
collection.addItem(3);

const iterator = collection.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}`,
  `abstract class Component {
  protected parent: Component | null = null;

  public setParent(parent: Component | null): void {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  public add(component: Component): void {}
  public remove(component: Component): void {}
  public isComposite(): boolean {
    return false;
  }

  public abstract operation(): string;
}

class Leaf extends Component {
  public operation(): string {
    return 'Leaf';
  }
}

class Composite extends Component {
  protected children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
      component.setParent(null);
    }
  }

  public isComposite(): boolean {
    return true;
  }

  public operation(): string {
    const results = [];
    for (const child of this.children) {
      results.push(child.operation());
    }
    return \`Branch(\${results.join('+')})\`;
  }
}

const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());

const branch2 = new Composite();
branch2.add(new Leaf());

tree.add(branch1);
tree.add(branch2);

console.log(tree.operation());`,
  `abstract class Creator {
  public abstract factoryMethod(): Product;

  public operation(): string {
    const product = this.factoryMethod();
    return \`Creator: The same creator's code has just worked with \${product.operation()}\`;
  }
}

interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  public operation(): string {
    return '{Result of the ConcreteProductA}';
  }
}

class ConcreteProductB implements Product {
  public operation(): string {
    return '{Result of the ConcreteProductB}';
  }
}

class ConcreteCreatorA extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

function clientCode(creator: Creator) {
  console.log('Client: I'm not aware of the creator's class, but it still works.');
  console.log(creator.operation());
}

clientCode(new ConcreteCreatorA());
clientCode(new ConcreteCreatorB());`,
  `class Target {
  public request(): string {
    return 'Target: The default target's behavior.';
  }
}

class Adaptee {
  public specificRequest(): string {
    return '.eetpadA eht fo roivaheb laicepS';
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return \`Adapter: (TRANSLATED) \${result}\`;
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don't understand it:');
console.log(\`Adaptee: \${adaptee.specificRequest()}\`);

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);`,
  `class SubsystemA {
  public operationA1(): string {
    return 'SubsystemA: Ready!\n';
  }

  public operationA2(): string {
    return 'SubsystemA: Go!\n';
  }
}

class SubsystemB {
  public operationB1(): string {
    return 'SubsystemB: Get ready!\n';
  }

  public operationB2(): string {
    return 'SubsystemB: Fire!\n';
  }
}

class Facade {
  protected subsystemA: SubsystemA;
  protected subsystemB: SubsystemB;

  constructor(subsystemA: SubsystemA = new SubsystemA(), subsystemB: SubsystemB = new SubsystemB()) {
    this.subsystemA = subsystemA;
    this.subsystemB = subsystemB;
  }

  public operation(): string {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystemA.operationA1();
    result += this.subsystemB.operationB1();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystemA.operationA2();
    result += this.subsystemB.operationB2();
    return result;
  }
}

function clientCode(facade: Facade) {
  console.log(facade.operation());
}

const facade = new Facade();
clientCode(facade);`,
  `class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: any): void {
    console.log(\`Flyweight: Displaying shared (\${JSON.stringify(this.sharedState)}) and unique (\${JSON.stringify(uniqueState)}) state.\`);
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(state: string[]): string {
    return state.join('_');
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);
    if (!(key in this.flyweights)) {
      console.log('FlyweightFactory: Can't find a flyweight, creating new one.');
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweight.');
    }
    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(\`FlyweightFactory: I have \${count} flyweights:\`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

const factory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['BMW', 'M5', 'red'],
]);

factory.listFlyweights();

function addCarToPoliceDatabase(
  ff: FlyweightFactory,
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string
) {
  console.log('\nClient: Adding a car to database.');
  const flyweight = ff.getFlyweight([brand, model, color]);
  flyweight.operation({ plates, owner });
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');
addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X6', 'white');

factory.listFlyweights();`,
  `interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

interface AbstractProductA {
  usefulFunctionA(): string;
}

class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of product A1.';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of product A2.';
  }
}

interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
  public usefulFunctionB(): string {
    return 'The result of product B1.';
  }

  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return \`The result of B1 collaborating with (\${result})\`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public usefulFunctionB(): string {
    return 'The result of product B2.';
  }

  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return \`The result of B2 collaborating with (\${result})\`;
  }
}

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

console.log('Client: Testing client code with the first factory type:');
clientCode(new ConcreteFactory1());

console.log('Client: Testing the same client code with the second factory type:');
clientCode(new ConcreteFactory2());`,
  `class Memento {
  private state: string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString();
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return \`\${this.date} / (\${this.state.substr(0, 9)}...)\`;
  }

  public getDate(): string {
    return this.date;
  }
}

class Originator {
  private state: string;

  public setState(state: string): void {
    this.state = state;
    console.log(\`Originator: State has been set to: \${this.state}\`);
  }

  public save(): Memento {
    return new Memento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(\`Originator: State has been restored to: \${this.state}\`);
  }
}

class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log('Caretaker: Saving Originator's state...');
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();
    console.log('Caretaker: Restoring state to:', memento!.getName());
    this.originator.restore(memento!);
  }

  public showHistory(): void {
    console.log('Caretaker: Here's the list of mementos:');
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

const originator = new Originator();
const caretaker = new Caretaker(originator);

originator.setState('State #1');
caretaker.backup();

originator.setState('State #2');
caretaker.backup();

originator.setState('State #3');
caretaker.backup();

originator.setState('State #4');

caretaker.showHistory();

console.log('Client: Now, let's rollback!');
caretaker.undo();

console.log('Client: Once more!');
caretaker.undo();`,
];
