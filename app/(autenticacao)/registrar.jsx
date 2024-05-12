import { View, Text, ScrollView, Image, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../constants'
import Formulario from '../../components/Formulario'
import CustomButton from '../../components/CustomButtom'
import { Link } from 'expo-router'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'


const Registrar = () => {

  const [form, setForm] = useState({
    nome: '',
    email: '',
    password: '',
    cep:'',
    cidade:'',
    bairro:'',
    rua:'',
    numero:'',
    complemento:''
  });

  const [error, setError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchAddressInfo = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);
      const { localidade, bairro, logradouro } = response.data;
      setForm({
        ...form,
        cidade: localidade,
        bairro: bairro,
        rua: logradouro,
      });
      setError(false)
    } catch (error) {
      setError(true);
      setModalVisible(true)
      console.error('Error fetching address information:', error, form.cep);
    }
  };
  

  const submit = async () => {
    //Seu código existente de validação e envio dos dados
  
    //Após enviar os dados com sucesso, salva o email e a senha no AsyncStorage
    try {
      await AsyncStorage.setItem('user_email', form.email);
      await AsyncStorage.setItem('user_password', form.password);
      //Após salvar, navega para a tela de login ou avisa de erro
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  };
  

  return (
    <SafeAreaView className="bg-primaryblack h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">

          <Modal
          animationType="slide"
          transparent={!modalVisible}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Falha em encontrar o CEP. Tente novamente.")
            setModalVisible(false)
          }}
          />

          <Image source={icons.logo}
          resizeMode='contain' className="w-[115px] h-[75px]"/>

          <Text className="text-2xl text-white text-semibold mt-5 font-rbold">
            Registrar-se em VinaTv.
          </Text>

          <Formulario
          title="Nome Completo"
          value={form.nome}
          handleChangeText={(e) => setForm({ ...form, nome: e})}
          otherStyles="mt-3"
          keyboardType="text"
          />

          <Formulario 
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form,
            email: e})}
          otherStyles="mt-3"
          keyboardType="email-address"/>

          <Formulario 
          title="Senha"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form,
            password: e})}
          otherStyles="mt-3"
          keyboardType="password"/>

          <Formulario
          title="CEP"
          value={form.cep}
          handleChangeText={(e) => setForm({...form, cep: e})}
          onEndEditing={() => fetchAddressInfo()}
          otherStyles="mt-3"
          keyboardType="numeric"
          />

          <Formulario
          title="Cidade"
          editable={false}
          value={form.cidade}
          handleChangeText={(e) => setForm({...form, cidade: e})}
          otherStyles="mt-3"
          keyboardType="text"
          />

          <Formulario
          title="Bairro"
          editable={false}
          value={form.bairro}
          handleChangeText={(e) => setForm({...form, bairro: e})}
          otherStyles="mt-3"
          keyboardType="text"
          />

          <Formulario
          title="Rua"
          editable={false}
          value={form.rua}
          handleChangeText={(e) => setForm({...form, rua: e})}
          otherStyles="mt-3"
          keyboardType="text"
          />

          <Formulario
          title="Numero"
          value={form.numero}
          handleChangeText={(e) => setForm({...form, numero: e})}
          otherStyles="mt=3"
          keyboardType="numeric"
          />

          <Formulario
          title="Complemento"
          value={form.complemento}
          handleChangeText={(e) => setForm({...form, complemento: e})}
          otherStyles="mt-3"
          keyboardType="text"
          />

          <CustomButton
          title="Registrar"
          handlePress={submit}
          containerStyles="mt-10"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2 mb-10">
            <Text className="text-lg text-gray-100 font-hvlight">
              Já possui uma conta?
            </Text>
            <Link href="/login" className='text-lg font-hvbold text-white'>Entrar</Link>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registrar