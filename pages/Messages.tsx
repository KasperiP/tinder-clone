import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text/Text';

const MessagesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} variant="bold">
        Messages
      </Text>
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
});

export default MessagesScreen;
