import React from 'react';
import { Text, View, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const FeedInput = ({}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(212, 201, 190, 1)' }}>
      <View style={styles.wrapper}>
        <Text style={styles.titleText}>Welcome in Newsly!</Text>
        <Text style={styles.descriptionText}>Your friendly RSS reader</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.descriptionText}>
            Please insert the feed that you want to browse in your app :)
          </Text>
          <TextInput
            placeholder="https://example.com/rss"
            placeholderTextColor="rgba(18, 52, 88, 0.5)"
            style={styles.input}
            keyboardType="url"
          />
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.subtitleText}>Here are your current feeds:</Text>
        <TextInput
          placeholder="https://example.com/rss"
          placeholderTextColor="rgba(18, 52, 88, 0.5)"
          style={styles.input}
          keyboardType="url"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'rgba(18, 52, 88, 0.2)',
    borderRadius: 12,
    borderWidth: 1,
    color: 'rgba(18, 52, 88,1)',
    elevation: 2,
    fontSize: 16,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputWrapper: {
    marginHorizontal: 15,
    marginTop: 50,
  },
  subtitleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: 'rgba(241, 239, 236,1)',
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeedInput);
