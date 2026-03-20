import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { ZendeskChat } from 'capacitor-zendesk-support-sdk'
import {
  chatbubbleEllipsesOutline,
  chevronBackOutline,
  createOutline,
  documentTextOutline,
  receiptOutline,
  timeOutline,
  trendingUpOutline,
  walletOutline,
} from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import './Home.css'

const Home: React.FC = () => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      try {
        await ZendeskChat.initialize({
          appId: '6ef3f217b2a8fdc74073b842a97bf542936e479d3d94b71c',
          clientId: 'mobile_sdk_client_69b92300aa341633ea0b',
          zendeskUrl: 'https://bisonsupport.zendesk.com',
          theme: {
            primaryColor: '#006e25',
          },
        })

        await ZendeskChat.setVisitorInfo({
          name: 'John Doe',
          email: 'john@example.com',
        })
        setInitialized(true)
      } catch (e) {
        console.error('Error initializing Zendesk', e)
      }
    }

    initialize()
  }, [])

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
    <IonPage className='support-page'>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton
              defaultHref='/home'
              icon={chevronBackOutline}
              className='back-button'
            />
          </IonButtons>
          <IonTitle>Hilfe & Support</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding' scrollY={true}>
        <div className='main-container'>
          {/* Hero Section */}
          <section className='hero-section'>
            <h2 className='hero-headline'>Wie können wir dir helfen?</h2>
          </section>

          {/* Action Grid */}
          <IonGrid className='ion-no-padding'>
            <IonRow className='action-column'>
              <IonCol size='12'>
                <button className='action-card group' onClick={openHelpCenter}>
                  <div className='icon-wrapper primary-bg'>
                    <IonIcon
                      icon={documentTextOutline}
                      className='action-icon'
                    />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>Help Center</h3>
                    <p className='card-description'>
                      Antworten auf die häufigsten Fragen finden.
                    </p>
                  </div>
                </button>
              </IonCol>

              <IonCol size='12'>
                <button className='action-card group' onClick={openMessaging}>
                  <div className='icon-wrapper secondary-bg'>
                    <IonIcon
                      icon={chatbubbleEllipsesOutline}
                      className='action-icon'
                    />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>Live Chat</h3>
                    <p className='card-description'>
                      Direkte Hilfe von unserem Support-Team.
                    </p>
                  </div>
                </button>
              </IonCol>

              <IonCol size='12'>
                <button className='action-card group' onClick={openTicketList}>
                  <div className='icon-wrapper gray-bg'>
                    <IonIcon icon={receiptOutline} className='action-icon' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>Meine Tickets</h3>
                    <p className='card-description'>
                      Status deiner bisherigen Anfragen prüfen.
                    </p>
                  </div>
                </button>
              </IonCol>

              <IonCol size='12'>
                <button className='action-card group' onClick={createTicket}>
                  <div className='icon-wrapper tertiary-bg'>
                    <IonIcon icon={createOutline} className='action-icon' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>Neues Ticket</h3>
                    <p className='card-description'>
                      Ein neues Support-Ticket erstellen.
                    </p>
                  </div>
                </button>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Contact CTA Section */}
          <section className='contact-cta-card'>
            <div className='cta-content'>
              <h3 className='cta-title'>Noch Fragen offen?</h3>
              <p className='cta-description'>
                Unser technisches Support-Team ist rund um die Uhr für dich da.
              </p>
              <IonButton
                expand='block'
                className='cta-button'
                onClick={openMessaging}
              >
                Kontakt aufnehmen
              </IonButton>
            </div>
            <div className='decorative-element-1'></div>
            <div className='decorative-element-2'></div>
          </section>
        </div>
      </IonContent>

      <IonFooter className='ion-no-border'>
        <IonTabBar slot='bottom' className='custom-tab-bar'>
          <IonTabButton tab='invest' className='custom-tab-button'>
            <IonIcon icon={trendingUpOutline} />
            <IonLabel>Investieren</IonLabel>
          </IonTabButton>

          <IonTabButton tab='wallet' className='custom-tab-button'>
            <IonIcon icon={walletOutline} />
            <IonLabel>Wallet</IonLabel>
          </IonTabButton>

          <IonTabButton tab='history' className='custom-tab-button'>
            <IonIcon icon={timeOutline} />
            <IonLabel>Historie</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  )
}

export default Home
