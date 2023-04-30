import { Button, StyleSheet, Modal as NewModal, Text, View } from 'react-native';
import React from 'react';

const Modal = ({ isVisible, acctionDeletItem, itemSelected, acctionCancel }) => {
	return (
		<NewModal visible={isVisible} animationType="fade" transparent={false}>
			<View style={styles.modalContainer}>
				<View style={styles.cardModal}>
					<Text>Estas seguro que deseas borrar el/los items seleccionados?</Text>
					<View style={styles.containerButtons}>
						<View style={styles.ButtonConfirm}>
							<Button title="Si" color={'#ff6961'} onPress={() => acctionDeletItem(itemSelected)} />
						</View>
						<View style={styles.ButtonCancel}>
							<Button title="No" color={'#77dd77'} onPress={() => acctionCancel()} />
						</View>
					</View>
				</View>
			</View>
		</NewModal>
	);
};

export default Modal;

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: '#fdfd96',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardModal: {
		padding: 30,
		backgroundColor: '#fdcae1',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTextStyle: {
		fontSize: 30,
	},
	containerButtons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	ButtonConfirm: {
		width: 100,
		marginHorizontal: 10,
	},
	ButtonCancel: {
		width: 100,
		marginHorizontal: 10,
	},
});
