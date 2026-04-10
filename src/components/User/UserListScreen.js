import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import api from "../../utils/api"; // Axios instance with baseURL + token

const UserListScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (err) {
            Alert.alert("Error", "Failed to fetch users");
        }
    };

    const deleteUser = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            Alert.alert("Success", "User deleted");
            fetchUsers();
        } catch (err) {
            Alert.alert("Error", "Failed to delete user");
        }
    };

    const suspendUser = async (id, status) => {
        try {
            await api.put(`/users/${id}`, { isSuspended: status });
            Alert.alert("Success", status ? "User suspended" : "User activated");
            fetchUsers();
        } catch (err) {
            Alert.alert("Error", "Failed to update user");
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>Role: {item.role}</Text>
            <Text>Status: {item.isSuspended ? "Suspended" : "Active"}</Text>

            <View style={styles.actions}>
                <Button
                    title={item.isSuspended ? "Activate" : "Suspend"}
                    onPress={() => suspendUser(item._id, !item.isSuspended)}
                />
                <Button
                    title="Delete"
                    color="red"
                    onPress={() =>
                        Alert.alert("Confirm", "Delete this user?", [
                            { text: "Cancel" },
                            { text: "OK", onPress: () => deleteUser(item._id) },
                        ])
                    }
                />
            </View>
        </View>
    );

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        margin: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        elevation: 2,
    },
    name: { fontWeight: "bold", fontSize: 16 },
    actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});

export default UserListScreen;
