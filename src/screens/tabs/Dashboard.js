import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    responsiveWidth,
} from 'react-native-responsive-dimensions';

import { components } from '../../components';
import { theme } from '../../constants';

const transactions = [
    {
        id: 1,
        paymentTo: 'Airtime purchase',
        type: 'regular payments',
        price: '',
        icon: require('../../assets/icons/dollar3.png'),
        url: 'Airtime'
    },
    {
        id: 2,
        paymentTo: 'Zesa bill',
        type: 'Utility bills',
        price: '',
        icon: require('../../assets/icons/electricity.png'),
        url: 'Electricity'
    },
    {
        id: 3,
        paymentTo: 'More yet to come...',
        type: 'Other bills',
        price: '',
        icon: require('../../assets/icons/paypal.png'),
        url: 'TabNavigator'
    },
];

const Dashboard = () => {
    const navigation = useNavigation();

    const renderCards = () => {
        return (


            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    paddingLeft: 20,
                }}
                style={{
                    flexGrow: 0,
                    marginBottom: 16,
                    marginTop: 40,
                }}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                        borderRadius: 27,
                    }}
                    onPress={() =>
                        navigation.navigate('ServiceUnavailable')
                    }>
                    <Image
                        source={require("../../assets/eazzy/eazzypay-logo.png")}
                        style={{
                            width: 330,
                            height: 300
                            // aspectRatio: 8 / 5,
                        }} />
                </TouchableOpacity>
            </ScrollView>
        );
    };

    const renderTransactions = () => {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{
                    flexGrow: 0,
                    marginBottom: 30,
                }}
            >
                <components.BlockHeading
                    title="Quick bill payment:"
                // icon={<svg.BlockSearchSvg />}
                />
                <View style={{ paddingHorizontal: 20 }}>
                    {transactions.map((item, index, array) => {
                        const last = array.length === index + 1;

                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: '100%',
                                    // backgroundColor: '#FFF7F2',
                                    backgroundColor: theme.colors.blue1,
                                    borderRadius: 10,
                                    padding: 10,
                                    marginBottom: last ? 0 : 6,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={() =>
                                    navigation.navigate(item.url)
                                }
                            >
                                <Image
                                    source={item.icon}
                                    style={{
                                        width: responsiveWidth(10),
                                        aspectRatio: 1 / 1,
                                    }}
                                />
                                <View style={{ marginLeft: 14, marginRight: 'auto' }}>
                                    <Text
                                        style={{
                                            ...theme.fonts.SourceSansPro_Regular_14,
                                            lineHeight:
                                                theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                                            color: theme.colors.white,
                                            textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}
                                    >
                                        {item.paymentTo}
                                    </Text>
                                    <Text
                                        style={{
                                            ...theme.fonts.SourceSansPro_Regular_12,
                                            lineHeight:
                                                theme.fonts.SourceSansPro_Regular_12.fontSize * 1.6,
                                            color: theme.colors.bodyTextColor,
                                        }}
                                    >
                                        {item.type}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        ...theme.fonts.SourceSansPro_Regular_14,
                                        lineHeight:
                                            theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                                        color: "red",
                                    }}
                                >
                                    {item.price}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        );
    };

    const renderContent = () => {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {renderCards()}
                {renderTransactions()}
            </ScrollView>
        );
    };

    return <View style={{ flex: 1 }}>{renderContent()}</View>;
};

export default Dashboard;
