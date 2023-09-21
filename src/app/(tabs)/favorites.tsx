import { ActivityIndicator, FlatList } from 'react-native';
import TrackItem from '../../components/TrackItem';
import { gql, useQuery } from '@apollo/client';
import { Text } from '../../components/Themed';

const query = gql`
  query getFavorites($userId: String!) {
    favoritesByUserid(userid: $userId) {
      id
      trackid
      userid
      track {
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
            width
            height
          }
        }
      }
    }
  }
`;

export default function FavoritesScreen() {
  const { data, loading, error } = useQuery(query, {
    variables: { userId: 'George' },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.log(error);
  }
  console.log("Response Data: ",data);
  const tracks = (data?.favoritesByUserid || []).map((fav:any) => fav.track);
  if (tracks === undefined || tracks.length === 0) {
    return (
    <Text>No tracks yet</Text>
    )
  }
  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <TrackItem track={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}