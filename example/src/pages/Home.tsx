import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { ZendeskChat } from 'capacitor-zendesk-support-sdk';

import React from 'react'

const Home: React.FC = () => {
  const initializeZendesk = async () => {
    try {
      await ZendeskChat.initialize({
        appId: '6ef3f217b2a8fdc74073b842a97bf542936e479d3d94b71c',
        clientId: 'mobile_sdk_client_69b92300aa341633ea0b',
        zendeskUrl: 'https://bisonsupport.zendesk.com',
      })

      await ZendeskChat.setVisitorInfo({
        name: 'John Doe',
        email: 'john@example.com',
      })
      alert('Zendesk Initialized')
    } catch (e) {
      console.error('Error initializing Zendesk', e)
    }
  }

  const openMessaging = async () => {
    await ZendeskChat.open({})
  }

  const openHelpCenter = async () => {
    await ZendeskChat.openHelpCenter({})
  }

  const openTicketList = async () => {
    await ZendeskChat.openTicketList()
  }

  const createTicket = async () => {
    await ZendeskChat.createTicket()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Zendesk Support SDK</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonButton expand='block' onClick={initializeZendesk}>
          1. Initialize Zendesk
        </IonButton>

        <IonButton expand='block' color='secondary' onClick={openHelpCenter}>
          Open Help Center
        </IonButton>

        <IonButton expand='block' color='tertiary' onClick={openMessaging}>
          Open Messaging
        </IonButton>

        <IonButton expand='block' color='success' onClick={openTicketList}>
          My Tickets
        </IonButton>

        <IonButton expand='block' color='warning' onClick={createTicket}>
          Create Ticket
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Home
