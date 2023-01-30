import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Slider } from "@miblanchard/react-native-slider";
import React, { useCallback, useState } from "react";
import {
  Alert,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import RnRangeSlider from "rn-range-slider";
import tw from "tailwind-react-native-classnames";
import ButtonComponent from "../../components/button/button";
import { APP_FONT_SIZES } from "../../utils/fontSizes";
import { APP_THEMES } from "../../utils/themes";

const FilterScreen = (props) => {
  const { onModalToggle, visible } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Price Weekly", value: "week" },
    { label: "Price Monthly", value: "month" },
    { label: "Price Yearly", value: "year" },
  ]);

  const SliderContainer = (props) => {
    const { caption, sliderValue, trackMarks, isNotMoney } = props;
    const [value, setValue] = useState(
      sliderValue ? sliderValue : DEFAULT_VALUE
    );
    let renderTrackMarkComponent;

    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
      renderTrackMarkComponent = (index) => {
        const currentMarkValue = trackMarks[index];
        const currentSliderValue =
          value || (Array.isArray(value) && value[0]) || 0;
        const style = currentMarkValue > Math.max(currentSliderValue);
        // ? trackMarkStyles.activeMark
        // : trackMarkStyles.inactiveMark;
        return <View style={style} />;
      };
    }

    const renderChildren = () => {
      return React.Children.map(props.children, (child) => {
        if (!!child && child.type === Slider) {
          return React.cloneElement(child, {
            onValueChange: setValue,
            renderTrackMarkComponent,
            trackMarks,
            value,
          });
        }

        return child;
      });
    };

    return (
      <View style={styles.sliderContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.small,
                color: APP_THEMES.colors.secondary_color_blue,
              },
            ]}
          >
            {isNotMoney ? "m/2" : "XAF"}{" "}
            {Array.isArray(value) ? value.join(" - ") : value}
          </Text>
        </View>
        {renderChildren()}
      </View>
    );
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onModalToggle}
      >
        <View
          style={[
            tw`h-full pt-5 pl-3 pr-3`,
            { backgroundColor: APP_THEMES.colors.primary_color_white },
          ]}
        >
          <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <TouchableOpacity style={[{ flex: 2 }]} onPress={onModalToggle}>
              <FontAwesomeIcon
                icon={faXmark}
                color={APP_THEMES.colors.color_gray}
                size={25}
              />
            </TouchableOpacity>
            <View style={[{ flex: 2 }]}>
              <Text
                style={[
                  {
                    fontFamily: APP_THEMES.fontFamilies.title,
                    fontSize: APP_THEMES.fontSizez.title,
                  },
                ]}
              >
                Filter
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.buttonReset}>
                <View>
                  <Text
                    style={[
                      {
                        fontFamily: APP_THEMES.fontFamilies.body,
                        fontSize: APP_THEMES.fontSizez.body,
                        color: APP_THEMES.colors.primary_color_white,
                      },
                    ]}
                  >
                    Reset
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text
              style={[
                tw`pt-5`,
                {
                  fontFamily: APP_THEMES.fontFamilies.title,
                  fontSize: APP_THEMES.fontSizez.title,
                },
              ]}
            >
              Property type
            </Text>

            <View
              style={[tw`pt-5`, { flexDirection: "row", alignItems: "center" }]}
            >
              <ScrollView horizontal>
                <TouchableOpacity>
                  <View
                    style={[
                      tw`p-4`,
                      {
                        borderColor: APP_THEMES.colors.color_gray,
                        borderWidth: 0.5,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: APP_THEMES.fontFamilies.body,
                          fontSize: APP_THEMES.fontSizez.small,
                          color: APP_THEMES.colors.color_black,
                        },
                      ]}
                    >
                      Any
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    tw`ml-3`,
                    {
                      borderRadius: 5,
                      backgroundColor: APP_THEMES.colors.secondary_color_blue,
                    },
                  ]}
                >
                  <View
                    style={[
                      tw`p-4`,
                      {
                        borderColor: APP_THEMES.colors.color_gray,
                        borderWidth: 0.5,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: APP_THEMES.fontFamilies.body,
                          fontSize: APP_THEMES.fontSizez.small,
                          color: APP_THEMES.colors.primary_color_white,
                        },
                      ]}
                    >
                      Appartment
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    tw`ml-3`,
                    {
                      borderRadius: 5,
                      backgroundColor: APP_THEMES.colors.secondary_color_blue,
                    },
                  ]}
                >
                  <View
                    style={[
                      tw`p-4`,
                      {
                        borderColor: APP_THEMES.colors.color_gray,
                        borderWidth: 0.5,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: APP_THEMES.fontFamilies.body,
                          fontSize: APP_THEMES.fontSizez.small,
                          color: APP_THEMES.colors.primary_color_white,
                        },
                      ]}
                    >
                      Studio
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={[tw`ml-3`]}>
                  <View
                    style={[
                      tw`p-4`,
                      {
                        borderColor: APP_THEMES.colors.color_gray,
                        borderWidth: 0.5,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: APP_THEMES.fontFamilies.body,
                          fontSize: APP_THEMES.fontSizez.small,
                          color: APP_THEMES.colors.color_black,
                        },
                      ]}
                    >
                      Rooms
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`ml-3`]}>
                  <View
                    style={[
                      tw`p-4`,
                      {
                        borderColor: APP_THEMES.colors.color_gray,
                        borderWidth: 0.5,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: APP_THEMES.fontFamilies.body,
                          fontSize: APP_THEMES.fontSizez.small,
                          color: APP_THEMES.colors.color_black,
                        },
                      ]}
                    >
                      Ware House
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    tw`ml-3`,
                    {
                      borderRadius: 5,
                      backgroundColor: APP_THEMES.colors.secondary_color_blue,
                    },
                  ]}
                >
                  <View
                    style={[
                      tw`p-4`,
                      {
                        borderColor: APP_THEMES.colors.color_gray,
                        borderWidth: 0.5,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: APP_THEMES.fontFamilies.body,
                          fontSize: APP_THEMES.fontSizez.small,
                          color: APP_THEMES.colors.primary_color_white,
                        },
                      ]}
                    >
                      Awesome Store
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          <View style={[tw`pt-5`]}>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <View style={{ flex: 2, marginRight: 10 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            </View>

            <View style={[tw`mt-5`]}>
              <ImageBackground>
                <SliderContainer sliderValue={[40000, 150000]}>
                  <Slider
                    animateTransitions
                    maximumTrackTintColor={
                      APP_THEMES.colors.primary_color_white
                    }
                    maximumValue={150000}
                    minimumTrackTintColor={
                      APP_THEMES.colors.secondary_color_blue
                    }
                    minimumValue={40000}
                    step={500}
                    thumbTintColor={APP_THEMES.colors.secondary_color_blue}
                  />
                </SliderContainer>
              </ImageBackground>
            </View>
          </View>

          <View>
            <ScrollView
              style={{ backgroundColor: APP_THEMES.colors.primary_color_white }}
            >
              <View>
                <Text
                  style={[
                    tw`pt-5`,
                    {
                      fontFamily: APP_THEMES.fontFamilies.title,
                      fontSize: APP_THEMES.fontSizez.title,
                    },
                  ]}
                >
                  Bedrooms
                </Text>

                <View
                  style={[
                    tw`mt-3`,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      tw`mr-3`,
                      {
                        borderRadius: 5,
                        backgroundColor: APP_THEMES.colors.secondary_color_blue,
                      },
                    ]}
                  >
                    <View
                      style={[
                        tw`p-4`,
                        {
                          borderColor: APP_THEMES.colors.color_gray,
                          borderWidth: 0.5,
                          borderRadius: 5,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontFamily: APP_THEMES.fontFamilies.body,
                            fontSize: APP_THEMES.fontSizez.small,
                            color: APP_THEMES.colors.primary_color_white,
                          },
                        ]}
                      >
                        Studio
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {[1, 2, 3, 4].map((val, i) => {
                    return (
                      <TouchableOpacity style={[tw`mr-3`, { flex: 1 }]} key={i}>
                        <View
                          style={[
                            tw`p-4`,
                            {
                              borderColor: APP_THEMES.colors.color_gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                textAlign: "center",
                                fontFamily: APP_THEMES.fontFamilies.body,
                                fontSize: APP_THEMES.fontSizez.small,
                                color: APP_THEMES.colors.color_black,
                              },
                            ]}
                          >
                            {val}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View>
                  <Text
                    style={[
                      tw`pt-5`,
                      {
                        fontFamily: APP_THEMES.fontFamilies.title,
                        fontSize: APP_THEMES.fontSizez.title,
                      },
                    ]}
                  >
                    Bath rooms
                  </Text>

                  <View
                    style={[
                      tw`mt-3`,
                      { flexDirection: "row", alignItems: "center" },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        tw`mr-3`,
                        {
                          borderRadius: 5,
                          backgroundColor:
                            APP_THEMES.colors.primary_color_white,
                        },
                      ]}
                    >
                      <View
                        style={[
                          tw`p-4`,
                          {
                            borderColor: APP_THEMES.colors.color_gray,
                            borderWidth: 0.5,
                            borderRadius: 5,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            {
                              fontFamily: APP_THEMES.fontFamilies.body,
                              fontSize: APP_THEMES.fontSizez.small,
                              color: APP_THEMES.colors.color_black,
                            },
                          ]}
                        >
                          Any
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {[1, 2, 3, 4].map((val, i) => {
                      return (
                        <TouchableOpacity
                          style={[tw`mr-3`, { flex: 1 }]}
                          key={i}
                        >
                          <View
                            style={[
                              tw`p-4`,
                              {
                                borderColor: APP_THEMES.colors.color_gray,
                                borderWidth: 0.5,
                                borderRadius: 5,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                {
                                  fontFamily: APP_THEMES.fontFamilies.body,
                                  fontSize: APP_THEMES.fontSizez.small,
                                  color: APP_THEMES.colors.color_black,
                                  textAlign: "center",
                                },
                              ]}
                            >
                              {val}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View>
                  <Text
                    style={[
                      tw`pt-5`,
                      {
                        fontFamily: APP_THEMES.fontFamilies.title,
                        fontSize: APP_THEMES.fontSizez.title,
                      },
                    ]}
                  >
                    Property Size
                  </Text>

                  <View>
                    <ImageBackground>
                      <SliderContainer
                        sliderValue={[40000, 150000]}
                        isNotMoney={true}
                      >
                        <Slider
                          animateTransitions
                          maximumTrackTintColor={
                            APP_THEMES.colors.primary_color_white
                          }
                          maximumValue={150000}
                          minimumTrackTintColor={
                            APP_THEMES.colors.secondary_color_blue
                          }
                          minimumValue={40000}
                          step={500}
                          thumbTintColor={
                            APP_THEMES.colors.secondary_color_blue
                          }
                        />
                      </SliderContainer>
                    </ImageBackground>
                  </View>
                </View>

                <View style={[tw`mt-10`]}>
                  <ButtonComponent
                    text="Show Properties"
                    background={APP_THEMES.colors.secondary_color_blue}
                    color={APP_THEMES.colors.primary_color_white}
                    linkUrl="FilteredResult"
                    onPress={onModalToggle}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonReset: {
    padding: 5,
    backgroundColor: APP_THEMES.colors.color_orange,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const trackMarkStyles = StyleSheet.create({
  activeMark: {
    borderColor: "red",
    // borderWidth,
    // left: -borderWidth / 2,
  },
  inactiveMark: {
    borderColor: "grey",
    // borderWidth,
    // left: -borderWidth / 2,
  },
});

export default FilterScreen;
