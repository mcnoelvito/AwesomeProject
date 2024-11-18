import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Portofolio from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPen, faUserGraduate, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {WebView} from 'react-native-webview';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import Createdata from './CreateData';
import Daftarmahasiswa from './List_data';
import EditData from './EditData';

function HomeScreen() {
  return (
      <Createdata/>
  );
}

function Damahasiswa() {
  return (
    <Mahasiswa/>
  );
}

function EditScreen() {
  return (
    <EditData/>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tambah Profil" component={HomeScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({color}) => 
         ( <FontAwesomeIcon icon={faPlusCircle} color={color} size={24}/> ),
        }}/>
        <Tab.Screen name="Data Mahasiswa" component={Daftarmahasiswa} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({color}) => 
         ( <FontAwesomeIcon icon={faUserGraduate} color={color} size={24}/> ),
        }}
        />
        <Tab.Screen name="Edit" component={EditScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({color}) => 
         ( <FontAwesomeIcon icon={faUserPen} color={color} size={24}/> ),
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}