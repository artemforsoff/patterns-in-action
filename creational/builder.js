// Builder (Строитель) — это паттерн, который позволяет создавать сложные объекты пошагово,
// не указывая всё сразу в конструкторе.

class Computer {
  constructor(cpu, gpu, ram) {
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
  }

  describe() {
    console.log(
      `💻 Computer with: ${[this.cpu, this.gpu, this.ram]
        .filter(Boolean)
        .join(' ')}`
    );
  }
}

class ComputerBuilder {
  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu) {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram) {
    this.computer.ram = ram;
    return this;
  }

  setGPU(gpu) {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}

class ComputerDirector {
  buildGamingPC() {
    return new ComputerBuilder()
      .setCPU('Intel i9')
      .setRAM('32GB')
      .setGPU('RTX 4080');
  }

  buildOfficePC() {
    return new ComputerBuilder().setCPU('Intel i5').setRAM('8GB');
  }
}

const computerDirector = new ComputerDirector();

const gamingPC = computerDirector.buildGamingPC().build();

gamingPC.describe();
