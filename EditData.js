import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGraduationCap, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const selectItem = (item) => {
    setSelectedUser(item);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setKelas(item.kelas);
    setGender(item.gender);
    setEmail(item.email);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(jsonUrl);
      const json = await response.json();
      setDataUser(json);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = () => {
    const data = {
      first_name,
      last_name,
      email,
      kelas,
      gender,
    };

    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data tersimpan');
        setFirstName('');
        setLastName('');
        setEmail('');
        setKelas('');
        setGender('');
        fetchData(); // Refresh data setelah submit
      })
      .catch((error) => {
        console.error(error);
        alert('Terjadi kesalahan saat menyimpan data');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Edit Data Mahasiswa</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nama Depan"
              value={first_name}
              onChangeText={(value) => setFirstName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama Belakang"
              value={last_name}
              onChangeText={(value) => setLastName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Kelas"
              value={kelas}
              onChangeText={(value) => setKelas(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Jenis Kelamin"
              value={gender}
              onChangeText={(value) => setGender(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Button title="Simpan" onPress={submit} />
          </View>
        </View>
        <View style={styles.divider}></View>
        <FlatList
          style={{ marginBottom: 10 }}
          data={dataUser}
          onRefresh={fetchData}
          refreshing={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectItem(item)}>
              <View style={styles.card}>
                <View style={styles.avatar}>
                  <FontAwesomeIcon icon={faGraduationCap} size={50} />
                </View>
                <View>
                  <Text style={styles.cardtitle}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text>{item.kelas}</Text>
                  <Text>{item.gender}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <FontAwesomeIcon icon={faPenToSquare} size={20} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  form: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  avatar: {
    borderRadius: 100,
    width: 80,
  },
  cardtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
});
