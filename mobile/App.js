import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUri, setImageUri] = useState('https://via.placeholder.com/300'); // sample image
  const [editedImage, setEditedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://YOUR_NGROK_URL/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageBase64: imageUri })
      });
      const data = await response.json();
      setEditedImage(data.editedImage); // FLUX output
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FLUX.1 Kontext Mobile Editor</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Enter prompt..."
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title={loading ? "Editing..." : "Edit Image"} onPress={handleEdit} disabled={loading} />
      {editedImage && (
        <>
          <Text style={styles.subtitle}>Edited Image:</Text>
          <Image source={{ uri: editedImage }} style={styles.image} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginVertical: 10 },
  image: { width: 300, height: 300, marginVertical: 10 },
  input: { width: '100%', padding: 10, borderWidth: 1, marginVertical: 10 }
});
