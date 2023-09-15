import { StyleSheet, FlatList } from 'react-native';

import { Text, View } from '../../components/Themed';
import TrackItem from '../../components/TrackItem';
import { tracks } from '../../data/tracks';
import Player from '../../components/Player';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={({ item, index }) => <TrackItem track={item} />}
        // ListHeaderComponent={() => <Player />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
