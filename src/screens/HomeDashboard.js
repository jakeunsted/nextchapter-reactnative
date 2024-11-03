import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, ScrollView } from 'native-base';
import theme from '../styles/theme';
import {
  profileImage,
  profileImageContainer,
  userProfileContainer,
  userInfoContainer,
} from '../styles/styles';

/*
stores
*/
import { BookStore } from '../stores/BookStore';
import { AuthStore } from '../stores/AuthStore';

/*
components
*/
import BookCard from '../components/books/BookCard';

const HomeDashboard = (props) => {
  const [booksLoading, setBooksLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [readBooks, setReadBooks] = useState([]);
  const [user, setUser] = useState({});

  const goToBookDetails = (bookId) => {
    console.log('getBookDetails for bookid', bookId);
    // props.navigation.navigate(
    //   'BookDetails',
    //   { userId: user.id, bookId }
    // );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await AuthStore.getState().initialiseAuth();
        const userFromStore = AuthStore.getState().getUser();
        setUser(userFromStore);

        let books = BookStore.getState().getAllBooks();
        if (!books.length) {
          await BookStore.getState().fetchBooks(userFromStore.id);
          books = BookStore.getState().getAllBooks();
        }
        setReadBooks(books);
        setUserLoading(false);
      } catch (error) {
        console.error('An error occurred while fetching user books:', error);
      } finally {
        setBooksLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <ScrollView>
      <View>
        {!userLoading && user && (
          <View style={userProfileContainer}>
            <View style={profileImageContainer}>
              <View style={profileImage}>
                <Text>JU</Text>
              </View>
            </View>
            <View style={userInfoContainer}>
              <Text>{user.username}</Text>
              <Text>Date Joined: {
                new Date(user.createdAt).toLocaleDateString('en-GB')
              }
              </Text>
            </View>
            <View style={styles.divider} />
          </View>
        )}

        {!booksLoading ? (
          readBooks.length ? (
            <View style={styles.booksContainer}>
              {readBooks.map((book) => (
                <BookCard
                  key={book.book.id}
                  book={book}
                  goToBookDetails={goToBookDetails}
                />
              ))}
            </View>
          ) : (
            <Text>You haven't read any books yet. Add your first book!</Text>
          )
        ) : (
          <ActivityIndicator size="large" color="blue" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = {
  // userProfileContainer: {
  //   alignItems: 'center',
  //   marginTop: 40,
  // },
  // profileImageContainer: {
  //   marginBottom: 20,
  // },
  // profileImage: {
  //   borderRadius: 40,
  //   width: 80,
  //   height: 80,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: theme.colors.primary.DEFAULT,
  // },
  // userInfoContainer: {
  //   alignItems: 'center',
  // },
  divider: {
    height: 2,
    backgroundColor: 'grey',
    width: '80%',
    marginVertical: 20,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default HomeDashboard;
