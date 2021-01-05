import React, { useState } from 'react';
import Head from 'next/head';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';
import { FaTrashAlt } from 'react-icons/fa';

import { getClientsWithDebts } from '../store/actions/clients/clients';
import { toDelete } from '../services/api';

import DebtModal from '../components/UI/Modals/Debt/Debt';

import {
  Wrapper,
  ClientsList,
  ClientDiv,
  ClientNameSettingsDiv,
  ClientNameDiv,
  Settings,
  DebtBtn,
  FlexDiv,
  NoClients
} from '../styles/pages/clients/Clients';

import { removeClient } from '../store/actions/clients/clients';

const mapStateToProps = ({ clients }) => {
  return { clients };
};

const Clients = ({ clients }) => {
  const [openDebt, setOpenDebt] = useState<boolean>(false);
  const [selectedClientId, setSelectedClientId] = useState<string>('');

  const dispatch = useDispatch();

  function toggleDebtModal(clientId: string): void {
    setSelectedClientId(clientId);
    setOpenDebt(!openDebt);
  }

  async function handleDeleteClient(clientId: string): Promise<void> {
    const response = await toDelete(
      `${process.env.API_ENDPOINT}/users/${clientId}`
    );

    if (response.status_code === 200) {
      dispatch(removeClient(clientId));
    }
  }

  return (
    <>
      <Head>
        <title>Clients - Code7</title>
      </Head>
      {openDebt && (
        <DebtModal
          toggleDebtModal={toggleDebtModal}
          clientId={selectedClientId}
        />
      )}
      <Wrapper>
        <>
          {!_.isEmpty(clients.data) &&
            !clients.loading &&
            clients.errors.length === 0 &&
            clients.fetched && (
              <ClientsList clientsLength={clients.data.length}>
                {clients.data.map((client) => (
                  <ClientDiv>
                    <FlexDiv>
                      <ClientNameSettingsDiv>
                        <ClientNameDiv>
                          <span>Name</span>
                          <p>{client.name}</p>
                        </ClientNameDiv>
                        <Settings onClick={() => handleDeleteClient(client.id)}>
                          <FaTrashAlt />
                        </Settings>
                      </ClientNameSettingsDiv>
                      <DebtBtn onClick={() => toggleDebtModal(client.id)}>
                        Debt
                      </DebtBtn>
                    </FlexDiv>
                  </ClientDiv>
                ))}
              </ClientsList>
            )}
          {_.isEmpty(clients.data) &&
            !clients.loading &&
            clients.errors.length === 0 &&
            clients.fetched && <NoClients>No clients</NoClients>}
        </>
      </Wrapper>
    </>
  );
};

Clients.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getClientsWithDebts());
};

export default connect(mapStateToProps)(Clients);
