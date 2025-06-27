import { useCallback, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useVimeoEvent, useVimeoPlayer, VimeoPlayer } from 'react-native-vimeo-bridge';

const safeNumber = (value: number | undefined): number => {
  return value ?? 0;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

function App() {
  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e', {
    autoplay: true,
    controls: true,
  });

  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState<number | undefined>(undefined);

  const loaded = useVimeoEvent(player, 'loaded');
  const timeupdate = useVimeoEvent(player, 'timeupdate', 250);
  const progress = useVimeoEvent(player, 'progress');
  const volumeStatus = useVimeoEvent(player, 'volumechange');
  const playbackRate = useVimeoEvent(player, 'playbackratechange');

  const volume = safeNumber(volumeStatus?.volume);
  const currentTime = safeNumber(timeupdate?.seconds);
  const duration = safeNumber(timeupdate?.duration);
  const percent = safeNumber(timeupdate?.percent);
  const loadedFraction = safeNumber(progress?.percent);

  const muted = volumeStatus?.muted;

  const onPlay = useCallback(async () => {
    if (playing) {
      await player.pause();
      return;
    }

    await player.play();
  }, [playing, player]);

  const toggleMute = useCallback(async () => {
    await player.setMuted(!muted);
  }, [player, muted]);

  const changeVolume = useCallback(
    async (volume: number) => {
      const result = await player.setVolume(volume);

      if (result) {
        await player.setMuted(false);
      }
    },
    [player],
  );

  const changePlaybackRate = useCallback(
    async (rate: number) => {
      await player.setPlaybackRate(rate);
    },
    [player],
  );

  const getPlayerInfo = async () => {
    try {
      const [videoId, title, url, width, height] = await Promise.all([
        player.getVideoId(),
        player.getVideoTitle(),
        player.getVideoUrl(),
        player.getVideoWidth(),
        player.getVideoHeight(),
      ]);

      console.log(
        `
        videoId: ${videoId}
        title: ${title}
        url: ${url}
        width: ${width}
        height: ${height}
        `,
      );

      Alert.alert(
        'Player info',
        `videoId: ${videoId}\n` + `title: ${title}\n` + `url: ${url}\n` + `width: ${width}\n` + `height: ${height}`,
      );
    } catch (error) {
      console.error('Error getting player info:', error);
    }
  };

  useVimeoEvent(player, 'playing', (data) => {
    console.log('playing', data);
    setPlaying(true);
  });

  useVimeoEvent(player, 'pause', (data) => {
    console.log('pause', data);
    setPlaying(false);
  });

  useEffect(() => {
    if (loaded?.id) {
      player.getVideoId().then((id) => {
        setVideoId(id);
      });
    }
  }, [loaded?.id, player]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Vimeo Player</Text>
          <Text style={styles.subtitle}>Video ID: {videoId}</Text>
          <Text style={styles.subtitle}>Playback rate: {playbackRate?.playbackRate ?? 1}x</Text>
        </View>
        <VimeoPlayer player={player} />
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percent * 100}%` }]} />
            <View style={[styles.bufferFill, { width: `${loadedFraction * 100}%` }]} />
          </View>
          <Text style={styles.bufferText}>Buffer: {(loadedFraction * 100).toFixed(1)}%</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, styles.seekButton]}
            onPress={async () => {
              await player.setCurrentTime(currentTime - 10);
            }}
          >
            <Text style={styles.buttonText}>⏪ -10s</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.playButton]} onPress={onPlay}>
            <Text style={styles.buttonText}>{playing ? '⏸️ Pause' : '▶️ Play'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={async () => {
              await player.setCurrentTime(0);
              await player.pause();
            }}
          >
            <Text style={styles.buttonText}>⏹️ Stop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.seekButton]}
            onPress={async () => {
              await player.setCurrentTime(currentTime + 10);
            }}
          >
            <Text style={styles.buttonText}>⏭️ +10s</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.volumeSection}>
          <Text style={styles.sectionTitle}>Volume control</Text>
          <View style={styles.volumeControls}>
            <TouchableOpacity style={[styles.volumeButton, muted && styles.activeButton]} onPress={toggleMute}>
              <Text style={styles.buttonText}>{muted ? '🔇 Muted' : '🔊 Unmuted'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volumeButton} onPress={() => changeVolume(0.25)}>
              <Text style={styles.buttonText}>25%</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volumeButton} onPress={() => changeVolume(0.5)}>
              <Text style={styles.buttonText}>50%</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volumeButton} onPress={() => changeVolume(1)}>
              <Text style={styles.buttonText}>100%</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.volumeText}>Current volume: {volume * 100}%</Text>
        </View>

        <View style={styles.speedSection}>
          <Text style={styles.sectionTitle}>Playback rate</Text>
          <View style={styles.speedControls}>
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
              <TouchableOpacity
                key={rate}
                style={[styles.speedButton, (playbackRate?.playbackRate ?? 1) === rate && styles.activeButton]}
                onPress={() => changePlaybackRate(rate)}
              >
                <Text style={styles.buttonText}>{rate}x</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.infoSection}>
          <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={getPlayerInfo}>
            <Text style={styles.buttonText}>📊 Player info</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff0000',
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  bufferFill: {
    height: '100%',
    backgroundColor: '#ffcccc',
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  bufferText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  seekButton: {
    backgroundColor: '#2196F3',
  },
  infoButton: {
    backgroundColor: '#9C27B0',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  volumeSection: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  volumeControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  volumeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#9E9E9E',
    borderRadius: 6,
    minWidth: 60,
  },
  volumeText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  speedSection: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  speedControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  speedButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#607D8B',
    borderRadius: 6,
    marginBottom: 8,
    minWidth: 50,
  },
  activeButton: {
    backgroundColor: '#FF5722',
  },
  infoSection: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  videoSwitcher: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  switcherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  videoButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  videoButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FF9800',
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  activeVideoButton: {
    backgroundColor: '#E65100',
  },
  videoButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default App;
