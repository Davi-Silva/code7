import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';

import { parseDate } from '../../../../utils/date/index';
import { toDelete, update } from '../../../../services/api';

import {
  Background,
  FormDiv,
  DebtsDiv,
  LabelInput,
  Input,
  Label,
  DebtStatement,
  NoDebt,
  Delete,
  Update
} from '../../../../styles/components/UI/Modals/Debt/Debt';

import {
  getClient,
  removeClientDebt
} from '../../../../store/actions/client/client';

const mapStateToProps = ({ client }) => {
  return { client };
};

const Debt = ({ toggleDebtModal, clientId, client }) => {
  const [clientName, setClientName] = useState<string>('');
  const [clientDebtIds, setClientDebtIds] = useState<[]>([]);
  const [clientDebtReason, setClientDebtReason] = useState<string[]>([]);
  const [clientDebtAmount, setClientDebtAmount] = useState<number[]>([]);
  const [clientDebtDate, setClientDebtDate] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClient(clientId));
  }, []);

  useEffect(() => {
    if (!_.isEmpty(client.data)) {
      setClientName(client.data.name);
      const debtIds = client.data.debt.map((d) => {
        return d.id;
      });
      const debtReasons = client.data.debt.map((d) => {
        return d.reason;
      });
      const debtAmounts = client.data.debt.map((d) => {
        return d.amount;
      });
      const debtDates = client.data.debt.map((d) => {
        return d.date.split('T')[0];
      });
      setClientDebtIds(debtIds);
      setClientDebtReason(debtReasons);
      setClientDebtAmount(debtAmounts);
      setClientDebtDate(debtDates);
    }
  }, [client.data]);

  async function deleteDebt(debtId: string): Promise<any> {
    const response = await toDelete(
      `${process.env.API_ENDPOINT}/debts/${debtId}`
    );

    if (response.status_code === 200) {
      dispatch(removeClientDebt(debtId));
    }
  }

  async function updateDebt(body: any): Promise<any> {
    const response = await update(`${process.env.API_ENDPOINT}/debts`, body);

    if (response.status_code === 200) {
      toggleDebtModal();
    }
  }

  function onChangeDebtReason(
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    let temp = [...clientDebtReason];
    temp[index] = e.target.value;
    setClientDebtReason(temp);
  }

  function onChangeDebtAmount(
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    let temp: number[] = [...clientDebtAmount];
    temp[index] = parseFloat(e.target.value);
    setClientDebtAmount(temp);
  }

  function onChangeDebtDate(
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    let temp: string[] = [...clientDebtDate];
    temp[index] = e.target.value;
    setClientDebtDate(temp);
  }

  function handleDeleteDebt(debtId: string): void {
    deleteDebt(debtId);
  }

  function handleUpdate(): void {
    let debtsToUpdate: any[] = [];

    client.data.debt.forEach((d, index) => {
      if (
        clientDebtReason[index] !== client.data.debt[index].reason ||
        clientDebtAmount[index] !== client.data.debt[index].amount ||
        clientDebtDate[index] !== client.data.debt[index].date.split('T')[0]
      ) {
        debtsToUpdate.push({
          id: d.id,
          reason: clientDebtReason[index],
          amount: clientDebtAmount[index],
          date: clientDebtDate[index]
        });
      }
    });

    if (debtsToUpdate.length > 0) {
      updateDebt({ debts: debtsToUpdate });
    }
  }

  return (
    <>
      <Background onClick={() => toggleDebtModal()} />
      <FormDiv>
        <LabelInput>
          <Label htmlFor="client">Client</Label>
          <Input
            id="client"
            type="text"
            value={clientName}
            placeholder="Client Name"
            width="100%"
            disabled
          />
          <DebtStatement>Debt</DebtStatement>
          <DebtsDiv>
            {clientDebtAmount.length > 0 ? (
              <>
                {clientDebtAmount.map((debt, index) => (
                  <LabelInput key={debt.id}>
                    <Label htmlFor="reason">Reason</Label>
                    <Input
                      id="reason"
                      type="text"
                      value={clientDebtReason[index]}
                      onChange={(e) => onChangeDebtReason(e, index)}
                      placeholder="Reason for debt"
                      width="100%"
                    />
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="0"
                      step="0.1"
                      value={clientDebtAmount[index]}
                      onChange={(e) => onChangeDebtAmount(e, index)}
                      placeholder="Amount"
                      width="150px"
                    />
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      defaultValue={clientDebtDate[index]}
                      onChange={(e) => onChangeDebtDate(e, index)}
                      width="200px"
                    />
                    <Delete
                      onClick={() => handleDeleteDebt(clientDebtIds[index])}
                    >
                      Delete
                    </Delete>
                  </LabelInput>
                ))}
              </>
            ) : (
              <NoDebt>No debts</NoDebt>
            )}
          </DebtsDiv>
          {clientDebtAmount.length > 0 && (
            <Update onClick={() => handleUpdate()}>Update</Update>
          )}
        </LabelInput>
      </FormDiv>
    </>
  );
};

export default connect(mapStateToProps)(Debt);
