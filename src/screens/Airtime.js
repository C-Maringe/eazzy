import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { setLoading } from '../store/Loading';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { components } from '../components';
import { theme } from '../constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useToast } from 'react-native-toast-notifications';

const Airtime = ({ navigation }) => {

    const dispatch = useDispatch();

    const [currency, setCurrency] = useState("RTGS")

    const [beneficiary, setBeneficiary] = useState("")
    const [beneficiaryErr, setBeneficiaryErr] = useState(false)
    const [ecocashNumber, setEcocashNumber] = useState("")
    const [ecocashNumberErr, setEcocashNumberErr] = useState(false)
    const [amount, setAmount] = useState("")
    const [amountErr, setAmountErr] = useState(false)

    const AirtimePayload = {
        "clientCorrelator": "I",
        "notifyUrl": "https://webhook.site/9f67a62f-0de7-4d0d-8584-c45159112bfd",
        "referenceCode": " REF-12345u",
        "tranType": "MER",
        "endUserId": ecocashNumber,
        "remarks": "test remarks",
        "transactionOperationStatus": "Charged",
        "paymentAmount": {
            "charginginformation": {
                "amount": amount,
                "currency": "ZWL",
                "description": "Paynow Online Payment"
            },
            "chargeMetaData": {
                "channel": "WEB",
                "purchaseCategoryCode": "Online Payment",
                "onBehalfOf": "Paynow Topup"
            }
        },
        "merchantCode": "035527",
        "merchantPin": "5088",
        "merchantNumber": "788185109",
        "currencyCode": "ZWL",
        "countryCode": "ZW",
        "terminalID": "TERM123456",
        "location": "1906 Borrowdale Road",
        "superMerchantName": "CABS",
        "merchantName": "Pick and Pay",
        "paymentMethod": "ECOCASH",
        "transactionTypeId": null,
        "meterNumber": null,
        "productType": "AIRTIME",
        "beneficiary": beneficiary
    }

    const main = () => {
        dispatch(setLoading(true))
        axios.post('http://161.97.101.70:8085/mobile-payments/payments/', AirtimePayload)
            .then(response => {
                console.log(response.data)
                dispatch(setLoading(false))
                if (response.data.statusCode === 200) {
                    if (response.data.data.transactionOperationStatus !== "FAILED") {
                        // navigation.navigate('PaymentSuccess');
                        showToast(response.data.data.transactionOperationStatus, "success")
                        navigation.navigate('TabNavigator');
                    } else {
                        showToast(response.data.data.transactionOperationStatus, "danger")
                        navigation.navigate('PaymentFailed', { from: "airtime", data: response.data.data.transactionOperationStatus });
                    }
                } else {
                    showToast("Oops, something went wrong!", "danger")
                    navigation.navigate('PaymentFailed', { from: "airtime purchase failed", data: "Oops something went wrong!!" });
                }
            })
            .catch(error => {
                console.log(error?.response)
                navigation.navigate('PaymentFailed', { from: "airtime purchase failed", data: "Oops, Connectivity error check your internet connection!" });
                dispatch(setLoading(false))
            })
    }
    const toast = useToast()

    function showToast(data, type) {
        toast.show(data, {
            type: type,
            placement: "top",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
        });
    }

    const handleAirtimePurchase = () => {
        if (beneficiary !== "" && +beneficiary >= 770000000 && +beneficiary <= 789999999) {
            setBeneficiaryErr(false)
            if (amount === "") {
                setAmountErr(true)
            } else if (ecocashNumber !== "" && +ecocashNumber >= 770000000 && +ecocashNumber <= 789999999) {
                main()
            }
            else {
                setEcocashNumberErr(true)
            }
        } else {
            setBeneficiaryErr(true)
        }
        if (amount === "") {
            setAmountErr(true)
        } else {
            setAmountErr(false)
        }
        if (ecocashNumber !== "" && +ecocashNumber >= 770000000 && +ecocashNumber <= 789999999) {
            setEcocashNumberErr(false)
            if (amount === "") {
                setAmountErr(true)
            } else if (beneficiary !== "" && +beneficiary >= 770000000 && +beneficiary <= 789999999) {
                main()
            }
            else {
                setBeneficiaryErr(true)
            }
        } else {
            setEcocashNumberErr(true)
        }
    }

    const renderHeader = () => {
        return <components.Header title="Purchase Airtime" goBack={true} />;
    };

    const renderUseCard = () => {
        return (
            <View >
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                        style={{
                            ...theme.fonts.SourceSansPro_Regular_14,
                            color: theme.colors.blue2,
                            lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                            marginBottom: theme.sizes.marginBottom_4,
                            fontSize: 19,
                            // marginLeft: 20,
                            marginTop: 50
                        }}
                    >
                        Select currency
                    </Text>
                    <View style={{
                        ...theme.fonts.SourceSansPro_Regular_14,
                        color: theme.colors.bodyTextColor,
                        lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                        marginBottom: theme.sizes.marginBottom_4,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrency("RTGS")
                            }}>
                            <Text style={{
                                ...theme.fonts.SourceSansPro_Regular_14,
                                color: theme.colors.bodyTextColor,
                                lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                                marginBottom: theme.sizes.marginBottom_4,
                                marginRight: 20,
                                borderColor: theme.colors.blue2,
                            }}>
                                RTGS
                            </Text>
                        </TouchableOpacity>
                        <components.SwitchButton value={currency} />
                        <TouchableOpacity
                            onPress={() => {
                                setCurrency("USD")
                            }}>
                            <Text style={{
                                ...theme.fonts.SourceSansPro_Regular_14,
                                color: theme.colors.bodyTextColor,
                                lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                                marginBottom: theme.sizes.marginBottom_4,
                                marginLeft: 20
                            }}>
                                USD
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <Text
                    style={{
                        ...theme.fonts.SourceSansPro_Regular_14,
                        color: theme.colors.bodyTextColor,
                        lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                        marginBottom: theme.sizes.marginBottom_4,
                        marginLeft: 20,
                    }}
                >
                    Beneficiary number
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: theme.sizes.marginBottom_10,
                    }}
                >
                    <components.InputField
                        label="meter"
                        phoneIcon={true}
                        placeholder="Enter beneficiary number"
                        onChangeText={setBeneficiary}
                        keyboardType="numeric"
                        isError={beneficiaryErr}
                        valueErrTxt="mobile number"
                    />
                </View>
                <Text
                    style={{
                        ...theme.fonts.SourceSansPro_Regular_14,
                        color: theme.colors.bodyTextColor,
                        lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                        marginBottom: theme.sizes.marginBottom_4,
                        marginLeft: 20,
                    }}
                >
                    Ecocash number
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: theme.sizes.marginBottom_10,
                    }}
                >
                    <components.InputField
                        label="meter"
                        phoneIcon={true}
                        placeholder="Enter ecocash number"
                        onChangeText={setEcocashNumber}
                        keyboardType="numeric"
                        isError={ecocashNumberErr}
                        valueErrTxt="mobile number"
                    />
                </View>
                <Text
                    style={{
                        ...theme.fonts.SourceSansPro_Regular_14,
                        color: theme.colors.bodyTextColor,
                        lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                        marginBottom: theme.sizes.marginBottom_4,
                        marginLeft: 20,
                    }}
                >
                    Amount
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: theme.sizes.marginBottom_10,
                    }}
                >
                    <components.InputField
                        label="meter"
                        dollarIcon={true}
                        placeholder="Enter amount"
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        isError={amountErr}
                        valueErrTxt="amount"
                    />
                </View>
            </View>
        );
    };

    const renderContent = () => {
        return (
            <KeyboardAwareScrollView style={{ flexGrow: 1 }} enableOnAndroid={true}>
                {renderUseCard()}
            </KeyboardAwareScrollView>
        );
    };

    const renderButton = () => {
        return (
            <components.Button
                title="Purchase airtime"
                containerStyle={{ margin: 20 }}
                onPress={() => {
                    handleAirtimePurchase()
                }}
                backgroundColor={amountErr || ecocashNumberErr || beneficiaryErr ? "red" : ""}
            />
        );
    };

    return (
        <components.SafeAreaView background={true}>
            {renderHeader()}
            {renderContent()}
            {renderButton()}
        </components.SafeAreaView>
    );
};

export default Airtime;
