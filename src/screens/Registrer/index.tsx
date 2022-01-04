import React, { useState, useEffect} from "react";
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
 } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";
import { useNavigation } from '@react-navigation/native';
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButtom } from "../../components/Form/CategorySelectButtom";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from "./styles";

interface FormData {
  amount: string;
  name: string;
}


export function Registrer() {

  type NavigationProps = {
    navigate:(screen:string) => void;
  }

  const [transactionType, setTransactiontype] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation<NavigationProps>()

  const schema = Yup.object().shape({
    name: Yup
    .string()
    .required("O nome é obrigatório"),
    amount: Yup
    .number()
    .positive("O valor deve ser positivo")
    .typeError("O valor deve ser um número")
    .required("Valor obrigatório"),
  });

  const { 
    control, 
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactiontype(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData) {

    if(!transactionType)
    return Alert.alert('Erro', 'Selecione o tipo de transação');

    if(category.key === 'category')
    return Alert.alert('Erro', 'Selecione uma categoria');

    const newTransaction = { 
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    
    try {
      const dataKey = '@gofinances:transactions';

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      reset();
      setTransactiontype('');
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  }

  // useEffect(() => {
  //     async function loadData() {
  //      const data = await AsyncStorage.getItem(dataKey);
  //      console.log(JSON.parse(data!));
  //     }
  //     loadData();


  //     async function removeAll() {
  //       await AsyncStorage.removeItem(dataKey);
  //     }
  //     removeAll();
  // },[]);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            placeholder="Nome"
            name="name"
            control={control}
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Entrada"
              onPress={() => handleTransactionTypeSelect('positive')}
              isActive={transactionType === 'positive'}
            />
            <TransactionTypeButton
              type="down"
              title="Saída"
              onPress={() => handleTransactionTypeSelect('negative')}
              isActive={transactionType === 'negative'}
            />
          </TransactionTypes>
          <CategorySelectButtom
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
    </TouchableWithoutFeedback>

  );
}