import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../constants'
import Formulario from '../../components/Formulario'
import CustomButton from '../../components/CustomButtom'
import { Link } from 'expo-router'
import AsyncStorage from '@react-native-community/async-storage'

const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    //Recupera os dados do AsyncStorage
    try {
      const savedEmail = await AsyncStorage.getItem('user_email');
      const savedPassword = await AsyncStorage.getItem('user_password');
  
      //Faz o login utilizando os dados salvos
      //Se tudo tiver certo, faz a navegação para a tela login
    } catch (error) {
      console.error('Erro ao recuperar dados do usuário:', error);
    }
  };

  return (
    <SafeAreaView className="bg-primaryblack h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={icons.logo}
          resizeMode='contain' className="w-[115px] h-[75px]"/>

          <Text className="text-2xl text-white text-semibold mt-5 font-rbold">
            Logar em VinaTv.

          </Text>
          <Formulario 
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form,
            email: e})}
          otherStyles="mt-7"
          keyboardType="email-address"/>

          <Formulario 
          title="Senha"
          value={form.senha}
          handleChangeText={(e) => setForm({ ...form,
            senha: e})}
          otherStyles="mt-7"
          keyboardType="password"/>
        
          <CustomButton 
          title="Login"
          handlePress={submit}
          containerStyles="mt-10"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-hvlight">
              Não possui uma conta?
            </Text>
            <Link href="/registrar" className='text-lg font-hvbold text-white'>Registrar</Link>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login