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
  },
};

const goToBookDetails = (bookId) => {
  console.log('goToBookDetails', bookId);
};

const BookCard = (props) => {
  const { book } = props;
  return (
    <Pressable
      onPress={() => goToBookDetails(book.id)}
      style={styles.pressable}
    >
      <Box alignItems="center">
        <Image
          source={{
            uri: book.book.bookDetails?.
              volumeInfo?.imageLinks?.thumbnail || book.image,
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

// in nuxtJS, I have the following:
/*
<v-card
  class="max-w-44 min-w-44 p-2"
  rounded="xl"
  elevation="10"
  @click="goToBookDetails(book.id)"
>
  <v-card-text class="text-wrap text-center">
    <v-img
      :src="book.book.bookDetails?.
        volumeInfo?.imageLinks?.thumbnail ||
        book.image"
      class="pb-2 max-h-50"
    ></v-img>
    <p>{{ book.book.title }}</p>
    <p class="text-grey">
      {{
        new Date(book.dateFinished ||
          book.dateStarted ||
          book.createdAt).toLocaleDateString()
      }}
    </p>
  </v-card-text>
</v-card>
*/

export default BookCard;
