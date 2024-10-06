import React from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { BarChart2, Bell, Home, PenLine, MapPin } from 'lucide-react-native';
import { StatusBar, StatusBarProps } from 'react-native';

interface AppointmentItemProps {
  title: string;
  date: string;
}

interface CustomizationItemProps {
  title: string;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ title, date }) => (
  <View style={styles.appointmentItem}>
    <Text style={styles.appointmentTitle}>{title}</Text>
    <Text style={styles.appointmentDate}>{date}</Text>
    <Switch style={styles.switch} trackColor={{ false: "#FAE3E3", true: "#C41E3A" }} />
  </View>
);

const CustomizationItem: React.FC<CustomizationItemProps> = ({ title }) => (
  <View style={styles.customizationItem}>
    <Text style={styles.customizationTitle}>{title}</Text>
    <Switch style={styles.switch} trackColor={{ false: "#FAE3E3", true: "#C41E3A" }} />
  </View>
);

const Reminders = () => {
  return (
    <ImageBackground
      source={require('./assets/backgroud.png')}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity>
            {/* <View style={styles.menuIcon}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </View> */}
          </TouchableOpacity>
          <Text style={styles.title}>MomCare</Text>
          <TouchableOpacity>
            {/* <View style={styles.profileIcon} /> */}
          </TouchableOpacity>
        </View>

        {/* <View style={styles.searchBar}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#C41E3A"
          />
        </View> */}

        <Text style={styles.sectionTitle}>Reminder Settings</Text>

        <View style={styles.appointmentsContainer}>
          <Text style={styles.subTitle}>Upcoming Appointments</Text>
          <AppointmentItem
            title="Prenatal Checkup"
            date="Sept 15, 10:30 AM"
          />
          <AppointmentItem
            title="Baby Vaccination"
            date="Sept 18, 2:00 PM"
          />
          <AppointmentItem
            title="Baby Vaccination"
            date="Sept 18, 2:00 PM"
          />
        </View>

        <View style={styles.customizationContainer}>
          <Text style={styles.subTitle}>Customized reminder settings</Text>
          <CustomizationItem title="Send to mobile" />
          <CustomizationItem title="Send to email" />
          <CustomizationItem title="Mobile notification" />
        </View>
      </View>

      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <BarChart2 color="#C41E3A" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Bell color="#C41E3A" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Home color="#C41E3A" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <PenLine color="#C41E3A" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <MapPin color="#C41E3A" size={24} />
        </TouchableOpacity>
      </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: (StatusBar.currentHeight ?? 0) + 1, // Add padding for the status bar height
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#C41E3A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C41E3A',
  },
  profileIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#C41E3A',
    borderRadius: 12,
  },
  searchBar: {
    backgroundColor: 'rgba(250, 227, 227, 0.8)',
    borderRadius: 20,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
    color: '#C41E3A',
  },
  sectionTitle: {
    paddingTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#C41E3A',
    textAlign: 'center',
  },
  subTitle: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#C41E3A',
  },
  appointmentsContainer: {
    marginBottom: 16,
  },
  appointmentItem: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 208, 169, 0.8)',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C41E3A',
    flex: 1,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  customizationContainer: {
    backgroundColor: 'rgba(245, 208, 169, 0.8)',
    padding: 16,
    borderRadius: 20,
  },
  customizationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customizationTitle: {
    fontSize: 16,
    color: '#C41E3A',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 8,
  },
  footerItem: {
    padding: 8,
  },
});

export default Reminders;