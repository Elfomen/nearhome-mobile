import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView, StatusBar } from "react-native";
import { Platform, Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import User from "../../assets/images/user1.jpg";
import { APP_THEMES } from "../../utils/themes";
import Mtn from "../../assets/images/mtn.png";
import Orange from "../../assets/images/orange.png";

const WalletScreen = () => {
  return (
    <ScrollView>
      <View
        style={[
          tw`mt-4 ml-3 mr-3`,
          { paddingTop: Platform.OS === "android" && StatusBar.currentHeight },
        ]}
      >
        <View
          style={[
            tw`p-5`,
            {
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f1f7fa",
              borderRadius: 40,
            },
          ]}
        >
          <Text
            style={[
              {
                flex: 7,
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.title,
              },
            ]}
          >
            Hello Fomena Yannick
          </Text>
          <View style={[{ flex: 1 }]}>
            <Avatar rounded source={User} size="large" />
          </View>
        </View>

        <View style={[tw`mt-5`]}>
          <ScrollView horizontal={true}>
            <View style={[tw`mr-5`]}>
              <WalletAmount />
            </View>
            <View style={[tw`mr-5`]}>
              <WalletAmount />
            </View>
            <View style={[tw`mr-5`]}>
              <WalletAmount />
            </View>
          </ScrollView>
        </View>
        <View
          style={[tw`mt-5`, { flexDirection: "row", alignItems: "center" }]}
        >
          <View
            style={[
              tw`mr-3`,
              {
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                backgroundColor: "#f0f4f7",
                padding: 5,
                borderRadius: 8,
              },
            ]}
          >
            <View>
              <FontAwesomeIcon size={26} icon={faUpLong} />
            </View>
            <View>
              <Text
                style={[
                  {
                    fontFamily: APP_THEMES.fontFamilies.body,
                    fontSize: APP_THEMES.fontSizez.small,
                    color: APP_THEMES.colors.color_gray,
                  },
                ]}
              >
                Landlords Following
              </Text>
              <Text
                style={[
                  {
                    fontFamily: APP_THEMES.fontFamilies.body,
                    fontSize: APP_THEMES.fontSizez.medium,
                    color: APP_THEMES.colors.color_black,
                  },
                ]}
              >
                41
              </Text>
            </View>
          </View>

          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                backgroundColor: "#f0f4f7",
                padding: 5,
                borderRadius: 8,
              },
            ]}
          >
            <View>
              <FontAwesomeIcon size={26} icon={faUpLong} />
            </View>
            <View>
              <Text
                style={[
                  {
                    fontFamily: APP_THEMES.fontFamilies.body,
                    fontSize: APP_THEMES.fontSizez.small,
                    color: APP_THEMES.colors.color_gray,
                  },
                ]}
              >
                Tenants Following
              </Text>
              <Text
                style={[
                  {
                    fontFamily: APP_THEMES.fontFamilies.body,
                    fontSize: APP_THEMES.fontSizez.medium,
                    color: APP_THEMES.colors.color_black,
                  },
                ]}
              >
                125
              </Text>
            </View>
          </View>
        </View>

        <View style={[tw`mt-8`]}>
          <Text
            style={[
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.title,
                color: APP_THEMES.colors.color_black,
              },
            ]}
          >
            Last Transactions
          </Text>

          <View style={[tw`mt-3`]}>
            <TransactionView
              image={Mtn}
              date="Last friday"
              reason="To your Mtn momo"
              amount="- 5000"
            />
          </View>
          <View style={[tw`mt-3`]}>
            <TransactionView
              image={Orange}
              date="Yesterday"
              reason="To your Orange money"
              amount="- 45000"
            />
          </View>
          <View style={[tw`mt-3`]}>
            <TransactionView
              image={Mtn}
              date="15:00"
              reason="To your Mtn momo"
              amount="- 12000"
            />
          </View>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((res, i) => {
            return (
              <View style={[tw`mt-3`]} key={i}>
                <TransactionView
                  image={Mtn}
                  date="18:00"
                  reason="To your Mtn momo"
                  amount="- 5000"
                />
              </View>
            );
          })}
          <View style={[tw`mt-3 mb-20`]}>
            <TransactionView
              image={Mtn}
              date="18:00"
              reason="To your Mtn momo"
              amount="- 5000"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const TransactionView = (props) => {
  const { image, date, reason, amount } = props;
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }]}>
      <View style={{ flex: 1 }}>
        <Avatar rounded source={image} size="medium" />
      </View>
      <View style={{ flex: 4 }}>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.body,
              fontSize: APP_THEMES.fontSizez.small,
              color: APP_THEMES.colors.color_gray,
            },
          ]}
        >
          {date}
        </Text>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.body,
              fontSize: APP_THEMES.fontSizez.medium,
              color: APP_THEMES.colors.color_black,
            },
          ]}
        >
          {reason}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: APP_THEMES.fontFamilies.body,
            fontSize: APP_THEMES.fontSizez.medium,
            color: "red",
          }}
        >
          {amount}
        </Text>
      </View>
    </View>
  );
};

const WalletAmount = () => {
  return (
    <View
      style={[
        { backgroundColor: APP_THEMES.colors.secondary_color_blue },
        styles.cardWalled,
      ]}
    >
      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.title,
              fontSize: APP_THEMES.fontSizez.large,
              color: APP_THEMES.colors.primary_color_white,
              flex: 2,
            },
          ]}
        >
          XAF 25,000
        </Text>
        <View>
          <FontAwesomeIcon
            icon={faCreditCard}
            size={25}
            color={APP_THEMES.colors.primary_color_white}
          />
        </View>
      </View>
      <View style={[tw`mt-10`]}>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.title,
              fontSize: APP_THEMES.fontSizez.body,
              color: APP_THEMES.colors.primary_color_white,
            },
          ]}
        >
          ******4152
        </Text>
      </View>

      <View style={[tw`mt-2`, { flexDirection: "row", alignItems: "center" }]}>
        <View style={[{ flexDirection: "row", alignItems: "center", flex: 2 }]}>
          <Text
            style={[
              tw`mr-3`,
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.small,
                color: APP_THEMES.colors.primary_color_white,
              },
            ]}
          >
            Fomena Wouati Yannick
          </Text>
          <Text
            style={[
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.small,
                color: APP_THEMES.colors.primary_color_white,
              },
            ]}
          >
            24/15
          </Text>
        </View>

        <View>
          <FontAwesomeIcon icon={faCcMastercard} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWalled: {
    padding: 30,
    width: 300,
    borderRadius: 12,
  },
});

export default WalletScreen;
