export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Client {
  name: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  location: Address;
  destination: Address;
  client: Client;
}
