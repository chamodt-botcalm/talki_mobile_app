import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import ProfilePic from '@/components/profilepic';

const SettingsScreen = () => {

  const accountOptions = [
    { icon: 'bookmark-outline', title: 'Saved Messages' },
    { icon: 'call-outline', title: 'Recent Calls' },
    { icon: 'color-wand-outline', title: 'Stickers' },
  ];

  const settingsOptions = [
    { icon: 'notifications-outline', title: 'Notifications and Sounds' },
    { icon: 'lock-closed-outline', title: 'Privacy and Security' },
    { icon: 'server-outline', title: 'Data and Storage' },
    { icon: 'brush-outline', title: 'Appearance' },
    { icon: 'language-outline', title: 'Language' },
  ];
  const styles = StyleSheet.create({
    back1: {
      backgroundColor: '#232323',
      width: '100%',
      height: '100%'
    },
    back2: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#FFFFFF',
      height: 811,
      width: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden'
    },
    row1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      backgroundColor: '#F6F6F6',
      marginTop: 40,
      paddingVertical: 15
    },
    row2: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 19
    },
    column1: {
      flexDirection: 'column',

    },
    image1: {
      width: 12,
      height: 12,
      resizeMode: 'contain',
      tintColor: '#AEAEB2'
    },
    section: {
      width: '100%',
      backgroundColor: '#F6F6F6'
    },
    borderbottom: {
      borderBottomColor: '#C6C6C8',
      borderBottomWidth: 1,
    },
    bordertop:{
      borderTopColor: '#C6C6C8',
      borderTopWidth: 1,
    }
  });
  return (
    <View style={styles.back1}>
      <View style={styles.back2}>
        {/* Profile Header */}
        <View style={[styles.row1]}>
          <View style={styles.row2}>
            <ProfilePic width={66} height={66} borderWidth={2} />
            <View style={styles.column1}>
              <Text style={{
                marginBottom: 10,
                fontSize: 14,
                fontWeight: 'bold'
              }}>Jon Smith</Text>
              <Text>0xb96cc255470............599</Text>
              <Text>@smith.j</Text>
            </View>
          </View>
          <Image source={require('../../assets/images/next.png')} style={styles.image1} />
        </View>

        {/* Accounts */}
        <View>
          <View style={[styles.bordertop,{marginTop:40}]}></View>
          <View style={[styles.section, styles.row2, { gap: 15,paddingVertical:11,paddingLeft:17 }]}>
            <ProfilePic width={33} height={33} borderWidth={2} />
            <Text>Jon Smith</Text>
          </View>
          <View style={[styles.borderbottom,{marginHorizontal: 25}]}></View>
          <View style={[styles.section, styles.row2, { gap: 15,paddingVertical:11,paddingLeft:24 }]}>
            <Image source={require('../../assets/images/plu.png')} />
            <Text>Add Account</Text>
          </View>
          <View style={[styles.borderbottom,{width:'100%'}]}></View>
        </View>

      </View>
    </View>
  )
}


export default SettingsScreen
