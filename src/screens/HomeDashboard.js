import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookStore } from '../stores/BookStore';
import { AuthStore } from '../stores/AuthStore';

class HomeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarVisible: false,
      snackbarMessage: '',
      snackbarColor: 'success',
      booksLoading: true,
      userLoading: true,
      readBooks: [],
      user: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let toastMsg = this.props.route.params?.toast;
    if (toastMsg) {
      if (toastMsg === 'book-started') {
        this.showToast('Book has been started!');
      }
      if (toastMsg === 'book-read') {
        this.showToast('Book has been marked as read!');
      }
    }

    try {
      this.setState({ user: AuthStore().getUser() });
      console.log('user', this.state.user);
      // let books = await BookStore().getAllBooks();
      // if (!books.length) {
      //   books = await BookStore().fetchBooks(this.state.user.id);
      // }
      // this.setState({ readBooks: books });
    } catch (error) {
      console.error('An error occurred while fetching user books:', error);
    } finally {
      this.setState({ booksLoading: false, userLoading: false });
    }
  };

  showToast = (message, color = 'success') => {
    this.setState({
      snackbarMessage: message,
      snackbarColor: color,
      snackbarVisible: true,
    });
  };

  goToBookDetails = (bookId) => {
    this.props.navigation.navigate(
      'BookDetails',
      { userId: this.state.user.id, bookId }
    );
  };

  render() {
    return (
      <View>
        {this.state.snackbarVisible && (
          <View style={styles.snackbarContainer}>
            <Text>{this.state.snackbarMessage}</Text>
            <TouchableOpacity
              onPress={() => this.setState({ snackbarVisible: false })}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {!this.state.userLoading && this.state.user && (
          <View style={styles.userProfileContainer}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Text>JU</Text>
              </View>
            </View>
            <View style={styles.userInfoContainer}>
              <Text>{this.state.user.username}</Text>
              <Text>Date Joined: {
                new Date(this.state.user.createdAt).toLocaleDateString('en-GB')
              }
              </Text>
            </View>
            <View style={styles.divider} />
          </View>
        )}

        {!this.state.booksLoading ? (
          this.state.readBooks.length ? (
            <View style={styles.booksContainer}>
              {this.state.readBooks.map((book) => (
                <TouchableOpacity
                  key={book.book.id}
                  style={styles.bookItem}
                  onPress={() => this.goToBookDetails(book.id)}
                >
                  <View style={styles.bookDetailsContainer}>
                    <Image
                      source={{
                        uri: book.book.bookDetails?.
                          volumeInfo?.imageLinks?.thumbnail || book.image,
                      }}
                      style={styles.bookImage}
                    />
                    <Text style={styles.bookTitle}>{book.book.title}</Text>
                    <Text style={styles.bookDate}>
                      {new Date(
                        book.dateFinished || book.dateStarted || book.createdAt
                      ).toLocaleDateString()
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>You haven't read any books yet. Add your first book!</Text>
          )
        ) : (
          <ActivityIndicator size="large" color="blue" />
        )}
      </View>
    );
  }
}

const styles = {
  snackbarContainer: {
    backgroundColor: 'success',
    padding: 10,
  },
  userProfileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    backgroundColor: 'blue',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
  },
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
  bookItem: {
    padding: 10,
  },
  bookDetailsContainer: {
    maxWidth: 176,
    minWidth: 176,
    padding: 10,
    borderRadius: 20,
    elevation: 10,
  },
  bookImage: {
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  bookTitle: {
    textAlign: 'center',
  },
  bookDate: {
    textAlign: 'center',
    color: 'grey',
  },
};

export default HomeDashboard;
