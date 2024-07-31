import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";

export default function App() {
  const [imageList, setImageList] = useState([]);
  async function pickImage() {
    const result = await launchImageLibraryAsync();

    if (result.canceled) {
      alert("No image selected");
    } else {
      setImageList([...imageList, result.assets[0].uri]);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={s.title}>My favorite pictures</Text>
        <View style={s.body}>
          <ScrollView>
            {imageList.map((uri, i) => (
              <Image style={s.image} key={uri + i} source={{ uri }} />
            ))}
          </ScrollView>
        </View>
        <View style={s.footer}>
          <TouchableOpacity style={s.btn} onPress={pickImage}>
            <Text style={s.btnTxt}>Add picture</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
