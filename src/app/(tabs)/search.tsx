import { useState } from 'react';
import { StyleSheet , FlatList, TextInput, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '../../components/Themed';
import { tracks } from '../../data/tracks';
import TrackItem from '../../components/TrackItem';

export default function SearchScreen() {
	const [search, setSearch] = useState('');

	return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome style={styles.icon} name="search" size={20} color="gray" />
        <TextInput
          value={search}
          placeholder="What do you want to listen to?"
          onChangeText={setSearch}
          style={styles.input}
        />
        <TouchableOpacity style={styles.cancelButton} onPress={() => setSearch('')}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackItem track={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 10
  },
  input: {
    // backgroundColor: '#121314',
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 5,
    borderColor: '#121314',
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: "royalblue",
    borderRadius: 5,
    height: 40,
    padding: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  
  }
});
