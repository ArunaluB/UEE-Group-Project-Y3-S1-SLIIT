import { StatusBar, StatusBarProps } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
    { text: 'Give your baby only healthy foods these days', author: 'Dr. Upul Chandana' },
    { text: 'Ensure your baby gets enough sleep', author: 'Dr. Jane Smith' },
    { text: 'Regular check-ups are crucial for your baby\'s health', author: 'Dr. Mark Johnson' },
  ];

  const appointmentCarouselRef = useRef<FlatList<any>>(null);
  const tipCarouselRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    let appointmentInterval: NodeJS.Timeout | undefined, tipInterval: NodeJS.Timeout | undefined;

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
      }, 4000);
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
      }, 3000);
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
      style={[styles.card, styles.appointmentCard, { width: CARD_WIDTH }]}
    >
      <View style={styles.cardHeader}>
        <FontAwesome5 name="calendar-alt" size={24} color="#8B4C70" />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <FontAwesome5 name="clock" size={16} color="#8B4C70" />
          <Text style={styles.cardInfo}>{item.date} at {item.time}</Text>
        </View>
        <View style={styles.cardRow}>
          <FontAwesome5 name="user-md" size={16} color="#8B4C70" />
          <Text style={styles.cardInfo}>{item.doctor}</Text>
        </View>
        {item.location && (
          <View style={styles.cardRow}>
            <FontAwesome5 name="map-marker-alt" size={16} color="#8B4C70" />
            <Text style={styles.cardInfo}>{item.location}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );


  const renderTipCard = ({ item }: { item: { text: string; author: string } }) => (
    <TouchableOpacity
      style={[styles.card, styles.tipCard, { width: CARD_WIDTH }]}
      onPress={() => setIsTipAutoPlayPaused(!isTipAutoPlayPaused)}
    >
      <View style={styles.cardHeader}>
        <FontAwesome5 name="lightbulb" size={24} color="#8B4C70" />
        <Text style={styles.cardTitle}>Health Tip</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.tipText}>"{item.text}"</Text>
        <View style={styles.cardRow}>
          <FontAwesome5 name="user-nurse" size={16} color="#8B4C70" />
          <Text style={styles.tipAuthor}>{item.author}</Text>
        </View>
      </View>
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
          <Text style={styles.title}>MomCare</Text>
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
          onScrollToIndexFailed={() => { }}
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
          onScrollToIndexFailed={() => { }}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 20,
    paddingTop: (StatusBar.currentHeight ?? 0) + 1, // Add padding for the status bar height
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
    paddingTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginBottom: 10,
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentCard: {
    backgroundColor: 'rgba(255, 179, 138, 0.9)',
  },
  tipCard: {
    backgroundColor: 'rgba(255, 230, 240, 0.9)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginLeft: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  tipAuthor: {
    fontSize: 14,
    color: '#8B4C70',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pauseText: {
    fontSize: 12,
    color: '#8B4C70',
    textAlign: 'center',
    marginTop: 10,
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
