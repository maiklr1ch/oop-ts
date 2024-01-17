
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type Gender = 'male' | 'female' | 'unknown';

interface IPerson {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  toString: () => string;
}

class Person implements IPerson {
  public id: string;
  constructor(
    public name: string,
    public age: number,
    public gender: Gender
  ) {
    this.id = crypto.randomUUID();
  }

  toString() {
    return `${this.name} - ${this.age} y.o - ${this.gender} - id: ${this.id}`
  }
}
type personkeys = NumericKeys<Person>;

class List<T> {
  public mainList: Set<T>;
  constructor(mainList?: Iterable<T>) {
    this.mainList = new Set(mainList);
  }

  add(value: T) {
    this.mainList.add(value);
  }

  getAll(): T[] {
    return Array.from(this.mainList);
  }

  getAllByField<K extends keyof T>(field: K, value: T[K]): T[] {
    let instances: T[] = [];
    this.mainList.forEach(instance => instance[field] === value && instances.push(instance))
    return instances;
  }

  printAll(): void {
    this.mainList.forEach(console.log);
  }

  printAllByField<K extends keyof T>(field: K, value: T[K]): void {
    this.mainList.forEach(instance => instance[field] === value && console.log(instance))
  }

  countAll(): number {
    return this.mainList.size;
  }

  countAllByField<K extends keyof T>(field: K, value: T[K]): number {
    let counter = 0;
    this.mainList.forEach(instance => instance[field] == value && counter++);
    return counter;
  }

  getFieldSum(field: NumericKeys<T>): number {
    let counter = 0;
    this.mainList.forEach(instance => counter += (instance[field] as number));
    return counter;
  }

  getFieldSumByOtherField<K extends keyof T>(field: NumericKeys<T>, byField: K, byFieldValue: T[K]): number {
    let counter = 0;
    this.mainList.forEach((instance: T) => {
      if (instance[byField] === byFieldValue) {
        counter += instance[field] as number;
      }
    });
    return counter;
  }

  getFieldAverage(field: NumericKeys<T>): number {
    return this.getFieldSum(field) / this.mainList.size;
  }

  getFieldAverageByOtherField<K extends keyof T>(field: NumericKeys<T>, byField: K, byFieldValue: T[K]): number {
    let instanceCounter = 0, sumCounter = 0;
    this.mainList.forEach((instance: T) => {
      if (instance[byField] === byFieldValue) {
        instanceCounter++;
        sumCounter += instance[field] as number;
      }
    });
    return sumCounter / instanceCounter;
  }
}

const alex = new Person('Alex', 18, 'male');
const peter = new Person('Peter', 31, 'male');
const alina = new Person('Alina', 14, 'female');

const personList = new List<Person>();

personList.add(alex);
personList.add(peter);
personList.add(alina);

const preContents = `All users list:
${personList.getAll().join('\n')}
* By MALE gender users list:
${personList.getAllByField("gender", "male").join('\n')}
* By FEMALE gender users list:
${personList.getAllByField("gender", "female").join('\n')}
* By UNKNOWN gender users list:
${personList.getAllByField("gender", "unknown").join('\n')}\n
Total count: ${personList.countAll()}
* Total count of MALE gender: ${personList.countAllByField("gender", "male")}
* Total count of FWMALE gender: ${personList.countAllByField("gender", "female")}
* Total count of UNKNOWN gender: ${personList.countAllByField("gender", "unknown")}\n
Age sum: ${personList.getFieldSum("age")}
Age average: ${personList.getFieldAverage("age")}
Age sum where gender=MALE: ${personList.getFieldSumByOtherField("age", "gender", "male")}
Age average where gender=MALE: ${personList.getFieldAverageByOtherField("age", "gender", "male")}
`;

(document.querySelector("pre") as HTMLPreElement).innerHTML = preContents;
console.log(preContents);

