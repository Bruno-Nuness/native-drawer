// Feed.js
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Alert, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: "#B3B3B3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 35,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recording: {
    backgroundColor: "#1DB954",
  },
});

export default function Notes() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingFileURI, setRecordingFileURI] = useState<string | null>(null);

  async function handleRecordingStart() {
    //saber se tenho permissão de microfone
    const { granted } = await Audio.requestPermissionsAsync();
    if (granted) {
      try {
        const { recording } = await Audio.Recording.createAsync();
        setRecording(recording);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Erro ao gravar",
          "Não foi possivel iniciar a gravação do áudio."
        );
      }
    }
  }

  async function handleRecordingStop() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const fileUri = recording.getURI();
        console.log("Aqui é o console.log da URI",fileUri)
        setRecordingFileURI(fileUri)
        setRecording(null)
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao pausar",
        "Não foi possivel parar a gravação do áudio."
      );
    }
  }

  async function handleAudioPlay(){
    if(recordingFileURI){
        //shouldPlay á para que ele comece a tocar o audio
       const {sound} =  await Audio.Sound.createAsync({uri:recordingFileURI}, {shouldPlay:true})
       //aqui é para que o audio inicie do inicio kkk
       await sound.setPositionAsync(0)
       console.log(sound)
       //aqui é para dar o play
       await sound.playAsync()
    }
  }

  useEffect(() => {
    //Pedir permissão para usar o microfone
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (granted) {
        Audio.setAudioModeAsync({
          //IOS configurações
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          //Android configurações
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true,
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Notas</Text>
      <Pressable
        onPressIn={handleRecordingStart}
        onPressOut={handleRecordingStop}
        style={[styles.button, recording && styles.recording]}
      >
        <MaterialIcons name="mic" size={44} color={"#212121"} />
      </Pressable>
      {recording && <Text style={styles.label}>Gravando</Text>}
      {recordingFileURI && <Button title="Ouvir áudio" onPress={handleAudioPlay}/>}
    </View>
  );
}
