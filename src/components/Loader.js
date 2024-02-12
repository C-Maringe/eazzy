import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  Modal, StyleSheet
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { theme } from '../constants';

const Loader = ({ }) => {
  const loadingState = useSelector((state) => state.loading.state);

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={loadingState}>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="dark-content" />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color={theme.colors.blue2} />
            <Text style={{ marginLeft: 25, color: theme.colors.blue2, fontWeight: 600, fontSize: 16 }}>Processing...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: "flex",
    flexDirection: "row"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Loader;
