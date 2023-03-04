import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '../components/Text/Text';
import { BLUR_HASH, PROFILE_MOCKS } from '../contants/contants';

interface CardProps {
  profile: {
    id: number;
    name: string;
    age: number;
  };
  index: number;
}

const Card = ({ profile, index }: CardProps) => {
  return (
    <View
      style={[
        styles.card,
        index % 2 === 0 ? { paddingRight: 8 } : { paddingLeft: 8 },
      ]}
      key={profile.id}
    >
      <Image
        style={styles.image}
        source={require('../assets/placeholder.jpg')}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText} variant="bold">
          {profile.name}, {profile.age}
        </Text>
      </View>
      <Image
        style={[styles.blurImage, index % 2 === 0 ? { right: 8 } : { left: 8 }]}
        source={require('../assets/placeholder.jpg')}
        placeholder={BLUR_HASH}
        contentPosition={'bottom'}
        contentFit="cover"
        transition={1000}
        blurRadius={20}
      />
      <View style={styles.cardTextActionsContainer}>
        <View style={styles.actionButton}>
          <Icon name={'close'} size={25} color={'#fff'} />
        </View>
        <View style={styles.actionDivider} />
        <View style={styles.actionButton}>
          <Icon name={'heart'} size={25} color={'#fff'} />
        </View>
      </View>
    </View>
  );
};

const MatchesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} variant="bold">
        Osumat
      </Text>
      <Text style={styles.subtitle}>
        Tämä on lista ihmisistä jotka ovat tykänneet sinusta takaisin.
      </Text>
      <View style={styles.timeline}>
        <View style={styles.divider} />
        <Text style={styles.timelineText}>Viimeisimmät</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.cardGrid}>
        <FlatList
          numColumns={2}
          data={PROFILE_MOCKS}
          renderItem={({ item, index }) => (
            <Card profile={item} index={index} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 10,
    paddingBottom: 0,
  },
  title: {
    fontSize: 34,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#4d4d4d',
    marginBottom: 15,
  },
  timeline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineText: {
    fontSize: 12,
    color: '#4d4d4d',
    paddingRight: 10,
    paddingLeft: 10,
  },
  divider: {
    flexGrow: 2,
    height: 1,
    backgroundColor: '#dbd9dd',
  },
  card: {
    width: '50%',
    height: 250,
    marginBottom: 16,
  },
  cardTextContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 45,
    left: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
  },
  cardGrid: {
    flex: 1,
    height: '100%',
    marginTop: 10,
  },
  cardTextActionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    width: '100%',
    left: 0,
    bottom: 0,
    position: 'absolute',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  blurImage: {
    position: 'absolute',
    width: '100%',
    height: 40,
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  actionDivider: {
    height: '100%',
    width: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },
});

export default MatchesScreen;
