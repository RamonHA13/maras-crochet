import { Text } from 'react-native'
import { Portal, Dialog, Button } from 'react-native-paper'

interface Props {
  onDismiss: () => void
}

export default function AuthDialog({ onDismiss }: Props) {
  return (
    <Portal>
      <Dialog visible={true} onDismiss={onDismiss}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text>Do not let any blank input</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
