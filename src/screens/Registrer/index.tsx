import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputForm } from "../../components/Form/InputForm";
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
 } from "react-native";
import { Input } from "../../components/Form/Input";
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

  const [transactionType, setTransactiontype] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);



  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const schema = Yup.object().shape({
    name: Yup
    .string()
    .required("O nome é obrigatório"),
    amount: Yup
    .number()
    .positive("O valor deve ser positivo")
    .typeError("O valor deve ser um número")
  });

  const { 
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactiontype(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData) {

    if(!transactionType)
    return Alert.alert('Erro', 'Selecione o tipo de transação');

    if(category.key === 'category')
    return Alert.alert('Erro', 'Selecione uma categoria');

    const data = { 
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data);
  }


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
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
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