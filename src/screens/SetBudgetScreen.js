import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { commonStyles, colors } from "../styles/theme";

const SetBudgetScreen = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [perDay, setPerDay] = useState(0);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState("start"); // start or end

  // Calculate max daily spending
  useEffect(() => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const budget = parseFloat(amount);
    if (!isNaN(budget) && diffDays > 0) {
      setPerDay(Math.floor(budget / diffDays));
    } else {
      setPerDay(0);
    }
  }, [amount, startDate, endDate]);

  const showDatePicker = (type) => {
    setDateType(type);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (dateType === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    hideDatePicker();
  };

  const saveBudget = async () => {
    const budgetData = {
      amount,
      currency,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      perDay,
    };
    await AsyncStorage.setItem("budget", JSON.stringify(budgetData));
    navigation.replace("InsertExpense");
  };

  const getDaysDifference = () => {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={[commonStyles.content, { paddingVertical: 30 }]}>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 25, color: colors.text }}>
          Set your budget
        </Text>

        <Text style={{ fontSize: 40, fontWeight: "bold", color: colors.text, textAlign: "center", marginBottom: 30 }}>
          {amount ? `${currency || "€"} ${amount}` : "Enter Amount"}
        </Text>

        <TextInput
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          style={[commonStyles.input, { marginBottom: 20 }]}
        />

        <View style={{ marginBottom: 25 }}>
          <Text style={commonStyles.subtitle}>Date Range ({getDaysDifference()} days)</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity style={commonStyles.dateButton} onPress={() => showDatePicker("start")}>
              <Text>Start: {startDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.dateButton} onPress={() => showDatePicker("end")}>
              <Text>End: {endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={commonStyles.subtitle}>Currency</Text>
        <TextInput
          value={currency}
          onChangeText={setCurrency}
          placeholder="e.g. EUR, USD"
          style={[commonStyles.input, { marginBottom: 20 }]}
        />

        <Text style={[commonStyles.perDayText, { marginBottom: 30 }]}>
          Max per day: {perDay} {currency || ""}
        </Text>

        <TouchableOpacity style={[commonStyles.button, { alignSelf: "stretch" }]} onPress={saveBudget}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetBudgetScreen;
