import React from 'react';
import { View, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import Card from '../components/Card';

const HomeScreen = () => {
  const numbers = [0, 1, 2, 3, 4, 5]
  return (
    <View style={styles.container}>
      {/* <ScrollView ver>
        {numbers.map(num => <Card key={num} number={num} />)}
      </ScrollView> */}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={numbers}
        keyExtractor={item => item}
        renderItem={({item}) => <Card number={item} />}
      />
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
  },
  flatList:{
    alignItems:'center'
  }
})