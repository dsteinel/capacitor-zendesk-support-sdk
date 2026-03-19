import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonNote,
  IonFooter
} from '@ionic/react';
import { 
  helpCircleOutline, 
  chatbubblesOutline, 
  listOutline, 
  createOutline,
  checkmarkCircle
} from 'ionicons/icons';
import { ZendeskChat } from 'capacitor-zendesk-support-sdk';
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await ZendeskChat.initialize({
          appId: '6ef3f217b2a8fdc74073b842a97bf542936e479d3d94b71c',
          clientId: 'mobile_sdk_client_69b92300aa341633ea0b',
          zendeskUrl: 'https://bisonsupport.zendesk.com',
          theme: {
            primaryColor: '#8a2be2' // A nice purple color
          }
        });

        await ZendeskChat.setVisitorInfo({
          name: 'John Doe',
          email: 'john@example.com',
        });
        setInitialized(true);
      } catch (e) {
        console.error('Error initializing Zendesk', e);
      }
    };

    initialize();
  }, []);

  const [isCustomTheme, setIsCustomTheme] = useState(true);
  const [locale, setLocale] = useState('en-US');

  const toggleTheme = async () => {
    const newColor = isCustomTheme ? '#3880ff' : '#8a2be2';
    await ZendeskChat.setTheme({ primaryColor: newColor });
    setIsCustomTheme(!isCustomTheme);
  };

  const toggleLanguage = async () => {
    const newLocale = locale === 'en-US' ? 'fr-FR' : 'en-US';
    await ZendeskChat.setLocale({ locale: newLocale });
    setLocale(newLocale);
  };

  const openMessaging = async () => {
    await ZendeskChat.open({});
  };

  const openHelpCenter = async () => {
    await ZendeskChat.openHelpCenter({});
  };

  const openTicketList = async () => {
    await ZendeskChat.openTicketList();
  };

  const createTicket = async () => {
    await ZendeskChat.createTicket();
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="primary">
          <IonTitle>Support Center</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          
          <IonCard className="ion-no-margin ion-margin-bottom" mode="ios" style={{ borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: '1.4rem', fontWeight: '700' }}>How can we help?</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="medium">
                Welcome to our support portal. Select an option below to get started with our team.
              </IonText>
              {initialized && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                  <IonIcon icon={checkmarkCircle} color="success" style={{ fontSize: '16px', marginRight: '4px' }} />
                  <IonNote color="success" style={{ fontSize: '12px' }}>Zendesk SDK Initialized</IonNote>
                </div>
              )}
              {initialized && (
                <IonButton 
                  size="small" 
                  fill="outline" 
                  onClick={toggleTheme} 
                  style={{ marginTop: '16px', '--border-radius': '12px', fontSize: '12px' }}
                >
                  Switch Theme: {isCustomTheme ? 'Purple' : 'Blue'}
                </IonButton>
              )}
              {initialized && (
                <IonButton 
                  size="small" 
                  fill="outline" 
                  onClick={toggleLanguage} 
                  style={{ marginTop: '16px', marginLeft: '8px', '--border-radius': '12px', fontSize: '12px' }}
                >
                  Language: {locale === 'en-US' ? 'English' : 'French'}
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>

          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="6">
                <IonButton 
                  onClick={openHelpCenter} 
                  expand="block" 
                  color="light" 
                  className="support-button"
                  style={{ height: '140px', '--border-radius': '16px', margin: '8px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonIcon icon={helpCircleOutline} style={{ fontSize: '32px', marginBottom: '8px' }} color="primary" />
                    <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'none' }}>Help Center</span>
                  </div>
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton 
                  onClick={openMessaging} 
                  expand="block" 
                  color="light" 
                  className="support-button"
                  style={{ height: '140px', '--border-radius': '16px', margin: '8px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonIcon icon={chatbubblesOutline} style={{ fontSize: '32px', marginBottom: '8px' }} color="secondary" />
                    <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'none' }}>Live Chat</span>
                  </div>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <IonButton 
                  onClick={openTicketList} 
                  expand="block" 
                  color="light" 
                  className="support-button"
                  style={{ height: '140px', '--border-radius': '16px', margin: '8px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonIcon icon={listOutline} style={{ fontSize: '32px', marginBottom: '8px' }} color="tertiary" />
                    <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'none' }}>My Tickets</span>
                  </div>
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton 
                  onClick={createTicket} 
                  expand="block" 
                  color="light" 
                  className="support-button"
                  style={{ height: '140px', '--border-radius': '16px', margin: '8px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonIcon icon={createOutline} style={{ fontSize: '32px', marginBottom: '8px' }} color="warning" />
                    <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'none' }}>New Ticket</span>
                  </div>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

          <div style={{ flex: 1 }}></div>

          <IonFooter className="ion-no-border" style={{ background: 'transparent', textAlign: 'center', paddingBottom: '20px' }}>
            <IonText color="medium">
              <p style={{ fontSize: '12px' }}>Powered by Zendesk Support SDK</p>
            </IonText>
          </IonFooter>
        </div>
      </IonContent>

      <style>
        {`
          .support-button {
            --box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            margin: 0 !important;
          }
          .support-button::part(native) {
            padding-top: 20px;
            padding-bottom: 20px;
          }
        `}
      </style>
    </IonPage>
  );
};

export default Home;
