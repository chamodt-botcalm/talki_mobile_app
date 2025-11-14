import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, Pressable, Text, View, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface MessageListProps {
  onChatSelect?: (chatId: string) => void;
}

const MessageList = ({ onChatSelect }: MessageListProps) => {
  const router = useRouter();

  const [messageData, setMessageData] = useState([
    { id: '1', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: true, unreadCount: 0, date: '9/29' },
    { id: '2', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: true, unreadCount: 0, date: '9/29' },
    { id: '3', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: false, unreadCount: 0, date: '9/29' },
    // ... (continue your items)
  ]);

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const slideAnim = useState(new Animated.Value(dimensions.height))[0];

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // DELETE MESSAGE FUNCTION
  const deleteMessage = (id: string) => {
    setMessageData(prev => prev.filter(msg => msg.id !== id));
  };

  // --- RENDER DELETE BUTTON (right swipe)
  const renderRightActions = (id: string) => (
    <View style={styles.actionsContainer}>
      <Pressable style={styles.muteBtn}>
        <Text style={styles.muteText}>Mute</Text>
      </Pressable>
      <Pressable style={styles.deleteBtn} onPress={() => deleteMessage(id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
      <Pressable style={styles.archiveBtn}>
        <Text style={styles.archiveText}>Archive</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{
      width: '100%',
      borderRightColor: 'rgba(60, 60, 67, 0.29)',
      borderRightWidth: dimensions.width >= 600 ? 1 : 0,
    }}>

      <View style={{ marginTop: 23, marginBottom: 100 }}>

        {messageData.map((item: any) => {
          return (
            <Swipeable
              key={item.id}
              renderRightActions={() => renderRightActions(item.id)}
              overshootRight={true}
            >
              <Pressable
                onPress={() => {
                  if (onChatSelect) {
                    onChatSelect(item.id);
                  } else {
                    router.push('/(message)/messagescreen');
                  }
                }}
              >
                <View style={{
                  borderBottomColor: 'rgba(60, 60, 67, 0.29)',
                  borderBottomWidth: 1,
                  paddingVertical: 7,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Image
                        source={{ uri: item.userImage }}
                        style={{
                          width: 62,
                          height: 62,
                          borderRadius: 40,
                        }}
                      />

                      <View style={{
                        flexDirection: 'column',
                        marginLeft: 11,
                        flex: 1,
                      }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.userName}</Text>
                        <Text style={{ fontSize: 12, color: '#666' }}>{item.userid}</Text>
                        <Text style={{ color: '#8E8E93', marginTop: 4 }}>
                          {item.message}
                        </Text>
                      </View>
                    </View>

                    <View style={{
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      height: 62,
                      paddingVertical: 4,
                    }}>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                        {item.hasSeen && (
                          <Image
                            source={require('../assets/images/check-mark.png')}
                            style={{
                              width: 30,
                              height: 30,
                              tintColor: '#34C759'
                            }}
                          />
                        )}
                        <Text style={{
                          fontSize: 14,
                          color: '#8E8E93',
                          fontWeight: '400'
                        }}>{item.date}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}>
                        {item.hasPin && (
                          <Image
                            source={require('../assets/images/pin.png')}
                            style={{
                              width: 14,
                              height: 14,
                              tintColor: '#8E8E93'
                            }}
                          />
                        )}

                        {item.unreadCount > 0 && (
                          <View style={{
                            backgroundColor: '#232323',
                            borderRadius: 12,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            width: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <Text style={{
                              fontSize: 12,
                              fontWeight: '600',
                              color: '#D9FD00'
                            }}>{item.unreadCount}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            </Swipeable>
          );
        })}
      </View>
    </View>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  muteBtn: {
    borderTopEndRadius:10,
    borderBottomEndRadius:10,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    zIndex:2
  },
  muteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteBtn: {
    borderTopEndRadius:10,
    borderBottomEndRadius:10,
    backgroundColor: '#DBFF00',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    marginRight:-10,
    marginLeft:-10,
    zIndex:1
  },
  deleteText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  archiveBtn: {
    backgroundColor: '#BBBBC3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  archiveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
