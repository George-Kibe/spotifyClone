import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerContext } from '../providers/PlayerProvider';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

const Player = () => {
  const { track } = usePlayerContext();
  const [sound, setSound] = useState<Sound>()

  useEffect(() => {
    if(!track) { return }
    playTrack()
  }, [track])

  useEffect(() => {
    return sound ? () => {
      console.log('Unloading Sound')
      sound.unloadAsync();
    }
    : undefined
  }, [sound])
  
  const image = track?.album.images?.[0];
  const playTrack = async() => {
    if (sound) {
      await sound.unloadAsync()
    }    
    if (!track?.preview_url) {
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    })

    setSound(newSound)
    newSound.playAsync()
    console.log(`playing track id ${track.id}`)
  } 

  const onPlayPause = async () => {
    if (sound) {
        await sound.pauseAsync();
    }else{
      return;
    }
  }
  
  if (!track) {
    return null;
  }  

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
        </View>

        <Ionicons
          name={'heart-outline'}
          size={20}
          color={'white'}
          style={{ marginHorizontal: 10 }}
        />
        <Ionicons
          onPress={onPlayPause}
          disabled={!track?.preview_url}
          name={'play'}
          size={22}
          color={track?.preview_url ? 'white' : 'gray'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: -80,
    height: 80,
    padding: 10,
  },
  player: {
    backgroundColor: '#286660',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: 'white',
  },
  subtitle: {
    color: 'lightgray',
    fontSize: 12,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;