import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, ChevronRight, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  // In a real app, this would come from authentication state
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  };

  const menuItems = [
    {
      icon: <Settings size={22} color="#007AFF" />,
      title: 'Account Settings',
      onPress: () => console.log('Account Settings')
    },
    {
      icon: <Bell size={22} color="#007AFF" />,
      title: 'Notifications',
      onPress: () => console.log('Notifications')
    },
    {
      icon: <Shield size={22} color="#007AFF" />,
      title: 'Privacy',
      onPress: () => console.log('Privacy')
    },
    {
      icon: <HelpCircle size={22} color="#007AFF" />,
      title: 'Help & Support',
      onPress: () => console.log('Help & Support')
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: user.avatarUrl }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.menuItem,
              index === menuItems.length - 1 ? styles.menuItemLast : null
            ]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <ChevronRight size={18} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={18} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>App Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#8E8E93',
  },
  menuSection: {
    marginTop: 24,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    color: '#8E8E93',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
});