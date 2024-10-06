import { Tabs } from 'expo-router'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather'

import { HeaderImage, HeaderSearch } from '../../../components/StackHeader'

export default function TabLayout() {
  const handleSearch = () => {
    console.log('Buscando alv')
  }
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          color: 'black',
          marginTop: -5,
          marginBottom: 5
        },
        headerTitle: () => <HeaderImage />,
        headerRight: () => <HeaderSearch onPress={handleSearch} />
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: () => <Feather name='home' size={20} color='black' />
        }}
      />
      <Tabs.Screen
        name='bag'
        options={{
          title: 'Bag',
          tabBarIcon: () => (
            <Feather name='shopping-bag' size={20} color='black' />
          )
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          tabBarIcon: () => (
            <FontAwesome name='heart-o' size={20} color='black' />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <FontAwesome name='user-o' size={20} color='black' />
          )
        }}
      />
      <Tabs.Screen
        name='category/[id]'
        options={{
          href: null,
          title: 'Profile',
          tabBarIcon: () => (
            <FontAwesome name='user-o' size={20} color='black' />
          )
        }}
      />
    </Tabs>
  )
}
