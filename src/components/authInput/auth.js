import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text } from "react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { APP_THEMES } from "../../utils/themes";

const AuthenticationInput = (props) => {
  const {
    placeholder,
    firstIcon,
    secondIcon,
    password,
    phone,
    email,
    defaultValue,
    hasError,
    onChange,
  } = props;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: APP_THEMES.colors.primary_color_white,
          borderRadius: 50,
        },
      ]}
    >
      <View style={[tw`mr-4 pl-3`]}>
        <FontAwesomeIcon icon={firstIcon} />
      </View>
      <TextInput
        placeholder={placeholder}
        value={defaultValue}
        onChangeText={(e) => onChange(e)}
        secureTextEntry={password}
        style={[{ flex: 1 }, tw`p-3`]}
        keyboardType={phone ? "phone-pad" : email ? "email-address" : "default"}
      />

      {secondIcon && (
        <TouchableOpacity style={[tw`mr-4`]}>
          <FontAwesomeIcon icon={secondIcon} />
        </TouchableOpacity>
      )}

      {hasError && (
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <Text style={[{ color: "red", fontSize: 10 }, tw`mr-1`]}>
            required
          </Text>
          <View style={[tw`mr-1`]}>
            <FontAwesomeIcon icon={faCircleDot} color="red" size={10} />
          </View>
        </View>
      )}
    </View>
  );
};

export default AuthenticationInput;
