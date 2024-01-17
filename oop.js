"use strict";
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.id = crypto.randomUUID();
    }
    toString() {
        return `${this.name} - ${this.age} y.o - ${this.gender} - id: ${this.id}`;
    }
}
class List {
    constructor(mainList) {
        this.mainList = new Set(mainList);
    }
    add(value) {
        this.mainList.add(value);
    }
    getAll() {
        return Array.from(this.mainList);
    }
    getAllByField(field, value) {
        let instances = [];
        this.mainList.forEach(instance => instance[field] === value && instances.push(instance));
        return instances;
    }
    printAll() {
        this.mainList.forEach(console.log);
    }
    printAllByField(field, value) {
        this.mainList.forEach(instance => instance[field] === value && console.log(instance));
    }
    countAll() {
        return this.mainList.size;
    }
    countAllByField(field, value) {
        let counter = 0;
        this.mainList.forEach(instance => instance[field] == value && counter++);
        return counter;
    }
    getFieldSum(field) {
        let counter = 0;
        this.mainList.forEach(instance => counter += instance[field]);
        return counter;
    }
    getFieldSumByOtherField(field, byField, byFieldValue) {
        let counter = 0;
        this.mainList.forEach((instance) => {
            if (instance[byField] === byFieldValue) {
                counter += instance[field];
            }
        });
        return counter;
    }
    getFieldAverage(field) {
        return this.getFieldSum(field) / this.mainList.size;
    }
    getFieldAverageByOtherField(field, byField, byFieldValue) {
        let instanceCounter = 0, sumCounter = 0;
        this.mainList.forEach((instance) => {
            if (instance[byField] === byFieldValue) {
                instanceCounter++;
                sumCounter += instance[field];
            }
        });
        return sumCounter / instanceCounter;
    }
}
const alex = new Person('Alex', 18, 'male');
const peter = new Person('Peter', 31, 'male');
const alina = new Person('Alina', 14, 'female');
const personList = new List();
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
document.querySelector("pre").innerHTML = preContents;
console.log(preContents);
