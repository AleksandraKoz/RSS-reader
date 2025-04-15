import React from 'react';
import { Text, View, StyleSheet, Modal, TextInput } from 'react-native';

import Button from '../Base/Button.tsx';

interface IFeedModal {
  isVisible: boolean;
  value: string;
  setValue: (val: string) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const FeedModal = ({
  isVisible,
  value,
  setValue,
  onSave,
  onDelete,
  onClose,
}: IFeedModal): React.JSX.Element => {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit feed</Text>
          <TextInput
            style={styles.modalInput}
            value={value}
            onChangeText={setValue}
            placeholder="Enter new URL"
          />
          <View style={styles.modalButtonsRow}>
            <Button
              title="Delete"
              onPress={onDelete}
              variant="danger-outline"
              style={{ flex: 1 }}
            />
            <Button title="Save" onPress={onSave} variant="primary" style={{ flex: 1 }} />
          </View>
          <Button title="Cancel" onPress={onClose} variant="cancel-outline" />
        </View>
      </View>
    </Modal>
  );
};

export default FeedModal;

const styles = StyleSheet.create({
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    padding: 20,
    width: '80%',
  },
  modalInput: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
