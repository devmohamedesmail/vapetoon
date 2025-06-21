import React, { useState } from "react";
import { Div, ThemeProvider, Radio, Text } from "react-native-magnus";
import { TouchableOpacity } from "react-native";
import custom_colors from "../../../config/custom_colors";
export default function Payment_options({activePaymentMethods}) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });

  const handlePaymentSelection = (methodId) => {
    setSelectedPayment(methodId);
  };

  return (
   <Div m="lg">
      {activePaymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          onPress={() => handlePaymentSelection(method.id)}
        >
          <Div
            bg={selectedPayment === method.id ? custom_colors.primary : "blue100"}
            px="xl"
            py="lg"
            rounded="md"
            alignItems="center"
            my={6}
          >
            <Text color={selectedPayment === method.id ? "white" : "gray800"}>
              {method.title}
            </Text>
          </Div>
        </TouchableOpacity>
      ))}

      {/* Show card input if Credit Card (Stripe) is selected */}
      {selectedPayment === "stripe" && (
        <Div my="lg">
          <Text>Card Number</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            placeholder="1234 5678 9876 5432"
            keyboardType="numeric"
            value={cardDetails.number}
            onChangeText={(text) => setCardDetails({ ...cardDetails, number: text })}
          />
          <Text>Expiry</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
          />
          <Text>CVV</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            placeholder="123"
            keyboardType="numeric"
            secureTextEntry
            value={cardDetails.cvv}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
          />
        </Div>
      )}
    </Div>
  );
}
