import { values, sortBy } from 'lodash';

export function setCustomers(state, customers) {
  customers.forEach(customer => {
    state.customerMap[customer.id] = customer;
  });
  state.customers = customers;
}

export function upsetCutomers(state, customer) {
  state.customerMap[customer.id] = customer;
  state.customers = sortBy(values(state.customerMap), 'id');
}

export function upsetCustomerNotes(state, { id, notes }) {
  state.customerNotes[id] = notes;
  state.customerMap[id].notes = notes;
  state.customers.forEach(customer => {
    if (customer.id === id) {
      customer.notes = notes;
    }
  });
}
