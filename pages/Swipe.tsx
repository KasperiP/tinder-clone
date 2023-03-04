import React, { useMemo, useState } from 'react';

import { Image } from 'expo-image';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TinderCard from 'react-tinder-card';
import Text from '../components/Text/Text';

const profiles = [
  {
    id: 1,
    name: 'Saana',
    age: 20,
  },
  {
    id: 2,
    name: 'Saana',
    age: 20,
  },
  {
    id: 3,
    name: 'Saana',
    age: 20,
  },
  {
    id: 4,
    name: 'Saana',
    age: 20,
  },
  {
    id: 5,
    name: 'Saana',
    age: 20,
  },
];

const SwipeScreen = () => {
  const [profile, setProfile] = useState<typeof profiles>(profiles);
  const [lastDirection, setLastDirection] = useState<
    'right' | 'left' | 'up' | 'down'
  >();
  const [removed, setRemoved] = useState<number[]>([]);

  const refs = useMemo(
    () =>
      Array(profile.length)
        .fill(0)
        .map((_) => React.createRef()),
    [profile],
  );

  const swiped = (dir: 'right' | 'left' | 'up' | 'down', id: number) => {
    setLastDirection(dir);
    setRemoved([...removed, id]);
  };

  const outOfFrame = (id: number) => {
    setProfile((profile) =>
      profile
        .filter((person) => person.id !== id)
        .filter((person) => !removed.includes(person.id)),
    );
  };

  const swipe = (dir: 'right' | 'left' | 'up' | 'down') => {
    const cardsLeft = profile.filter((person) => !removed.includes(person.id));
    if (cardsLeft.length) {
      const toSwipe = profile[profile.length - 1].id;
      const index = profile.map((profile) => profile.id).indexOf(toSwipe);
      if (!refs[index].current) return;
      // @ts-ignore
      refs[index].current.swipe(dir);
      setRemoved([...removed, toSwipe]);
    }
  };

  const reset = () => {
    console.log('reset');
    setProfile(profiles);
    setRemoved([]);
  };

  const responsiveHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.actionButton}>
          <Icon name="keyboard-backspace" size={30} color={'#e94057'} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} variant="bold">
            Selaa
          </Text>
          <Text style={styles.subtitle}>Tampere</Text>
        </View>
        <View style={styles.actionButton}>
          <Icon
            name="order-bool-ascending-variant"
            size={30}
            color={'#e94057'}
          />
        </View>
      </View>
      <View
        style={[
          styles.cardContainer,
          {
            height: responsiveHeight - 280,
          },
        ]}
      >
        {profile.map((profile, index) => (
          <TinderCard
            ref={refs[index]}
            key={profile.id}
            onSwipe={(dir) => swiped(dir, profile.id)}
            onCardLeftScreen={() => outOfFrame(profile.id)}
          >
            <View
              style={[
                styles.card,
                {
                  height: responsiveHeight - 290,
                },
              ]}
            >
              <Image
                style={styles.image}
                source={require('../assets/placeholder.jpg')}
                contentFit="cover"
                transition={1000}
              />
            </View>
          </TinderCard>
        ))}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => swipe('left')}>
          <Icon
            style={styles.secondIcon}
            name="close"
            size={40}
            color={'#e94057'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipe('right')}>
          <Icon
            name="heart"
            size={60}
            style={styles.heartIcon}
            color={'#fff'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => reset()}>
          <Icon
            style={styles.secondIcon}
            name="restart"
            size={40}
            color={'#e94057'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 10,
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: -15,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e8e6eb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '90%',
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    color: '#fff',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 20,
  },
  buttons: {
    marginTop: 10,
    zIndex: -100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  },
  heartIcon: {
    backgroundColor: '#e94057',
    borderRadius: 50,
    padding: 10,
  },
  secondIcon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
});

export default SwipeScreen;
