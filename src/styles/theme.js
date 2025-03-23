// Theme and common styles for the app

export const colors = {
    primary: "#f7931a", // Bitcoin-style orange
    background: "#ffffff", // White background
    text: "#000000", // Black text
    lightGray: "#eeeeee", // Light gray for buttons
    gray: "#cccccc", // Gray for borders and placeholders
  };
  
  export const commonStyles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    headerText: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
      alignSelf: "center",
      marginVertical: 10,
    },
    bigText: {
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 20,
      color: colors.text,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: colors.gray,
      fontSize: 18,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  };
  