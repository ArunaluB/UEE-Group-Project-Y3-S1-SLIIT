import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

// Local image path for the background image
const backgroundImage = require('./assets/backgroud.png');

const map = () => {
  const [doctorName, setDoctorName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Set the background image using ImageBackground */}
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Icon name="menu" color="#8e44ad" size={24} />
            <Text style={styles.title}>MomCare</Text>
            <View style={styles.profileIcon} />
          </View>

          {/* <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
            />
          </View> */}

          <Text style={styles.sectionTitle}>Add New Visit</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Doctor Name"
            value={doctorName}
            onChangeText={setDoctorName}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Clinic name"
            value={clinicName}
            onChangeText={setClinicName}
          />

          <TextInput
            style={styles.input}
            placeholder="00:00"
            value={time}
            onChangeText={setTime}
          />

          <Text style={styles.label}>Date</Text>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#8e44ad' },
              }}
              style={styles.calendar}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#8e44ad',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#8e44ad',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#8e44ad',
                selectedDotColor: '#ffffff',
                arrowColor: '#8e44ad',
                monthTextColor: '#8e44ad',
                indicatorColor: '#8e44ad',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New Visit</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    padding: 20,
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
    color: '#8e44ad',
  },
  profileIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#8e44ad',
    borderRadius: 15,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff2e6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  calendarContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  calendar: {
    width: '100%',
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#f0ad4e',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default map;
