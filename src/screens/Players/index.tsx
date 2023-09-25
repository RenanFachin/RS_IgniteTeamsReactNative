import { Header } from '@components/Header'
import { Container, Form } from './styles'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'

export function Players() {
  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title='Nome da turma'
        subtitle='Adicione a galera e separe os times!'
      />


      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />


        <ButtonIcon iconName='add' />
      </Form>

      <Filter title='Time A' isActive/>
      <Filter title='Time B' />

    </Container>
  )
}