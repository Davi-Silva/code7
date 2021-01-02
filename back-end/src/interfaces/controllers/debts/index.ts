export interface ICreateDebtRequest {
  debt: {
    reason: string;
    amount: number;
  };
}

export interface IUpdateDebtRequest {
  debt: {
    reason: string;
    amount: number;
  };
}
