import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { theme } from '../constants';
import { svg } from '../assets/svg';

const InputField = ({
  isError = false,
  valueErrTxt = "text",
  placeholder,
  containerStyle,
  secureTextEntry,
  keyboardType,
  checkIcon,
  eyeOffIcon = false,
  onChangeText,
  userIcon,
  mailIcon,
  keyIcon,
  dollarIcon,
  editIcon,
  emailIcon,
  calendarIcon,
  mapPinIcon,
  hashIcon,
  briefcaseIcon,
  phoneIcon,
  meterIcon
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 10,
          backgroundColor: theme.colors.white,
          borderColor: focus ? theme.colors.blue3 : isError ? theme.colors.mainColor : theme.colors.blue5,
          paddingRight: eyeOffIcon ? 0 : checkIcon ? 0 : 10,
          ...containerStyle,
        }}
      >
        {briefcaseIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.BriefcaseSvg />
          </View>
        )}
        {mapPinIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.MapPinSvg />
          </View>
        )}
        {calendarIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.CalendarSvg />
          </View>
        )}
        {hashIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.HashSvg />
          </View>
        )}
        {emailIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.EmailSvg />
          </View>
        )}
        {editIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.EditSvg />
          </View>
        )}
        {dollarIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.DollarSignSvg />
          </View>
        )}
        {userIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.UserSvg />
          </View>
        )}
        {mailIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.MailSvg />
          </View>
        )}
        {keyIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.KeySvg />
          </View>
        )}
        {phoneIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.PhoneSvg />
          </View>
        )}
        {meterIcon && (
          <View style={{ width: 34, height: 34, marginRight: 14 }}>
            <svg.MeterSvg />
          </View>
        )}
        <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={'#A7AFB7'}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          style={{
            flex: 1,
            ...theme.fonts.SourceSansPro_Regular_16,
            lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.2,
            color: theme.colors.mainDark,
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
        {eyeOffIcon && (
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <svg.EyeOffSvg />
          </TouchableOpacity>
        )}
        {checkIcon && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <svg.CheckSvg />
          </View>
        )}
      </View>
      {isError &&
        <View style={{ marginTop: 4, marginBottom: 2, marginLeft: 58 }}>
          <Text style={{ color: theme.colors.mainColor }}>
            Please enter valid {valueErrTxt}!
          </Text>
        </View>}
    </View>
  );
};

export default InputField;
