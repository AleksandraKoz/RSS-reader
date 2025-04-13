import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import Wrapper from '../components/Wrapper.tsx';

interface INewsListHeader {
  title: string;
  description: string;
  searchedTitle: string;
  setSearchedTitle: (search: string) => void;
}

const NewsListHeader = ({
  title,
  description,
  searchedTitle,
  setSearchedTitle,
}: INewsListHeader): React.JSX.Element => {
  return (
    <Wrapper>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <TextInput
        value={searchedTitle}
        onChangeText={setSearchedTitle}
        placeholder="Search by news title"
        placeholderTextColor="rgba(18, 52, 88, 0.5)"
        style={styles.input}
      />
    </Wrapper>
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
    flex: 1,
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 5,
    padding: 10,
  },
});

export default NewsListHeader;
