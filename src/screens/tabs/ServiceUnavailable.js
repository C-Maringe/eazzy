import { Text } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { components } from '../../components';
import { theme } from '../../constants';

const ServiceUnavailable = ({ navigation }) => {
    const renderHeader = () => {
        return <components.Header goBack={false} title="Service unavailable" />;
    };

    const renderContent = () => {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: theme.sizes.paddingTop_20,
                }}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={{
                        ...theme.fonts.SourceSansPro_Regular_16,
                        lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                        color: theme.colors.bodyTextColor,
                        marginBottom: theme.sizes.marginBottom_30,
                    }}
                >
                    Sorry service is not yet available. {'\n'}Please check again after 2 working days.
                </Text>
            </KeyboardAwareScrollView>
        );
    };

    return (
        <components.SafeAreaView background={true}>
            {renderHeader()}
            {renderContent()}
        </components.SafeAreaView>
    );
};

export default ServiceUnavailable;
