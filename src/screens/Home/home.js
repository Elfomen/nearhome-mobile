import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, ScrollView, StatusBar, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import SearchComponent from "../../components/search/search";
import Towns from "../../components/towns/town";
import { APP_COLORS } from "../../utils/colors/colors";
import { APP_THEMES } from "../../utils/themes";
import DoualaImage from "../../assets/images/douala.jpg";
import Yaounde from "../../assets/images/yaounde.jpg";
import Bafoussam from "../../assets/images/bafoussam.jpg";
import kribi from "../../assets/images/kribi.jpg";
import HousesComponent from "../../components/houses/house";
import AppartmentOne from "../../assets/images/appart.jpg";
import AppartmentTwo from "../../assets/images/app2.jpg";
import Appartment3 from "../../assets/images/app3.jpg";
import Appartment4 from "../../assets/images/app4.jpg";
import Appartment5 from "../../assets/images/app5.webp";
import Appartment6 from "../../assets/images/app6.jpg";
import Appartment7 from "../../assets/images/app7.webp";
import Appartment8 from "../../assets/images/app8.jpg";
import Appartment9 from "../../assets/images/app9.jpg";
import Appartment10 from "../../assets/images/app10.webp";
import FilterScreen from "../filter/filter";
import { useState } from "react";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <ScrollView>
      <View
        style={[
          tw`ml-3 mr-3 mt-5 h-full`,
          {
            paddingTop: Platform.OS === "android" && StatusBar.currentHeight,
          },
        ]}
      >
        <SearchComponent
          placeholder="Building, City etc"
          filterClick={toggleModal}
        />

        <FilterScreen visible={modalVisible} onModalToggle={toggleModal} />

        <View style={[tw`mt-6`]}>
          <Text
            style={[
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.title,
              },
            ]}
          >
            Communities
          </Text>
          <Text
            style={[
              {
                fontFamily: APP_THEMES.fontFamilies.body,
                color: APP_THEMES.colors.color_gray,
              },
            ]}
          >
            Connect peoples, support programs, lead
          </Text>
        </View>

        <View>
          <ScrollView horizontal={true} style={[tw`mt-5`, {}]}>
            <View style={[tw`mr-3`]}>
              <Towns title="Douala Town" image={DoualaImage} />
            </View>
            <View style={[tw`mr-3`]}>
              <Towns title="Yaounde Town" image={Yaounde} />
            </View>
            <View style={[tw`mr-3`]}>
              <Towns title="Bafoussam Town" image={Bafoussam} />
            </View>
            <View>
              <Towns title="Kribi Town" image={kribi} />
            </View>
          </ScrollView>
        </View>

        <View style={[tw`mt-8`]}>
          <Text
            style={[
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.title,
              },
            ]}
          >
            Homes
          </Text>

          <ScrollView horizontal={true}>
            <View style={[tw`mr-3`]}>
              <HousesComponent
                image={AppartmentOne}
                type="Appartment"
                price="150 000"
                address="Douala bonamousadi -Denver Fin goudron laureat"
              />
            </View>
            <View style={[tw`mr-3`]}>
              <HousesComponent
                image={Appartment3}
                type="Appartment"
                price="150 000"
                address="Douala bonamousadi -Denver Fin goudron laureat"
              />
            </View>
            <View style={[tw`mr-3`]}>
              <HousesComponent
                image={Appartment4}
                type="Appartment"
                price="150 000"
                address="Douala bonamousadi -Denver Fin goudron laureat"
              />
            </View>
            <View style={[tw`mr-3`]}>
              <HousesComponent
                image={Appartment5}
                type="Appartment"
                price="150 000"
                address="Douala bonamousadi -Denver Fin goudron laureat"
              />
            </View>
            <View style={[tw`mr-3`]}>
              <HousesComponent
                image={Appartment6}
                type="Appartment"
                price="150 000"
                address="Douala bonamousadi -Denver Fin goudron laureat"
              />
            </View>
          </ScrollView>
        </View>

        <View>
          <Text
            style={[
              tw`mt-8`,
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.title,
              },
            ]}
          >
            New Buildings
          </Text>

          <View style={[tw`mb-10`]}>
            <HousesComponent
              full={true}
              image={AppartmentOne}
              type="Appartment"
              price="150 000"
              address="Douala bonamousadi -Denver Fin goudron laureat"
            />
          </View>
          <View style={[tw`mb-10`]}>
            <HousesComponent
              full={true}
              image={Appartment7}
              type="Appartment"
              price="150 000"
              address="Douala bonamousadi -Denver Fin goudron laureat"
            />
          </View>
          <View style={[tw`mb-10`]}>
            <HousesComponent
              full={true}
              image={Appartment8}
              type="Appartment"
              price="150 000"
              address="Douala bonamousadi -Denver Fin goudron laureat"
            />
          </View>
          <View style={[tw`mb-10`]}>
            <HousesComponent
              full={true}
              image={Appartment9}
              type="Appartment"
              price="150 000"
              address="Douala bonamousadi -Denver Fin goudron laureat"
            />
          </View>
          <View style={[tw`mb-10`]}>
            <HousesComponent
              full={true}
              image={Appartment10}
              type="Appartment"
              price="150 000"
              address="Douala bonamousadi -Denver Fin goudron laureat"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
