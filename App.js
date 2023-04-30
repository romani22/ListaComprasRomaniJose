import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import Modal from './src/components/Modal';

export default function App() {
	const [textItem, setTextItem] = useState('');
	const [cantItem, setCantItem] = useState('');
	const [list, setList] = useState([]);
	const [itemSelected, setItemSelected] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [buttonDeleteVisible, setButtonDeleteVisible] = useState(styles.ButtonOculto);

	const onHandleChangeText = (text) => {
		setTextItem(text);
	};
	const onHandleChangeCant = (number) => {
		setCantItem(number);
	};

	const addItem = () => {
		if (textItem != '' && cantItem > 0) {
			setList((prevState) => [...prevState, { name: textItem, cantidad: cantItem, id: Math.random().toString() }]);
			setTextItem('');
			setCantItem('');
		} else {
			alert('debes agregar un elemento a cargar a la lista');
		}
	};

	const onHandleDelete = (items) => {
		items.forEach((item) => {
			setList((prevState) => prevState.filter((element) => element.name !== item));
		});
		setModalVisible(!modalVisible);
		setButtonDeleteVisible(styles.ButtonOculto);
	};

	const onHandleModal = () => {
		setModalVisible(true);
	};
	const onHandleCancel = () => {
		setModalVisible(false);
	};
	const onHandleSelect = (item) => {
		if (itemSelected.includes(item.name)) {
			setItemSelected(itemSelected.filter((elem) => elem !== item.name));
			if (itemSelected.length <= 1) {
				setButtonDeleteVisible(styles.ButtonOculto);
			}
		} else {
			setItemSelected([...itemSelected, item.name]);
			if (itemSelected.length >= 0) {
				setButtonDeleteVisible(styles.ButtonDelete);
			}
		}
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={itemSelected.includes(item.name) ? styles.renderItemStyleActive : styles.renderItemStyle} onPress={() => onHandleSelect(item)}>
			<Text style={styles.nameItemStyle}>{item.name}</Text>
			<Text style={styles.cantItemStyle}>{item.cantidad} uni.</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={styles.titleContainer}>Lista de compra</Text>
				<View style={styles.addItemContainer}>
					<TextInput placeholder="Nombre del Elemento" style={styles.input} onChangeText={onHandleChangeText} value={textItem} />
					<TextInput keyboardType="numeric" maxLength={4} placeholder="Cantidad" style={styles.input} onChangeText={onHandleChangeCant} value={cantItem} />
					<TouchableOpacity style={styles.Button} onPress={addItem}>
						<Text style={styles.textButton}>Agregar a Lista</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.listContainer}>
				<FlatList data={list} renderItem={renderItem} keyExtractor={(item) => item.id} />
			</View>
			<TouchableOpacity style={buttonDeleteVisible} onPress={() => onHandleModal()}>
				<Text style={styles.textButton}>Eliminar</Text>
			</TouchableOpacity>
			<Modal isVisible={modalVisible} acctionDeletItem={() => onHandleDelete(itemSelected)} itemSelected={itemSelected} acctionCancel={() => onHandleCancel()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fdfd96',
		padding: 3,
	},
	inputContainer: {
		paddingHorizontal: 30,
		paddingTop: 50,
	},
	titleContainer: {
		marginBottom: 10,
		fontSize: 40,
		fontWeight: '500',
		color: '#292929',
	},
	addItemContainer: {
		padding: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		marginHorizontal: 5,
		backgroundColor: '#d7d7d7',
		padding: 2,
		borderRadius: 3,
		shadowColor: 'black',
		shadowOpacity: 0.9,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 3,
		elevation: 3,
	},
	Button: {
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#77dd77',
		shadowColor: 'black',
		shadowOpacity: 0.9,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 3,
		elevation: 3,
		marginHorizontal: 5,
	},
	ButtonDelete: {
		padding: 10,
		marginBottom: 10,
		marginHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#ff6961',
		fontWeight: 'bold',
	},
	ButtonOculto: {
		display: 'none',
	},
	textButton: {
		color: '#000000',
		fontWeight: 'bold',
	},
	listContainer: {
		flex: 4,
		marginHorizontal: 10,
		backgroundColor: '#d7d7d7',
		padding: 5,
		borderRadius: 15,
		marginVertical: 10,
		shadowColor: 'black',
		shadowOpacity: 0.9,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 3,
		elevation: 3,
	},
	renderItemStyle: {
		flexDirection: 'row',
		marginBottom: 5,
		backgroundColor: '#a9a9a9ff',
		borderRadius: 10,
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowColor: 'black',
		shadowOpacity: 0.7,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 3,
		elevation: 3,
	},
	renderItemStyleActive: {
		flexDirection: 'row',
		marginBottom: 5,
		backgroundColor: '#ff6961',
		borderRadius: 10,
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowColor: 'black',
		shadowOpacity: 0.7,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 3,
		elevation: 3,
	},
	nameItemStyle: {
		color: '#000000',
		fontWeight: 'bold',
	},
	cantItemStyle: {
		color: '#000000',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
