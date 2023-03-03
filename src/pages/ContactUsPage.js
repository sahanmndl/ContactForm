import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import Toast from 'react-native-toast-message';
import * as MailComposer from 'expo-mail-composer';

const ContactUs = () => {

    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const sendMail = async () => {
        if(name.trim() == "" || mobile.trim() == "" || email.trim() == "" || message.trim() == "") {
            Toast.show({
                type: 'error',
                text1: 'Inputs cannot be empty',
            })
        } else if (!mobile.match(/^\d{10}$/)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid mobile number',
                text2: 'Please enter valid mobile number'
            })
        } else {
            setLoading(true)
            try {
                const mailData = {
                    recipients: ['info@redpositive.in'],
                    subject: `Contact Us form submission from ${name}`,
                    body: `Name: ${name}\nMobile Number: ${mobile}\nEmail: ${email}\nMessage: ${message}`,
                }
                await MailComposer.composeAsync(mailData)
            } catch(e) {
                Toast.show({
                    type: 'error',
                    text1: 'Unable to send mail',
                    text2: 'Please try again'
                })
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <View style={{flex: 1, padding: 10}}>
            <View style={{flex: 0.1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: '700'}}>Contact Us</Text>
            </View>
            <ScrollView style={{flex: 0.8}}>
                <TextInput
                    style={{width: '100%', backgroundColor: "#FAFAFA", marginBottom: 20}}
                    placeholder="Name*"
                    outlineColor="#757575"
                    activeOutlineColor={"#007AFF"}
                    mode='outlined'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={{width: '100%', backgroundColor: "#FAFAFA", marginBottom: 20}}
                    placeholder="Mobile Number*"
                    outlineColor="#757575"
                    activeOutlineColor={"#007AFF"}
                    mode='outlined'
                    keyboardType="phone-pad"
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                />
                <TextInput
                    style={{width: '100%', backgroundColor: "#FAFAFA", marginBottom: 20}}
                    placeholder="Email*"
                    outlineColor="#757575"
                    activeOutlineColor={"#007AFF"}
                    mode='outlined'
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={{width: '100%', backgroundColor: "#FAFAFA", marginBottom: 20}}
                    placeholder="Message*"
                    outlineColor="#757575"
                    activeOutlineColor={"#007AFF"}
                    mode='outlined'
                    multiline
                    numberOfLines={7}
                    value={message}
                    onChangeText={text => setMessage(text)}
                />
            </ScrollView>
            <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.btnSave}
                    onPress={() => requestAnimationFrame(() => {
                        sendMail()
                    })}
                >
                    {loading ?
                        <ActivityIndicator color={'white'}/> : 
                        <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
                            Submit
                        </Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    btnSave: {
        height: 50,
        width: '100%',
        backgroundColor: "#007AFF",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        flexDirection: 'row'
    }
})