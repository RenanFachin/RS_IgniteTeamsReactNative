import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

// Criando uma tipagem para estilização
export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type Props = {
  buttonType: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity) <Props>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  /* buttonType é a estilização condicional com base no PRIMARY ou SECONDARY */
  background-color: ${({ theme, buttonType }) => buttonType === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`