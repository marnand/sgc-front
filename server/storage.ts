import { 
  users, 
  properties, 
  persons, 
  contracts, 
  type User, 
  type InsertUser, 
  type Property, 
  type InsertProperty, 
  type Person, 
  type InsertPerson, 
  type Contract, 
  type InsertContract 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  
  // Property operations
  getProperty(id: number): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Person operations
  getPerson(id: number): Promise<Person | undefined>;
  getAllPersons(): Promise<Person[]>;
  createPerson(person: InsertPerson): Promise<Person>;
  updatePerson(id: number, person: Partial<InsertPerson>): Promise<Person | undefined>;
  deletePerson(id: number): Promise<boolean>;
  
  // Contract operations
  getContract(id: number): Promise<Contract | undefined>;
  getAllContracts(): Promise<Contract[]>;
  getContractsByProperty(propertyId: number): Promise<Contract[]>;
  getContractsByClient(clientId: number): Promise<Contract[]>;
  createContract(contract: InsertContract): Promise<Contract>;
  updateContract(id: number, contract: Partial<InsertContract>): Promise<Contract | undefined>;
  deleteContract(id: number): Promise<boolean>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private propertiesMap: Map<number, Property>;
  private personsMap: Map<number, Person>;
  private contractsMap: Map<number, Contract>;
  
  public sessionStore: session.Store;
  
  private userIdCounter: number;
  private propertyIdCounter: number;
  private personIdCounter: number;
  private contractIdCounter: number;

  constructor() {
    this.usersMap = new Map();
    this.propertiesMap = new Map();
    this.personsMap = new Map();
    this.contractsMap = new Map();
    
    this.userIdCounter = 1;
    this.propertyIdCounter = 1;
    this.personIdCounter = 1;
    this.contractIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });
    
    // Add a default admin user
    this.createUser({
      username: "admin",
      password: "$2b$10$6Bnl2PbfuiS0UbAR4j9Ih.xJTnU7h0AdNxlOVJGi8HWLzXJWVAp4q", // "admin123"
      name: "Administrador",
      email: "admin@ikasa.com",
      role: "admin"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username
    );
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.usersMap.values());
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = {
      ...userData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.usersMap.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      ...userData,
      id, // Ensure id doesn't change
      updatedAt: new Date()
    };
    
    this.usersMap.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersMap.delete(id);
  }

  // Property methods
  async getProperty(id: number): Promise<Property | undefined> {
    return this.propertiesMap.get(id);
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.propertiesMap.values());
  }

  async createProperty(propertyData: InsertProperty): Promise<Property> {
    const id = this.propertyIdCounter++;
    const now = new Date();
    const property: Property = {
      ...propertyData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.propertiesMap.set(id, property);
    return property;
  }

  async updateProperty(id: number, propertyData: Partial<InsertProperty>): Promise<Property | undefined> {
    const property = await this.getProperty(id);
    if (!property) return undefined;
    
    const updatedProperty: Property = {
      ...property,
      ...propertyData,
      id, // Ensure id doesn't change
      updatedAt: new Date()
    };
    
    this.propertiesMap.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.propertiesMap.delete(id);
  }

  // Person methods
  async getPerson(id: number): Promise<Person | undefined> {
    return this.personsMap.get(id);
  }

  async getAllPersons(): Promise<Person[]> {
    return Array.from(this.personsMap.values());
  }

  async createPerson(personData: InsertPerson): Promise<Person> {
    const id = this.personIdCounter++;
    const now = new Date();
    const person: Person = {
      ...personData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.personsMap.set(id, person);
    return person;
  }

  async updatePerson(id: number, personData: Partial<InsertPerson>): Promise<Person | undefined> {
    const person = await this.getPerson(id);
    if (!person) return undefined;
    
    const updatedPerson: Person = {
      ...person,
      ...personData,
      id, // Ensure id doesn't change
      updatedAt: new Date()
    };
    
    this.personsMap.set(id, updatedPerson);
    return updatedPerson;
  }

  async deletePerson(id: number): Promise<boolean> {
    return this.personsMap.delete(id);
  }

  // Contract methods
  async getContract(id: number): Promise<Contract | undefined> {
    return this.contractsMap.get(id);
  }

  async getAllContracts(): Promise<Contract[]> {
    return Array.from(this.contractsMap.values());
  }

  async getContractsByProperty(propertyId: number): Promise<Contract[]> {
    return Array.from(this.contractsMap.values()).filter(
      (contract) => contract.propertyId === propertyId
    );
  }

  async getContractsByClient(clientId: number): Promise<Contract[]> {
    return Array.from(this.contractsMap.values()).filter(
      (contract) => contract.clientId === clientId
    );
  }

  async createContract(contractData: InsertContract): Promise<Contract> {
    const id = this.contractIdCounter++;
    const now = new Date();
    const contract: Contract = {
      ...contractData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.contractsMap.set(id, contract);
    return contract;
  }

  async updateContract(id: number, contractData: Partial<InsertContract>): Promise<Contract | undefined> {
    const contract = await this.getContract(id);
    if (!contract) return undefined;
    
    const updatedContract: Contract = {
      ...contract,
      ...contractData,
      id, // Ensure id doesn't change
      updatedAt: new Date()
    };
    
    this.contractsMap.set(id, updatedContract);
    return updatedContract;
  }

  async deleteContract(id: number): Promise<boolean> {
    return this.contractsMap.delete(id);
  }
}

// Create and export a single instance of the storage
export const storage = new MemStorage();
