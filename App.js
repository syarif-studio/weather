import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useSWR from "swr";

export default function App() {
  const [city, setCity] = useState("London");
  const [input, setInput] = useState("London");

  const { data } = useSWR(city, (city) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cfd46f0d13f4fc9345b8c62d13b1a60c`
    ).then((r) => r.json());
  });
  const handleCheckWeather = () => {
    setCity(input);
  };

  const icon = data?.weather?.[0]?.icon;
  const tempK = data?.main?.temp;
  const tempC = tempK ? parseInt(tempK - 273.13) : 0;
  const desc = data?.weather?.[0]?.description;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter city..."
          value={input}
          style={styles.input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleCheckWeather}>
          <Text style={styles.bottonText}>Check</Text>
        </TouchableOpacity>
      </View>
      {!!desc ? (
        <View style={styles.weatherContainer}>
          <Image
            source={{ uri: `http://openweathermap.org/img/wn/${icon}@4x.png` }}
            style={styles.image}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.basicText}>Today</Text>
            <Text style={styles.temperature}>{tempC} °C</Text>
            <Text style={styles.basicText}>{desc}</Text>
          </View>
        </View>
      ) : data?.message ? (
        <View style={styles.notFoundContainer}>
          <Text style={styles.basicText}>{data?.message}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#47BFDF",
    padding: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  input: {
    borderRadius: 4,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 16,
    marginRight: 16,
    color: "#fff",
    fontSize: 18,
    width: 200,
  },
  button: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 4,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottonText: {
    fontSize: 18,
  },
  weatherContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 240,
    height: 240,
  },
  detailContainer: {
    padding: 32,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  notFoundContainer: {
    marginTop: 32,
    padding: 32,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  temperature: {
    fontSize: 64,
    fontWeight: "bold",
  },
  basicText: {
    fontSize: 32,
  },
});
