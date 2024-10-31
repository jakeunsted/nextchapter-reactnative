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
  image: {
    paddingBottom: 8,
    maxHeight: 200,
    width: 120,
    height: 200,
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
      <Box alignItems="center">
        <Image
          source={{
            uri: bookImageUri,
          }}
          alt="Book Thumbnail"
          style={styles.image}
        />
        <Text>{book.book.title}</Text>
        <Text color="gray.500">
          {new Date(
            book.dateFinished || book.dateStarted || book.createdAt
          ).toLocaleDateString()}
        </Text>
      </Box>
    </Pressable>
  );
};

export default BookCard;
