import React, {useState} from "react";
import {Appbar, Button, Text, TextInput} from "react-native-paper";
import {Linking, StyleSheet, View} from "react-native"
import {Formik} from "formik";
import contactFormSchema from "../formSchemas/contactFormSchema";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type UserDataProps = {
    name: string;
    email: string;
    phone: string;
    message: string;

}
const ContactScreen = () => {
    const [userData, setUserData] = useState<UserDataProps>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    return (
        <>
            <Appbar.Header mode={"center-aligned"} dark={true} style={{backgroundColor: "#621ba3"}}>
                <Appbar.Content title="Contact Us"/>
            </Appbar.Header>

            <Formik initialValues={userData} validationSchema={contactFormSchema}
                    onSubmit={values => {
                        console.log(values);
                        setLoading(true);
                        setTimeout(() => {

                            Linking.openURL(`mailto:info@redpositive.in?subject=Contact Us&body=Name: ${values.name}%0D%0AEmail: ${values.email}%0D%0APhone No.: ${values.phone}%0D%0AMessage: ${values.message}`).then(() => {
                                setLoading(false)
                                setUserData({name: "", email: "", phone: "", message: ""})
                            }).catch(() => {
                                setLoading(false)
                            })
                        }, 3000);
                    }}
                    onReset={() => {
                        setUserData({
                            name: '',
                            email: '',
                            phone: '',
                            message: '',
                        });
                    }}
            >
                {({handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched}) => (
                    <View style={{flex: 1, padding: 16}}>
                        <TextInput
                            label="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            error={errors.name && touched.name}
                            style={styles.formFields}
                        />
                        {touched.name && errors.name && (
                            <Text style={styles.errors}>{errors.name}</Text>)}
                        <TextInput
                            label="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email && touched.email}
                            style={styles.formFields}
                            keyboardType={"email-address"}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.errors}>{errors.email}</Text>)
                        }
                        <TextInput
                            label="Phone No."
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            error={errors.phone && touched.phone}
                            style={styles.formFields}
                            keyboardType={"phone-pad"}
                        />
                        {touched.phone && errors.phone && (
                            <Text style={styles.errors}>{errors.phone}</Text>)}
                        <TextInput
                            label="Message"
                            onChangeText={handleChange('message')}
                            onBlur={handleBlur('message')}
                            value={values.message}
                            error={errors.message && touched.message}
                            style={styles.formFields}
                            multiline={true}
                            numberOfLines={5}
                        />
                        {touched.message && errors.message && (
                            <Text style={styles.errors}>{errors.message}</Text>
                        )}
                        <Button
                            loading={loading}
                            disabled={loading}
                            mode="contained"
                            style={styles.buttons}
                            icon={()=> <MaterialCommunityIcons name={"send"} size={20} color={"white"} />}
                            onPress={handleSubmit}>
                            Send
                        </Button>
                        <Button
                            mode="contained-tonal"
                            disabled={loading}
                            style={styles.buttons}
                            icon={() => <FontAwesome6Icon name={"arrow-rotate-left"} size={20} color={"black"}/>}
                            onPress={handleReset}>
                            Reset
                        </Button>
                    </View>

                )}

            </Formik>

        </>

    );
}

const styles = StyleSheet.create({
    buttons: {
        margin: 5,
    },
    formFields: {
        marginVertical: 12,
    },
    errors: {
        color: '#f03040',
        fontSize: 14,
        marginBottom: 5,
        marginStart: 5,

    },
})
export default ContactScreen;
