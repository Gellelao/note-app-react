import { StyleSheet } from 'react-native';

// For common styles used on multiple pages
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sSearchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 10,
    margin: 15,
    height: 70,
    width: 150,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18
  },
  filler: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.0)',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 300,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
})