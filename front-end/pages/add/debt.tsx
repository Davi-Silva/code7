import React, { ChangeEvent, useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FaSpinner } from 'react-icons/fa';

import { parseDate } from '../../utils/date/index';

import {
  Wrapper,
  Container,
  Form,
  LabelInput,
  Label,
  Input,
  Select,
  BtnsDiv,
  Save,
  Loading
} from '../../styles/pages/add/Debt';

import { getClients } from '../../store/actions/clients/clients';

const mapStateToProps = ({ clients }) => {
  return { clients };
};

const AddDebt = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [amount, setAmount] = useState<number>(null);
  const [date, setDate] = useState<string>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [allFields, setAllFields] = useState<boolean>(false);

  useEffect(() => {
    checkAllFields();
  }, [selectedClient, reason, amount, date]);

  useEffect(() => {
    if (!_.isEmpty(clients.data)) {
      setSelectedClient(clients.data[0].id.toString());
    }
  }, [clients]);

  function checkAllFields(): void {
    if (
      selectedClient.length > 0 &&
      reason.length > 0 &&
      amount &&
      amount > 0 &&
      date
    ) {
      setAllFields(true);
    } else {
      setAllFields(false);
    }
  }

  function onChangeClient(e: ChangeEvent<HTMLInputElement>): void {
    setSelectedClient(e.target.value);
  }

  function onChangeReason(e: ChangeEvent<HTMLInputElement>): void {
    setReason(e.target.value);
  }

  function onChangeAmount(e: ChangeEvent<HTMLInputElement>): void {
    setAmount(parseFloat(e.target.value));
  }

  function onChangeDate(e: ChangeEvent<HTMLInputElement>): void {
    setDate(e.target.value);
  }

  async function submitDebt(e): Promise<any> {
    e.preventDefault();
    if (allFields) {
      setLoading(true);
      const response = await fetch(
        `${process.env.API_ENDPOINT}/debts/${selectedClient}/create`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({
            debt: {
              reason,
              amount,
              date
            }
          })
        }
      );
      const data = await response.json();

      if (data.status_code === 200) {
        setTimeout(() => {
          Router.push('/clients');
        }, 2000);
      } else {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Add Debt - Code7</title>
      </Head>
      <Wrapper>
        <Container>
          <Form>
            {loading ? (
              <Loading>
                <FaSpinner />
              </Loading>
            ) : (
              <LabelInput>
                <Label htmlFor="client">Client</Label>
                <Select
                  id="client"
                  onChange={onChangeClient}
                  placeholder="Client Name"
                >
                  {!_.isEmpty(clients.data) && (
                    <>
                      {clients.data.map((client) => (
                        <option value={client.id}>{client.name}</option>
                      ))}
                    </>
                  )}
                </Select>
                <Label id="reason">Reason</Label>
                <Input
                  id="reason"
                  type="text"
                  placeholder="Reason for debt"
                  onChange={onChangeReason}
                />
                <Label>Amount</Label>
                <Input
                  type="number"
                  width="150px"
                  min="0"
                  step="0.1"
                  placeholder="1000.00"
                  onChange={onChangeAmount}
                />
                <Label>Date</Label>
                <Input type="date" width="200px" onChange={onChangeDate} />
                <BtnsDiv>
                  <Save type="submit" onClick={(e) => submitDebt(e)}>
                    Create
                  </Save>
                </BtnsDiv>
              </LabelInput>
            )}
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};

AddDebt.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getClients());
};

export default connect(mapStateToProps)(AddDebt);
