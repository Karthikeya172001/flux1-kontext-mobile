import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUri, setImageUri] = useState('https://via.placeholder.com/300'); 
  const [editedImage, setEditedImage] = useState(null);

  const handleEdit = async () => {
    try {
      const response = await fetch('http://YOUR_BACKEND_URL:5000/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageBase64: imageUri })
      });
      const data = await response.json();
      setEditedImage(data.editedImage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FLUX.1 Kontext Mobile Editor</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Enter prompt..."
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Edit Image" onPress={handleEdit} />
      {editedImage && <Image source={{ uri: editedImage }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 300, height: 300, marginVertical: 10 },
  input: { width: '100%', padding: 10, borderWidth: 1, marginVertical: 10 }
});
