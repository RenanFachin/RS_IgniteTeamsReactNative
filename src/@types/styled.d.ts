import theme from "@theme/index";
import 'styled-components/native'


declare module 'styled-components/native' {
  // Criando uma tipagem baseada no conteúdo do theme criado
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}