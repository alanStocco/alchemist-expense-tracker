import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { commonStyles, colors } from "../styles/theme";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={[commonStyles.title, { fontSize: 25, fontWeight: "bold", marginBottom: 20, marginTop: 30  }]}>
          Welcome to Alchemist Expense Tracker
        </Text>
        <Text style={[commonStyles.subtitle, { marginBottom: 55 }]}>
          Alchemist helps you manage your money. Because money is time. And time is all.
        </Text>
        <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>
          • Set a budget and Alchemist will help you manage your money.
        </Text>

        <Text style={[commonStyles.subtitle, { marginBottom: 80 }]}>
          • Insert your expenses and Alchemist will calculate your daily spendings.
        </Text>
        

        <TouchableOpacity
          style={[commonStyles.button, { paddingVertical: 20, marginTop: 40 }]}
          onPress={() => navigation.navigate("SetBudget")}
        >
          <Text style={[commonStyles.buttonText, { fontSize: 20 }]}>
            Set a Budget
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
