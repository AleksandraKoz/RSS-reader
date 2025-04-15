import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import SaveIcon from '../../assets/save.png';

import { addNewFeed } from '../../store/News/actions';
import FeedList from '../../components/FeedInputComponents/FeedList';
import Wrapper from '../../components/Base/Wrapper';

interface IFeedInput {
  addNewFeed: (url: string) => void;
  newsFeeds: string[];
}

const FeedInput = ({ addNewFeed, newsFeeds }: IFeedInput): React.JSX.Element => {
  const [newUrl, setNewUrl] = useState<string>('');

  const addNewFeedOnClick = () => {
    if (newUrl.trim()) {
      addNewFeed(newUrl.trim());
      setNewUrl('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(212, 201, 190, 1)' }}>
      <Wrapper>
        <Text style={styles.titleText}>Welcome in Newsly!</Text>
        <Text style={styles.descriptionText}>Your friendly RSS reader</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.descriptionText}>
            Please insert the feed that you want to browse in your app :)
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              value={newUrl}
              onChangeText={setNewUrl}
              placeholder="https://example.com/rss"
              placeholderTextColor="rgba(18, 52, 88, 0.5)"
              style={styles.input}
              keyboardType="url"
            />
            <TouchableOpacity onPress={addNewFeedOnClick}>
              <Image source={SaveIcon} style={styles.saveIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Wrapper>
      <FeedList feeds={newsFeeds} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  newsFeeds: state.news.newsFeeds,
});

const mapDispatchToProps = (dispatch) => ({
  addNewFeed: (feed: string) => dispatch(addNewFeed(feed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedInput);

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
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  inputWrapper: {
    marginBottom: 10,
    marginHorizontal: 15,
    marginTop: 30,
  },
  saveIcon: {
    height: 24,
    width: 24,
  },
  titleText: {
    color: 'rgba(18, 52, 88,1)',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
