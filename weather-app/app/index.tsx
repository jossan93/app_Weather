import { Text, View, StyleSheet, TextInput, Button} from "react-native";
import React, { useState } from "react";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function Index() {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState<any>(null);

  const getWeather = async () => {
    try {
      console.log("API_KEY used:", API_KEY);

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      const data = await response.json();
      setweather(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Väder app</Text>
      <TextInput
      style={styles.input}
      placeholder="Stad"
      value={city}
      onChangeText={setcity}
    />

     <Button title="Hämta väder" onPress={getWeather} />

           {weather && weather.main && (
        <View style={styles.result}>
          <Text style={styles.text}>Stad: {weather.name}</Text>
          <Text style={styles.text}>Temperatur: {weather.main.temp}°C</Text>
          <Text style={styles.text}>
            Väder: {weather.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, width: "80%", marginBottom: 10, borderRadius: 5 },
  result: { marginTop: 20, alignItems: "center" },
  text: { fontSize: 18 }
});
