import {
    StatusBar,
    View,
    Text,
    Modal, StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { components } from '../components';
import { theme } from '../constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/Loading';

const Electricity = ({ navigation }) => {
    const dispatch = useDispatch();

    const [confirmModal, setConfirmModal] = useState(false)

    const [currency, setCurrency] = useState("ZWL")
    const [meterNumber, setMeterNumber] = useState("")
    const [meterNumberErr, setMeterNumberErr] = useState(false)
    const [ecocashNumber, setEcocashNumber] = useState("")
    const [ecocashNumberErr, setEcocashNumberErr] = useState(false)
    const [amount, setAmount] = useState("")
    const [amountErr, setAmountErr] = useState(false)

    const [email, setEmail] = useState("")

    const [zesaCustomerInfo, setZesaCustomerInfo] = useState({})

    const electricityCustomerInfoPayload = {
        "mti": "hardcoded",
        "vendorReference": "hardcoded",
        "processingCode": "hardcoded",
        "transactionAmount": amount,
        "transmissionDate": "hardcoded",
        "vendorNumber": "hardcoded",
        "merchantName": "ZETDC",
        "productName": "ZETDC_PREPAID",
        "utilityAccount": meterNumber
    }

    const electricityPurchasePayload = {
        "mti": "hardcoded",
        "vendorReference": "1234",
        "processingCode": "hardcoded",
        "transactionAmount": amount,
        "transmissionDate": "hardcoded",
        "vendorNumber": "hardcoded",
        "terminalID": "POS001",
        "merchantName": "ZETDC",
        "utilityAccount": meterNumber,
        "aggregator": "POWERTEL",
        "productName": "ZETDC_PREPAID",
        "currencyCode": currency,
        "mobileNumber": ecocashNumber,
        "email": "tinashechirimuuta@gmail.com"
    }

    const ecocashPayload = {
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
        "productType": "ZETDC",
        "beneficiary": ecocashNumber
    };

    const checkInfoMain = () => {
        dispatch(setLoading(true))
        axios.post("http://207.180.226.46:8110/zesa-token-service/zesa-tokens/customer-info", electricityCustomerInfoPayload)
            .then((response) => {
                console.log(response)
                setZesaCustomerInfo(response)
                setConfirmModal(true)
            })
            .catch((error) => {
                console.log(error?.response)
                navigation.navigate('PaymentFailed', { from: "zesa", data: "Oops Timeout, Something went wrong. " });
            }).finally(() => {
                dispatch(setLoading(false))
            })
    }

    const handleCheckCustomerInfo = () => {
        if (ecocashNumber !== "" && +ecocashNumber >= 770000000 && +ecocashNumber <= 789999999) {
            setEcocashNumberErr(false)
            if (amount === "") {
                setAmountErr(true)
            }
            if (meterNumber.length === 11) {
                checkInfoMain()
            } else {
                setMeterNumberErr(true)
            }
        } else {
            setEcocashNumberErr(true)
            if (amount === "") {
                setAmountErr(true)
            } else {
                setAmountErr(false)
            }
            if (meterNumber.length === 11) {
                setMeterNumberErr(false)
            } else {
                setMeterNumberErr(true)
            }
        }
    }

    const sendEmailMessage = (obj) => {
        try {
            const mainContainer = "<div>"
            const keyValues = Object.entries(obj).map(([key, value]) => (
                !key.includes("timeStamp") && `
                <p>
                    ${key.includes("totalAmount") ? "Total Amt" : key.toUpperCase()} : ${key.includes("token") && value !== null ? value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4 $5") : value}
                </p>`
            ))
            const text = mainContainer + keyValues + "</div>"

            const textInit = text.replace(/>,/g, '>');

            const textIntiF = textInit.replace(/false/g, '');

            const finalMessage = textIntiF.replace(/>,/g, '>');

            if (email.includes("@")) {
                const data1 = {
                    "emails": [
                        {
                            "bodyText": finalMessage,
                            "contentType": null,
                            "filename": null,
                            "myBytes": null,
                            "receipient": {
                                "email": email,
                                "fullname": email
                            },
                            "subject": "Eazzy pay ZETDC Token"
                        }
                    ]
                }
                axios.post('http://161.97.101.70:9105/notification-service/emails/send', data1)
                    .then((response) => { console.log(response) })
                    .catch((error) => { console.log(error) })
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleZesaPurchase = () => {
        dispatch(setLoading(true))
        axios.post("http://207.180.226.46:8110/zesa-token-service/zesa-tokens/purchase-token", electricityPurchasePayload)
            .then((response) => {
                console.log(response.data)
                const handleResponseSuccess = (data) => {
                    sendEmailMessage(data.data.tokenBody)
                    setTimeout(() => {
                        navigation.navigate('PaymentSuccess', { zesa: data.data.tokenBody });
                        dispatch(setLoading(false))
                    }, 2000)
                }
                const handleRecheckPaymentStatus = () => {
                    axios.post("http://207.180.226.46:8110/zesa-token-service/zesa-tokens/resend-token", electricityPurchasePayload)
                        .then((response) => {
                            if (response.data.responseCode == "00") {
                                handleResponseSuccess(response)
                            } else if (response.data.responseCode == "68") {
                                setTimeout(() => {
                                    handleRecheckPaymentStatus()
                                }, 2000)
                            } else {
                                dispatch(setLoading(false))
                                navigation.navigate('PaymentFailed', { from: "zesa", data: "Oops Timeout, Something went wrong. " });
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
                if (response.data.responseCode == "00") {
                    handleResponseSuccess(response)
                } else if (response.data.responseCode == "68") {
                    setTimeout(() => {
                        handleRecheckPaymentStatus()
                    }, 2000)
                } else {
                    dispatch(setLoading(false))
                    navigation.navigate('PaymentFailed', { from: "zesa", data: "Oops Timeout, Something went wrong. " });
                }
            })
            .catch((error) => {
                navigation.navigate('PaymentFailed', { from: "zesa", data: "Oops Timeout, Something went wrong. " });
                console.log(error)
            }).finally(() => { dispatch(setLoading(false)) })
    }

    const handleConfirmPayment = () => {
        setConfirmModal(false)
        dispatch(setLoading(true))
        // handleZesaPurchase();
        axios.post('http://161.97.101.70:8085/mobile-payments/payments/', ecocashPayload)
            .then((response) => {
                if (response.data.data.transactionOperationStatus !== "FAILED") {
                    handleZesaPurchase();
                } else {
                    navigation.navigate('PaymentFailed', { from: "zesa", data: "Oops Timeout, Something went wrong. " });
                }
            }).catch((error) => {
                dispatch(setLoading(false))
                console.log(error)
            })
    }

    const renderHeader = () => {
        return <components.Header title="ZETDC Purchase" goBack={true} />;
    };

    const renderUseCard = () => {
        return (
            <View >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={confirmModal}>
                    <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="dark-content" />
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ color: theme.colors.blue2, fontWeight: 600, fontSize: 18, marginBottom: 15 }}>
                                PAYMENT DETAILS
                            </Text>
                            <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    Customer name:
                                </Text>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    {zesaCustomerInfo?.data?.customerData}
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    Meter number:
                                </Text>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    {zesaCustomerInfo?.data?.utilityAccount}
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    Currency:
                                </Text>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    {currency}
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    Amount:
                                </Text>
                                <Text style={{ fontWeight: 400, fontSize: 16, width: 150 }}>
                                    {zesaCustomerInfo?.data?.transactionAmount}
                                </Text>
                            </View>
                            <View
                                style={{
                                    // padding: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <components.Button
                                    title="Confirm payment"
                                    containerStyle={{ margin: 10, marginBottom: 0, width: responsiveWidth(42), }}
                                    onPress={() => {
                                        handleConfirmPayment()
                                    }}
                                />
                                <components.Button
                                    title="Cancel"
                                    backgroundColor="red"
                                    containerStyle={{
                                        width: responsiveWidth(30),
                                        margin: 10, marginBottom: 0
                                    }}
                                    onPress={() => {
                                        setConfirmModal(false)
                                    }}
                                />
                            </View>

                        </View>
                    </View>
                </Modal>
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
                                setCurrency("ZWL")
                            }}>
                            <Text style={{
                                ...theme.fonts.SourceSansPro_Regular_14,
                                color: theme.colors.bodyTextColor,
                                lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                                marginBottom: theme.sizes.marginBottom_4,
                                marginRight: 20,
                                borderColor: theme.colors.blue2,
                            }}>
                                ZWL
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
                    Meter number
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: theme.sizes.marginBottom_10,
                    }}
                >
                    <components.InputField
                        label="meter"
                        onChangeText={setMeterNumber}
                        keyboardType="numeric"
                        isError={meterNumberErr}
                        valueErrTxt="meter number"
                        meterIcon={true}
                        placeholder="Enter meter number"
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
                        onChangeText={setEcocashNumber}
                        keyboardType="numeric"
                        isError={ecocashNumberErr}
                        valueErrTxt="mobile number"
                        label="meter"
                        phoneIcon={true}
                        placeholder="Enter ecocash number"
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
                    Email {" "}
                    <Text
                        style={{
                            ...theme.fonts.SourceSansPro_Regular_14,
                            color: theme.colors.bodyTextColor,
                            lineHeight: theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                            marginBottom: theme.sizes.marginBottom_4,
                            marginLeft: 20,
                        }}
                    >
                        (Optional)
                    </Text>
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: theme.sizes.marginBottom_10,
                    }}
                >
                    <components.InputField
                        label="email"
                        emailIcon={true}
                        placeholder="Enter email address"
                        onChangeText={setEmail}
                        keyboardType="email-address" />
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
                title="Purchase zesa token"
                containerStyle={{ margin: 20 }}
                onPress={() => {
                    handleCheckCustomerInfo()
                }}
                backgroundColor={amountErr || ecocashNumberErr || meterNumberErr ? "red" : ""}
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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Electricity;
