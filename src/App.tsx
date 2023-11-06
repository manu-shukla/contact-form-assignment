import React from 'react';
import ContactScreen from "./screens/ContactScreen";
import {SafeAreaView} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";



function App() {
    return (
        <SafeAreaProvider>
            <ContactScreen/>
        </SafeAreaProvider>
    );
}

export default App;
