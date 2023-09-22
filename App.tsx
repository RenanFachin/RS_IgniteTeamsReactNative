// Componentes react native
import { ActivityIndicator } from 'react-native'

// Componentes personalizados
import { Groups } from '@screens/Groups';

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
      {fontsLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  )
}

