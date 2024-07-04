import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#b0e3f7',
  },
  profilePhoto:{
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: '20%',
  },
  profilePhotoContainer: {
    flexDirection: 'column',
    marginTop: '5%',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '2%',
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: '20%',
  },

  post: {
    marginBottom: 16,
    backgroundColor: '#b0e3f7',
    borderRadius: 8,
  },
  idPost:{
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  publishButton: {
    marginLeft: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  publishButtonText: {
    color: '#fff',
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 16,
    alignSelf: 'center',
  },
  postUsername: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  postContentContainer: {
    flex: 1,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postButton: {
    marginRight: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  postButtonText: {
    color: '#fff',
  },
  likesText: {
    marginLeft: 8,
    color: '#888',
  },
});

export default styles;