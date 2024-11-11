import React, {useState} from 'react'
import { SafeAreaView, View, ScrollView, TextInput, Button, StyleSheet } from 'react-native';


const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [kelas, setKelas] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    return (
        <SafeAreaView>
         <View>
          <Text>Tambah Data Mahasiswa</Text>
           <ScrollView>
            <TextInput placeholder="Nama Depan" value={first_name} onChangeText={(value) => setFirstName(value)} />
            <TextInput placeholder="Nama Belakang" value={last_name} onChangeText={(value) => setLastName(value)} />
            <TextInput placeholder="Kelas" value={kelas} onChangeText={(value) => setKelas(value)} />
            <TextInput placeholder="Jenis Kelamin" value={gender} onChangeText={(value) => setGender(value)} />
            <TextInput placeholder="Email" value={email} onChangeText={(value) => setEmail(value)} />
            <Button title="Simpan" style={styles.button} onPress={submit} />
           </ScrollView>
         </View>
        </SafeAreaView>
       )
       
}

export default Createdata
