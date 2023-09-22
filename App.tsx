// Componentes react native
import { StatusBar } from 'react-native'; 

// Componentes personalizados
import { Groups } from '@screens/Groups';
import { Loading } from '@components/Loading';

// Themes
import { ThemeProvider } from 'styled-components'
import theme from '@theme/index';

// Fontes
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  // Caso fontsLoaded for true, quer dizer que as fonts já foram carregadas

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent={true}
      />
      
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}

