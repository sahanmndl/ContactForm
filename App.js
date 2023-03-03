import { StatusBar } from 'react-native';
import ContactUs from './src/pages/ContactUsPage';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle='dark-content' />
      <ContactUs />
      <Toast />
    </>
  );
}
