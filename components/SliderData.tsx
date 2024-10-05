import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
    title: string;
    rating: number;
    speciality: string;
    distance: string;
    openUntil: string;
    phone: string;
    image: ImageSourcePropType
}


export const SliderData = [
    {
        title: 'Health Plus Clinic',
        rating: 4.5,
        speciality: 'General Practitioner',
        distance: '2.5 miles',
        openUntil: '6:00 PM',
        phone: '(123) 456-7890',
        image : require('../assets/images/ss.jpg'),
    },
    {
        title: 'Sunrise Dental Care',
        rating: 4.8,
        speciality: 'Dentist',
        distance: '1.2 miles',
        openUntil: '7:00 PM',
        phone: '(987) 654-3210',
        image : require('../assets/images/ss.jpg'),
    },
    {
        title: 'Pediatric Care Center',
        rating: 4.7,
        speciality: 'Pediatrician',
        distance: '3.0 miles',
        openUntil: '5:30 PM',
        phone: '(555) 123-4567',
        image : require('../assets/images/ss.jpg'),
    },
]