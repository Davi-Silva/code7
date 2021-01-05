export function getClient(userId: string) {
  return {
    type: 'REQUEST_GET_CLIENT',
    payload: {
      userId
    }
  };
}

export function removeClientDebt(debtId: string) {
  return {
    type: 'REMOVE_CLIENT_DEBT',
    payload: {
      debtId
    }
  };
}
