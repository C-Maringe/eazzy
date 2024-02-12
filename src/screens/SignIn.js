import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ParsedText from 'react-native-parsed-text';

import { components } from '../components';
import { theme } from '../constants';
import { svg } from '../assets/svg';
import clientWrapper from '../../clientWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { IsAdminLogedIn, IsAdminLogedOut } from '../store/Auth/IsAdmin';
import { IsloggedInTRIGGER } from '../store/Auth/Islogged';

const SignIn = ({ navigation }) => {
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch()

    const handleRegister = () => {
        navigation.navigate('SignUp');
    };

    const renderHeader = () => {
        return <components.Header goBack={false} />;
    };

    const renderStatusBar = () => {
        return (
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
        );
    };

    const [inputsStateManager, setInputsStateManager] = useState({ email: "", emailErr: false, password: "", passwordErr: false })

    const handleInputChange = (text, key) => {
        setInputsStateManager({ ...inputsStateManager, [key]: text });
    };

    const handlelogindata = {
        username: inputsStateManager.email,
        password: inputsStateManager.password
    };

    const handleLogin = () => {
        console.log(handlelogindata)
        clientWrapper.post("/api/login/", handlelogindata)
            .then((response) => {
                if (response.data.status_code === 200) {
                    dispatch({ type: "USER_INFO_STORED", payload: response.data.user[0] })
                    if (response.data.user[0].employee_status === 'ACTIVE') {
                        if (response.data.user[0].role === 'ADMIN') {
                            dispatch(IsAdminLogedIn())
                            dispatch(IsloggedInTRIGGER())
                            setTimeout(() => {
                                navigation.navigate('TabNavigator');
                            }, 2000)
                        }
                        else {
                            dispatch(IsAdminLogedOut())
                            dispatch(IsloggedInTRIGGER())
                            setTimeout(() => {
                                navigation.navigate('TabNavigator');
                            }, 2000)
                        }
                    }
                }
            })
            .catch((error) => { console.log(error); })
    }

    const renderContent = () => {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                }}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={{
                        ...theme.fonts.SourceSansPro_SemiBold_32,
                        lineHeight: theme.fonts.SourceSansPro_SemiBold_32.fontSize * 1.6,
                        color: theme.colors.blue2,
                        marginBottom: theme.sizes.marginBottom_30,
                    }}
                >
                    Welcome to your{"\n"} mobile retail app!
                </Text>
                <components.InputField
                    emailIcon={true}
                    placeholder="caspermaringe@gmail.com"
                    containerStyle={{ marginBottom: theme.sizes.marginBottom_10 }}
                    checkIcon={true}
                    onChangeText={text => handleInputChange(text, 'email')}
                    keyboardType="email-address"
                    isError={inputsStateManager.emailErr}
                    valueErrTxt="email address"
                />
                <components.InputField
                    keyIcon={true}
                    placeholder="••••••"
                    secureTextEntry={true}
                    eyeOffIcon={true}
                    containerStyle={{ marginBottom: theme.sizes.marginBottom_20 }}
                    onChangeText={text => handleInputChange(text, 'password')}
                    keyboardType="default"
                    isError={inputsStateManager.passwordErr}
                    valueErrTxt="password"
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: theme.sizes.marginBottom_30,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        onPress={() => setRememberMe((rememberMe) => !rememberMe)}
                    >
                        <View
                            style={{
                                width: 18,
                                height: 18,
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: theme.colors.blue2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: theme.colors.white,
                            }}
                        >
                            {rememberMe && <svg.ActiveCheckSvg />}
                        </View>
                        <Text
                            style={{
                                marginLeft: 10,
                                ...theme.fonts.SourceSansPro_Regular_16,
                                lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                                color: theme.colors.bodyTextColor,
                            }}
                        >
                            Remember me
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 'auto' }}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text
                            style={{
                                ...theme.fonts.SourceSansPro_Regular_16,
                                lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                                color: theme.colors.mainColor,
                            }}
                        >
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <components.Button
                    title="Sign In"
                    containerStyle={{ marginBottom: theme.sizes.marginBottom_30 }}
                    onPress={handleLogin}
                />
                <ParsedText
                    style={{
                        ...theme.fonts.SourceSansPro_Regular_16,
                        lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                        color: theme.colors.bodyTextColor,
                    }}
                    parse={[
                        {
                            pattern: /Register now/,
                            style: { color: theme.colors.mainColor },
                            onPress: handleRegister,
                        },
                    ]}
                >
                    No account? Register now
                </ParsedText>
            </KeyboardAwareScrollView>
        );
    };

    const renderFooter = () => {
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <Text
                    style={{
                        ...theme.fonts.SourceSansPro_Regular_16,
                        lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                        color: theme.colors.bodyTextColor,
                        paddingTop: 10,
                    }}
                >
                    Log in with social networks
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 20,
                        paddingTop: theme.sizes.paddingTop_20,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: '31%',
                            height: 40,
                            backgroundColor: theme.colors.blue5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                        }}
                    >
                        <svg.FacebookSvg />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '31%',
                            height: 40,
                            backgroundColor: theme.colors.blue5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                        }}
                    >
                        <svg.TwitterSvg />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '31%',
                            height: 40,
                            backgroundColor: theme.colors.blue5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                        }}
                    >
                        <svg.GoogleSvg />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <components.SafeAreaView background={true}>
            {renderStatusBar()}
            {renderHeader()}
            {renderContent()}
            {renderFooter()}
        </components.SafeAreaView>
    );
};

export default SignIn;
