import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // Import Feather icons

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const Clinic = () => {
  const [activeAppointmentIndex, setActiveAppointmentIndex] = useState(0);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [isAppointmentAutoPlayPaused, setIsAppointmentAutoPlayPaused] = useState(false);
  const [isTipAutoPlayPaused, setIsTipAutoPlayPaused] = useState(false);

  const appointmentData = [
    { title: 'Prenatal Checkup', date: 'Sept 15, 2024', time: '10:30 AM', doctor: 'Dr. John Doe', location: 'City Clinic' },
    { title: 'Baby Vaccination', date: 'Sept 18, 2024', time: '2:00 PM', doctor: 'Pediatric Health Center' },
    { title: 'Prenatal Checkup', date: 'Sept 15, 2024', time: '10:30 AM', doctor: 'Dr. John Doe', location: 'City Clinic' },
    { title: 'Baby Vaccination', date: 'Sept 18, 2024', time: '2:00 PM', doctor: 'Pediatric Health Center' },
  ];

  const tipData = [
    { text: 'give to your baby only healthy foods these days', author: 'Dr. Upul chandana' },
    { text: 'Ensure your baby gets enough sleep', author: 'Dr. Jane Smith' },
    { text: 'Regular check-ups are crucial for your baby\'s health', author: 'Dr. Mark Johnson' },
  ];

  const appointmentCarouselRef = useRef<FlatList<any>>(null);
  const tipCarouselRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    let appointmentInterval: string | number | NodeJS.Timeout | undefined, tipInterval: string | number | NodeJS.Timeout | undefined;

    if (!isAppointmentAutoPlayPaused) {
      appointmentInterval = setInterval(() => {
        if (appointmentCarouselRef.current && appointmentData.length > 1) {
          const nextIndex = (activeAppointmentIndex + 1) % appointmentData.length;
          appointmentCarouselRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          setActiveAppointmentIndex(nextIndex);
        }
      }, 4000); // Change appointment every 4 seconds
    }

    if (!isTipAutoPlayPaused) {
      tipInterval = setInterval(() => {
        if (tipCarouselRef.current && tipData.length > 1) {
          const nextIndex = (activeTipIndex + 1) % tipData.length;
          tipCarouselRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          setActiveTipIndex(nextIndex);
        }
      }, 3000); // Change tip every 3 seconds
    }

    return () => {
      clearInterval(appointmentInterval);
      clearInterval(tipInterval);
    };
  }, [activeAppointmentIndex, activeTipIndex, isAppointmentAutoPlayPaused, isTipAutoPlayPaused]);

  const handleAppointmentScroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: number; }; }; }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveAppointmentIndex(index);
  };

  const handleTipScroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: number; }; }; }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveTipIndex(index);
  };

  const renderAppointmentCard = ({ item }: { item: { title: string; date: string; time: string; doctor: string; location?: string } }) => (
    <TouchableOpacity 
      style={[styles.card, { width: CARD_WIDTH }]}
      onPress={() => setIsAppointmentAutoPlayPaused(!isAppointmentAutoPlayPaused)}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardInfo}>{item.date}</Text>
      <Text style={styles.cardInfo}>{item.time}</Text>
      <Text style={styles.cardInfo}>{item.doctor}</Text>
      {item.location && <Text style={styles.cardInfo}>{item.location}</Text>}
      <Text style={styles.pauseText}>
        {isAppointmentAutoPlayPaused ? "Tap to resume" : "Tap to pause"}
      </Text>
    </TouchableOpacity>
  );

  const renderTipCard = ({ item }: { item: { text: string; author: string } }) => (
    <TouchableOpacity 
      style={[styles.tipCard, { width: CARD_WIDTH }]}
      onPress={() => setIsTipAutoPlayPaused(!isTipAutoPlayPaused)}
    >
      <Text style={styles.tipText}>{item.text}</Text>
      <Text style={styles.tipAuthor}>{item.author}</Text>
      <Text style={styles.pauseText}>
        {isTipAutoPlayPaused ? "Tap to resume" : "Tap to pause"}
      </Text>
    </TouchableOpacity>
  );

  const renderDotIndicator = (activeIndex: number, dataLength: number) => (
    <View style={styles.dotContainer}>
      {[...Array(dataLength)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === activeIndex ? '#8B4C70' : '#FFB38A' }
          ]}
        />
      ))}
    </View>
  );

  return (
    <ImageBackground 
      source={require('./assets/backgroud.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather name="menu" color="#8B4C70" size={24} />
          <Text style={styles.title}>MomCare</Text>
          <Feather name="user" color="#8B4C70" size={24} />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
          <Feather name="search" color="#999" size={20} style={styles.searchIcon} />
        </View>

        <Text style={styles.sectionTitle}>Your Clinic Card</Text>
        <FlatList
          ref={appointmentCarouselRef}
          data={appointmentData}
          renderItem={renderAppointmentCard}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 10}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
          onScroll={handleAppointmentScroll}
          onScrollToIndexFailed={() => {}}
        />
        {renderDotIndicator(activeAppointmentIndex, appointmentData.length)}

        <Text style={styles.sectionTitle}>For you</Text>
        <FlatList
          ref={tipCarouselRef}
          data={tipData}
          renderItem={renderTipCard}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 10}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
          onScroll={handleTipScroll}
          onScrollToIndexFailed={() => {}}
        />
        {renderDotIndicator(activeTipIndex, tipData.length)}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add New Visit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Health tips note</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reminder Settings</Text>
        </TouchableOpacity>

        {/* <View style={styles.navbar}>
          <Feather name="bar-chart-2" color="#8B4C70" size={24} />
          <Feather name="bell" color="#8B4C70" size={24} />
          <Feather name="home" color="#8B4C70" size={24} />
          <Feather name="edit" color="#8B4C70" size={24} />
          <Feather name="map-pin" color="#8B4C70" size={24} />
        </View> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'rgba(255, 249, 229, 0.8)', // Semi-transparent background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4C70',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 229, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginBottom: 10,
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 179, 138, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
  },
  tipCard: {
    backgroundColor: 'rgba(255, 179, 138, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  tipAuthor: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
  pauseText: {
    fontSize: 10,
    color: '#8B4C70',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'rgba(255, 179, 138, 0.9)',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 215, 229, 0.8)',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Clinic;
