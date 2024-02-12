import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/store/store';
import Loader from './src/components/Loader';
import { ToastProvider } from 'react-native-toast-notifications';


function App() {
    return (
        <Provider store={store}>
            <ToastProvider
                renderType={{
                    custom_type: (toast) => (
                        <View style={{ padding: 50, backgroundColor: 'grey' }}>
                            <Text>{toast.message}</Text>

                        </View>
                    )
                }}
                placement="bottom | top"
                duration={10000}
                animationType='slide-in | zoom-in'
                animationDuration={250}
                successColor="green"
                dangerColor="red"
                warningColor="orange"
                normalColor="gray"
                // icon={<Icon />}
                // successIcon={<SuccessIcon />}
                // dangerIcon={<DangerIcon />}
                // warningIcon={<WarningIcon />}
                textStyle={{ fontSize: 20 }}
                offset={50}
                offsetTop={30}
                offsetBottom={40}
                swipeEnabled={true}>
                <NavigationContainer>
                    <Loader />
                    <StackNavigator />
                </NavigationContainer>
            </ToastProvider>
        </Provider>
    );
}

export default App;
























// import React, { useCallback } from 'react';
// import {
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     Text,
//     useColorScheme,
//     View,
// } from 'react-native';
// import { ToastProvider } from 'react-native-toast-notifications'

// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import StackNavigator from './src/navigation/StackNavigator';
// import { useFonts } from 'expo-font';
// import store from './src/store/store';
// import Loader from './src/components/Loader';
// import * as SplashScreen from 'expo-splash-screen';
// import SignIn from './src/screens/SignIn';

// function App() {
//     const isDarkMode = useColorScheme() === 'dark';

//     const backgroundStyle = {
//         backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//     };

//     const [fontsLoaded] = useFonts({
//         'SourceSansPro-Regular': require('./src/assets/fonts/SourceSansPro-Regular.ttf'),
//         'SourceSansPro-SemiBold': require('./src/assets/fonts/SourceSansPro-SemiBold.ttf'),
//     });

//     const onLayoutRootView = useCallback(async () => {
//         if (fontsLoaded) {
//             await SplashScreen.hideAsync();
//         }
//     }, [fontsLoaded]);

//     if (!fontsLoaded) {
//         return null;
//     }

//     return (
//         <ToastProvider
//             renderType={{
//                 custom_type: (toast) => (
//                     <View style={{ padding: 50, backgroundColor: 'grey' }}>
//                         <Text>{toast.message}</Text>
//                     </View>
//                 )
//             }}
//             placement="bottom | top"
//             duration={10000}
//             animationType='slide-in | zoom-in'
//             animationDuration={250}
//             successColor="green"
//             dangerColor="red"
//             warningColor="orange"
//             normalColor="gray"
//             // icon={<Icon />}
//             // successIcon={<SuccessIcon />}
//             // dangerIcon={<DangerIcon />}
//             // warningIcon={<WarningIcon />}
//             textStyle={{ fontSize: 20 }}
//             offset={50}
//             offsetTop={30}
//             offsetBottom={40}
//             swipeEnabled={true}>
//             <SafeAreaProvider onLayout={onLayoutRootView}>
//                 <Provider store={store}>
//                     <SafeAreaView style={backgroundStyle}>
//                         <StatusBar
//                             barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//                             backgroundColor={backgroundStyle.backgroundColor}
//                         />
//                         <ScrollView
//                             contentInsetAdjustmentBehavior="automatic"
//                             style={backgroundStyle}>
//                             <View
//                                 style={{
//                                     backgroundColor: isDarkMode ? Colors.black : Colors.white,
//                                 }}>
//                                 <Loader />
//                                 <NavigationContainer>
//                                     <StackNavigator />
//                                 </NavigationContainer>
//                             </View>
//                         </ScrollView>
//                     </SafeAreaView>
//                 </Provider>
//             </SafeAreaProvider>
//         </ToastProvider>
//     );
// }

// export default App;
