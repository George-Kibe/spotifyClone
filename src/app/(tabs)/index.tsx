import { StyleSheet, FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import { Text, View } from '../../components/Themed';
import TrackItem from '../../components/TrackItem';
// import { tracks } from '../../data/tracks';

const query = gql`
  query MyQuery($genres: String!) {
    recommendations(seed_genres: $genres) {
      tracks {
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
`;

export default function HomeScreen() {
  const {data, loading, error} = useQuery(query, {
    variables: {
      genres: 'rock, hiphop, reggae',
    }})
  
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const tracks = data?.recommendations.tracks
  console.log(tracks)

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
