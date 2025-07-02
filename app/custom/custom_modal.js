import React from 'react';
import { Modal, View, Pressable, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-magnus'; // أو استبدله بأي Icon آخر

export default function CustomModal({ visible, onClose, children }) {
    return (
        <Modal
            animationType="slide"
            
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" color="black" />
                    </Pressable>

                    {/* Modal Content */}
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        height:400,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
});
