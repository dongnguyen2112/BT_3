import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button, TextInput, Title } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const TodoApp = () => {
    const [newToDo, setNewToDo] = useState("")
    const [toDos, setToDos] = useState([])
    const cToDos = firestore().collection("ToDos")

    const addNewToDo = () => {
        cToDos.add({
            title: newToDo,
            complete: false
        })
            .then(() => console.log("Add New ToDo"))
            .catch(e => console.log(e.message))
    }

    useEffect(() => {
        const unsubscribe = cToDos.onSnapshot(
            listToDos => {
                var result = []
                listToDos.forEach(
                    todo => {
                        const { title, complete } = todo.data()
                        result.push({
                            id: todo.id,
                            title,
                            complete
                        })
                    }
                )
                console.log(result)
                setToDos(result)
            }
        )
        return () => unsubscribe()
    }, [])

    const updateToDo = ({ id, complete }) => {
        cToDos.doc(id)
            .update({
                complete: !complete
            })
            .then(() => console.log("Da update trang thai !"))
    }

    const renderItem = ({ item }) => {
        const { id, title, complete } = item
        return (
            <View style={styles.todoItem}>
                <Button
                    mode="contained"
                    onPress={() => updateToDo(item)}
                    style={{ marginRight: 10, backgroundColor: complete ? "green" : "red" }}
                >
                    {complete ? "✓" : "X"}
                </Button>
                <Text style={{ flex: 1 }}>{title}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <Text style={styles.appBarTitle}>To Do App</Text>
            </View>

            <FlatList
                data={toDos}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    label="New To Do"
                    value={newToDo}
                    onChangeText={setNewToDo}
                    style={styles.input}
                />
                <Button mode="contained" onPress={addNewToDo} style={styles.addButton}>
                    Add New To Do
                </Button>
            </View>
        </View>
    )
}

export default TodoApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appBar: {
        backgroundColor: "#FF6666",
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    appBarTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center", // Để căn giữa tiêu đề
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: "blue",
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
})
