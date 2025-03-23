import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InsertExpense() {
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [dailyValue, setDailyValue] = useState(0);

  // Load current budget and calculate daily value
  useEffect(() => {
    const fetchBudget = async () => {
      const stored = await AsyncStorage.getItem("budget");
      if (stored) {
        const budget = JSON.parse(stored);
        const today = new Date();
        const endDate = new Date(budget.endDate);
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) + 1;

        const daily = daysLeft > 0 ? Math.floor(parseFloat(budget.amount) / daysLeft) : 0;
        setDailyValue(daily);
      }
    };
    fetchBudget();
  }, []);

  // Handle button presses
  const handlePress = async (value) => {
    if (value === "BACK") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === "OK") {
      const expenseValue = parseFloat(amount);
      if (isNaN(expenseValue) || expenseValue <= 0) {
        Alert.alert("Invalid amount", "Please enter a valid amount.");
        return;
      }

      const expense = {
        amount: expenseValue,
        note,
        date: new Date().toISOString(),
      };

      // Save expense to AsyncStorage
      const expenses = await AsyncStorage.getItem("expenses");
      const expensesArray = expenses ? JSON.parse(expenses) : [];
      expensesArray.push(expense);
      await AsyncStorage.setItem("expenses", JSON.stringify(expensesArray));

      // Update budget amount
      const storedBudget = await AsyncStorage.getItem("budget");
      if (storedBudget) {
        const budget = JSON.parse(storedBudget);
        const newAmount = parseFloat(budget.amount) - expenseValue;
        budget.amount = newAmount >= 0 ? newAmount.toFixed(2) : "0";

        const today = new Date();
        const endDate = new Date(budget.endDate);
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) + 1;

        const updatedDaily = daysLeft > 0 ? Math.floor(parseFloat(budget.amount) / daysLeft) : 0;
        setDailyValue(updatedDaily);
        await AsyncStorage.setItem("budget", JSON.stringify(budget));
      }

      // Reset input
      setAmount("0");
      setNote("");
    } else {
      setAmount((prev) => (prev === "0" ? value : prev + value));
    }
  };

  // Render a numeric keypad button
  const renderButton = (label, style = {}) => (
    <TouchableOpacity
      style={[styles.keyButton, style]}
      onPress={() => handlePress(label)}
      key={label}
    >
      <Text style={styles.keyText}>
        {label === "BACK" ? "←" : label === "OK" ? "✔" : label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dailyText}>New daily €{dailyValue}</Text>
      </View>
      <Text style={styles.amountText}>€ {amount}</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Add note"
        value={note}
        onChangeText={setNote}
      />
      <View style={styles.keyboardContainer}>
        <View style={styles.row}>
          {["7", "8", "9", "BACK"].map((key) => renderButton(key))}
        </View>
        <View style={styles.row}>
          {["4", "5", "6", "."].map((key) => renderButton(key))}
        </View>
        <View style={styles.row}>
          {["1", "2", "3", "0"].map((key) => renderButton(key))}
        </View>
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => handlePress("OK")}
        >
          <Text style={styles.okButtonText}>✔</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  dailyText: {
    backgroundColor: "#f7931a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  amountText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  noteInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 18,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  keyboardContainer: { gap: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  keyButton: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  keyText: { fontSize: 24, fontWeight: "bold" },
  okButton: {
    width: "100%",
    backgroundColor: "#f7931a",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  okButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
