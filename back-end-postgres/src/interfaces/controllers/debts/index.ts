export interface ICreateDebtRequest {
  debt: {
    reason: string;
    amount: number;
    date: Date;
  };
}

export interface IUpdateDebtRequest {
  debts: [
    {
      reason: string;
      amount: number;
      date: Date;
    },
  ];
}
