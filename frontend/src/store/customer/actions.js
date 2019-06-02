import client from '../../boot/apollo-client';
import gql from 'graphql-tag';
import { filter, omit } from 'lodash';
const customerAllFields = `
	id
	name
	address
	phone
	email
	title
	status `;
export function loadCustomers({ commit }, payload) {
  client
    .query({
      query: gql`
			query {
			  customer{
				  ${customerAllFields}
			}
		}
		`,
    })
    .then(res => {
      commit('setCustomers', res.data.customer);
      return res.customer;
    });
}

export function loadNotes({ commit }, customerId) {
  return client
    .query({
      query: gql`
        query Notes($customerId: Int!) {
          notes(customerId: $customerId) {
            id
            name
            content
          }
        }
      `,
      variables: {
        customerId,
      },
    })
    .then(res => {
      commit('upsetCustomerNotes', {
        id: customerId,
        notes: res.data.notes,
      });
      return res.data.notes;
    });
}

export function addCustomer({ commit, state }, customer) {
  return client
    .mutate({
      mutation: gql`
		  	mutation addCustomer($customer:CustomerInput) {
				  addCustomer(customer:$customer){
					${customerAllFields}
				  }
			  }
		  `,
      variables: {
        customer: omit(customer, 'id'),
      },
    })
    .then(res => {
      let newCustomers = res.data.addCustomer;
      commit('upsetCutomers', newCustomers);
    });
}

export function addNoteToCustomer({ commit, state }, { customerId, note }) {
  var noteAddTo = [].concat(state.customerMap[customerId].notes);
  return client
    .mutate({
      mutation: gql`
        mutation addNoteToCustomer($customerId: Int, $note: NoteInput) {
          addNoteToCustomer(customerId: $customerId, note: $note) {
            id
            name
            content
          }
        }
      `,
      variables: {
        customerId,
        note,
      },
    })
    .then(res => {
      let newNote = res.data.addNoteToCustomer;
      noteAddTo.push(newNote);
      commit('upsetCustomerNotes', {
        id: customerId,
        notes: noteAddTo.notes,
      });
      return newNote;
    });
}

export function deleteNote({ state, commit }, { customerId, noteId }) {
  var leftedNotes = filter(state.customerMap[customerId].notes, function(o) {
    return o.id !== noteId;
  });
  client
    .mutate({
      mutation: gql`
        mutation deleteNote($noteId: Int!) {
          deleteNote(noteId: $noteId)
        }
      `,
      variables: {
        noteId,
      },
    })
    .then(_ => {
      commit('upsetCustomerNotes', {
        id: customerId,
        notes: leftedNotes,
      });
    });
}

export function updateNote({ state, commit }, { customerId, note }) {
  var updatedNotes = [];
  state.customerMap[customerId].notes.forEach(noteItem => {
    if (noteItem.id === note.id) {
      updatedNotes.push(note);
    } else {
      updatedNotes.push(noteItem);
    }
  });
  client
    .mutate({
      mutation: gql`
        mutation updateNote($noteId: Int, $note: NoteInput) {
          updateNote(noteId: $noteId, note: $note) {
            content
          }
        }
      `,
      variables: {
        noteId: note.id,
        note: omit(note, 'id'),
      },
    })
    .then(_ => {
      commit('upsetCustomerNotes', {
        id: customerId,
        notes: updatedNotes,
      });
    });
}

export function updateCustomer({ commit }, customer) {
  let omitList = ['id'];
  for (let key in customer) {
    if (key.startsWith('__')) {
      omitList.push(key);
    }
  }
  client
    .mutate({
      mutation: gql`
        mutation updateCustomer($customerId: Int, $customer: CustomerInput) {
          updateCustomer(customerId: $customerId, customer: $customer) {
            id
          }
        }
      `,
      variables: {
        customerId: customer.id,
        customer: omit(customer, ...omitList),
      },
    })
    .then(_ => {
      commit('upsetCutomers', customer);
    });
}
