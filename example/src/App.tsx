import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useVimeoEvent, useVimeoPlayer, VimeoPlayer } from 'react-native-vimeo-bridge';

function App() {
  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e', {
    autoplay: true,
    controls: true,
  });

  const play = useVimeoEvent(player, 'play');
  const timeupdate = useVimeoEvent(player, 'timeupdate', 1000);
  const pause = useVimeoEvent(player, 'pause');

  console.log('play', play);
  console.log('timeupdate', timeupdate);
  console.log('pause', pause);

  useVimeoEvent(player, 'volumechange', (data) => {
    console.log('volumechange', data.volume);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VimeoPlayer player={player} />
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
