import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyColors from '../../colors/colors';
import Animated from 'react-native-reanimated';
import {
  Container,
  Icon,
  Text,
  Header,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Content,
  Body,
  H3,
} from 'native-base';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

const CustomDrawer = ({progress, ...props}) => {
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

  return (
    <Container>
      <Header style={styles.header}>
        <Right>
          <Icon
            name="bars"
            type="FontAwesome5"
            color="red"
            style={{fontSize: 25, color: MyColors.green}}
            onPress={() => props.navigation.closeDrawer()}
          />
        </Right>
      </Header>
      <ListItem thumbnail>
        <Left>
          <Thumbnail source={{uri: uri}} />
        </Left>
        <Body>
          <Text style={{}}>Muhammad Hassan</Text>
          <Text note style={{fontWeight: '500'}}>
            Trainee Engineer
          </Text>
        </Body>
      </ListItem>
      <Content>
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Rate Us"
            icon={({color, size, focused}) => (
              <Icon
                name="star"
                type="FontAwesome5"
                style={{color: color, fontSize: size}}
              />
            )}
          />
        </DrawerContentScrollView>
      </Content>
    </Container>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
});
