import React from 'react';
import { Box, Text, Image, Pressable } from 'native-base';

const styles = {
  pressable: {
    maxWidth: 176,
    minWidth: 176,
    padding: 8,
    borderRadius: 16,
    elevation: 10,
  },
  bookImage: {
    paddingBottom: 8,
    maxHeight: 200,
    width: 120,
    height: 200,
  },
  boxContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 5,
  },
  textTitle: {
    textAlign: 'center',
  },
  textDate: {
    textAlign: 'center',
  },
};

const goToBookDetails = (bookId) => {
  console.log('goToBookDetails', bookId);
};

const BookCard = (props) => {
  const { book } = props;
  const bookImageUri =
    book.book.bookDetails?.volumeInfo?.imageLinks?.thumbnail?.replace(
      'http://', 'https://'
    );
  return (
    <Pressable
      onPress={() => goToBookDetails(book.id)}
      style={styles.pressable}
    >
      <Box style={styles.boxContainer} rounded="lg">
        <Image
          source={{
            uri: bookImageUri,
          }}
          alt="Book Thumbnail"
          style={styles.bookImage}
        />
        <Text style={styles.textTitle}>{book.book.title}</Text>
        <Text style={styles.textDate} color="grey">
          {new Date(
            book.dateFinished || book.dateStarted || book.createdAt
          ).toLocaleDateString()}
        </Text>
      </Box>
    </Pressable>
  );
};

export default BookCard;
