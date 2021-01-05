export function getClients() {
  return {
    type: 'REQUEST_GET_CLIENTS'
  };
}

export function getClientsWithDebts() {
  return {
    type: 'REQUEST_GET_CLIENTS_WITH_DEBTS'
  };
}

export function removeClient(clientId: string) {
  return {
    type: 'REMOVE_CLIENT',
    payload: {
      clientId
    }
  };
}
