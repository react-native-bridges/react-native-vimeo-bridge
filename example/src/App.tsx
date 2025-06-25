import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useVimeoPlayerStatus, VimeoPlayer } from 'react-native-vimeo-bridge';

function App() {
  const play = useVimeoPlayerStatus('play');

  console.log('play', play);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VimeoPlayer source="https://player.vimeo.com/video/76979871?h=8272103f6e" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
