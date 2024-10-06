import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar, StatusBarProps } from 'react-native';
const backgroundImage = require('./assets/backgroud.png');

const Map = () => {
  const [doctorName, setDoctorName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date: { toLocaleTimeString: (arg0: never[], arg1: { hour: string; minute: string; }) => any; }) => {
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTime(formattedTime);
    hideTimePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>MomCare</Text>
          </View>
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

          <TouchableOpacity onPress={showTimePicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              value={time}
              editable={false}
            />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
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
                textDayFontSize: 12,
                textMonthFontSize: 12,
                textDayHeaderFontSize: 12,
              }}
            />
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New Visit</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 10,
    paddingTop: (StatusBar.currentHeight ?? 0) + 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8e44ad',
    textAlign: 'center',
  },
  profileIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#8e44ad',
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#fff2e6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  calendarContainer: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  calendar: {
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#f0ad4e',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Map;