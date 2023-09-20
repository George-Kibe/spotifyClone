import { useState } from 'react';
import { StyleSheet , FlatList, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';

import { Text, View } from '../../components/Themed';
// import { tracks } from '../../data/tracks';
import TrackItem from '../../components/TrackItem';


const query = gql`
  query MyQuery($q: String!) {
    search(q: $q) {
      tracks {
        items {
          id
          name
          preview_url
          artists {
            id
            name
          }
          album {
            id
            name
            images {
              url
              height
              width
            }
          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
	const [search, setSearch] = useState('');
  const {data, loading, error} = useQuery(query, {
    variables: {q: search}
  });

  const tracks = data?.search?.tracks?.items || [];
  console.log(data)
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
      {loading && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
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
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 10
  },
  input: {
    backgroundColor: '#e7e7e7',
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
